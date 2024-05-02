import User from "../models/User.js";
import Product from "../models/Product.js";
import admin from "../firebase.js";

export async function signup(req, res){
    const user = new User(req.body)
    try {
        await user.save();
        return res.status(200).json({ signupSuccess: true });
    } 
    catch (err) {
        return res.status(500).json({ signupSuccess: false, err});
    }
}

export async function login(req, res){
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
        .json({ loginSuccess: true, userId: user._id, userName: user.userName, isAdmin: user.role });
    }
    catch (err) {
        res.status(400).send(err);
    }
}

export function auth(req, res){
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
};

export async function logout(req, res) {
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
}

export async function addCart(req, res){
    try{
        const userInfo = await User.findOne({_id: req.user._id});
        let isProduct = false;
        
        for(let prod of userInfo.cart){
            if(prod.id === req.body.id){
                isProduct = true;
                break;
            }
        }
        //cart에 이미 상품이 있는 경우
        if(isProduct){
            const userInfo = await User.findOneAndUpdate(
            { _id: req.user._id, "cart.id" : req.body.id },
            { $inc : {"cart.$.quantity" : req.body.quantity} },
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
                        quantity: req.body.quantity
                    }
                }},
                { new : true}
            )
            return res.status(200).json({success : true});
        }
    }
    catch (err){
        return res.status(400).json({ success: false, err });
    }
}

export async function removeCart(req, res){
    try{
        const userInfo = await User.findOneAndUpdate(
            { _id : req.user._id },
            {
                "$pull": 
                    { "cart" : { "id" : req.params.id } }
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
        return res.status(200).json({ success : true, remainProducts, removedCart})
            
    }
    catch(err){
        return res.status(400).json({ success : false, err });
    }
}

export async function getCart(req,res){
    let productIds = [];
    let userId = req.user._id;
    
    let returnProducts = [];
    const storage = admin.storage();

    try {
        const userInfo = await User.find({ _id: userId });
        const userCart = userInfo[0].cart;
        for(let item of userCart){
            productIds.push(item.id);
        }
        const productInfo = await Product.find({ _id: {$in:productIds}})
        .populate('publisher')
        .exec();
        for(const product of productInfo){
            const file = storage.bucket().file(`image/${product.images[0].path}`);
            const expirationTime = new Date();
            expirationTime.setMinutes(expirationTime.getMinutes() + 30);

            let [url] = await file.getSignedUrl({
                action: 'read',
                expires: expirationTime
            });
            const temp = {};
            for(let item of userCart){
                if(product._id == item.id){
                    temp['_id'] = product._id;
                    temp['title'] = product.title;
                    temp['price'] = product.price;
                    temp['images'] = url;
                    temp['quantity'] = item.quantity;
                    returnProducts.push(temp);
                    break;
                }
            }
        };
        return res.status(200).json(returnProducts);
    }
    catch (err){
        return res.status(400).send(err)
    }
}

export async function buy(req, res){
    let order = [];
    try{
        const userInfo = await User.findOne({ _id : req.user._id });
        //판매 개수 업데이트
        for(let item of userInfo.cart){
            const productInfo = await Product.findOne({_id:item.id});
            //상품 정보가 바뀔 수 있으니 구매 당시 상품 정보 저장
            order.push({
                date: Date.now(),
                id: productInfo._id,
                title: productInfo.title,
                price: productInfo.price,
                image: productInfo.images[0],
                quantity: item.quantity,
            });
            productInfo.sold += item.quantity;
            await productInfo.save();
        }
        userInfo.cart = [];
        userInfo.order = userInfo.order.concat(order);
        await userInfo.save();
        return res.status(200).json({ success : true });
    }
    catch(err){
        return res.status(400).json({ success : false, err});
    }
}

export async function getOrder(req,res){
    let userId = req.user._id;
    
    let returnProducts = [];
    const storage = admin.storage();

    try {
        const userInfo = await User.find({ _id: userId });
        const userOrder = userInfo[0].order;
        console.log(userOrder);
        for(const product of userOrder){
            const file = storage.bucket().file(`image/${product.image.path}`);
            const expirationTime = new Date();
            expirationTime.setMinutes(expirationTime.getMinutes() + 30);

            let [url] = await file.getSignedUrl({
                action: 'read',
                expires: expirationTime
            });
            const temp = {};
            temp['_id'] = product.id;
            temp['title'] = product.title;
            temp['price'] = product.price;
            temp['images'] = url;
            temp['quantity'] = product.quantity;
            returnProducts.push(temp);
        }
        return res.status(200).json(returnProducts);
    }
    catch (err){
        return res.status(400).send(err);
    }

}