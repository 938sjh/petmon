import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import User from "./models/User.js";
import auth from "./middleware/auth.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors(
  {origin:"http://localhost:3000",
   credentials:true}));

const connect = mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/users/signup', async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save();
    return res.status(200).json({ signupSuccess: true });
  } catch (err) {
    return res.status(500).json({ signupSuccess: false, err});
  }
});

app.post('/api/users/login', async (req, res) => {
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

app.get('/api/users/auth', auth, (req,res) => {
  res.status(200)
  .json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
  });
});

app.post('/api/users/logout', auth, async (req,res) => {
  try{
    const user = await User.findOneAndUpdate({_id: req.user._id}, {token: ""});
    if(!user){
      return res.json({
        logoutSuccess: false,
        message: "로그아웃에 실패했습니다."
      })
    }
    return res.status(200).json({
      logoutSuccess:true
    });
  }
  catch (err) {
    return res.json({success:false, err});
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});