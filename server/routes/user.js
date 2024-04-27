import express from "express";
import User from "../models/User.js";
import auth from "../middleware/auth.js";
import Product from "../models/Product.js";

const router = express.Router();

router.post('/signup', async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save();
        return res.status(200).json({ signupSuccess: true });
    } 
    catch (err) {
        return res.status(500).json({ signupSuccess: false, err});
    }
});
  
router.post('/login', async (req, res) => {
    //DB에서 이메일에 해당하는 user 검색
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user) {
            return res.json({
                loginSuccess: false,
                message: "이메일이 존재하지 않습니다."
            })
        }
        //비밀번호가 일치하는지 확인
        const isMatch = await user.checkPassword(req.body.password);
        if(!isMatch) {
            return res.json({
                loginSuccess: false,
                message: "비밀번호가 일치하지 않습니다."})
        }
        await user.generateToken();
        res.cookie("x_auth", user.token,{sameSite:"None",secure:true})
        .status(200)
        .json({ loginSuccess: true, userId: user._id, userName: user.userName });
    }
    catch (err) {
        res.status(400).send(err);
    }
});
  
//auth 미들웨어로 권한 검증 후 유저 정보 전달
router.get('/auth', auth, (req,res) => {
    res.status(200)
    .json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        cart: req.user.cart
    });
});

router.post('/logout', auth, async (req,res) => {
    try{
        const user = await User.findOneAndUpdate({_id: req.user._id}, {token: ""});
        if(!user){
            return res.json({
                logoutSuccess: false,
                message: "로그아웃에 실패했습니다."
            })
        }
        return res.clearCookie('x_auth')
                .status(200)
                .json({
            logoutSuccess:true
        });
    }
    catch (err) {
        return res.json({success:false, err});
    }
});
  

router.post("/addCart", auth, async (req, res) => {
    try{
        const userInfo = await User.findOne({_id: req.user._id});
        let isProduct = false;
        
        for(let prod in userInfo.cart){
            if(prod.id === req.body.id){
                isProduct = true;
                break;
            }
        }
        //cart에 이미 상품이 있는 경우
        if(isProduct){
            const userInfo = await User.findOneAndUpdate(
            { _id: req.user._id, "cart.id" : req.body.id },
            { $inc : {"cart.$.quantity" : 1} },
            { new : true }
            )
            return res.status(200).send(userInfo.cart);
        }
        else{
            const userInfo = await User.findOneAndUpdate(
                { _id : req.user._id },
                { $push: {
                    cart: {
                        id: req.body.id,
                        quantity: 1
                    }
                }},
                { new : true}
            )
            return res.status(200).send(userInfo.cart);
        }
    }
    catch (err){
        return res.status(400).json({ success: false, err });
    }
});

router.post("/removeCart", auth, async (req, res) => {
    try{
        const userInfo = await User.findOneAndUpdate(
            { _id : req.user._id },
            {
                "$pull": 
                    { "cart" : { "id" : req.query.productId} }
            },
            { new : true }
        );

        let removedCart = userInfo.cart;
        let cartProducts = removedCart.map(item => {
            return item.id;
        })
        const remainProducts = await Product.find({ _id: { $in : cartProducts }})
                                    .populate("publisher")
                                    .exec();
        return res.status(200).json({remainProducts, removedCart})
            
    }
    catch(err){
        return res.status(400).json({ success : false, err });
    }
});

export default router;