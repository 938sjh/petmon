import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const saltRounds = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName:{
        type:String,
        maxlength:50
    },
    email:{
        type:String,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        minlength:6
    },
    role:{
        type:Number,
        default:0
    },
    phoneNum:{
        type:String,
        maxlength:30
    },
    token:{
        type:String
    },
    tokenExp:{
        type:Number
    }
});

userSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if(err) return next(err);

            bcrypt.hash(user.password, salt, (err, hash) => {
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    }
    else {
        next();
    }
});

//모델 메소드 생성

//비밀번호 확인
userSchema.methods.checkPassword = async function(plainPassword){
    try {
        const isMatch = await bcrypt.compare(plainPassword, this.password);
        return isMatch;
    } 
    catch (err) {
        throw err; 
    }
};

//토큰 생성
userSchema.methods.generateToken = async function(){
    var user = this;

    var token = jwt.sign(user._id.toHexString(), 'SeCrEtKeY');
    user.token = token;
    try {
        await user.save();
        //return user;
    } 
    catch (err) {
        throw err;
    }
};

//토큰으로 유저 검색
userSchema.statics.findByToken = async function(token) {
    var userModel = this;

    const decoded = jwt.verify(token, 'SeCrEtKeY');
    try{
        const user = await userModel.findOne({"_id":decoded, "token": token}); 
        return user;
    }
    catch (err) {
        throw err;
    }
};

const User = mongoose.model("User", userSchema);

export default User;