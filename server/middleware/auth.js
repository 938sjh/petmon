import User from "../models/User.js";

//쿠키(클라이언트)에서 토큰을 가져온 후 복호화하여 유저가 있는지 인증

let auth = async (req, res, next) => {
    let token = req.cookies.x_auth;

    try{
        const user = await User.findByToken(token);
        if(!user) return res.json({ isAuth: false, error: true});
        
        //req에서 user,token 정보 사용할 수 있도록 넣어줌
        req.token = token;
        req.user = user;
        next();
    }
    catch (err){
        throw err;
    }
};

export default auth;