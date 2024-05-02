import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//쿠키(클라이언트)에서 토큰을 가져온 후 복호화하여 유저가 있는지 인증

let authMiddleware = async (req, res, next) => {
    let token = req.cookies.x_auth;
    if (!token) {
        return res.json({ isAuth: false, error: true});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.clearCookie('x_auth')
                .json({isAuth: false, error: true});
            }
            else{
                return res.status(403).json({ message: '토큰이 유효하지 않습니다.' });
            }
        }
    });

    try{
        const user = await User.findByToken(token);
        if(!user) {
            return res.json({ isAuth: false, error: true});
        }
        
        //req에서 user,token 정보 사용할 수 있도록 넣어줌
        req.token = token;
        req.user = user;
        next();
    }
    catch (err){
        throw err;
    }
};

export default authMiddleware;