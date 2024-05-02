import express from "express";
import authMiddleware from "../middleware/auth.js";
import {signup, login, auth, logout, addCart, removeCart, getCart, buy, getOrder} from "../controller/user.js";

const router = express.Router();

router.post('/', signup);
router.post('/login',login);
//auth 미들웨어로 권한 검증 후 유저 정보 전달
router.get('/auth', authMiddleware, auth);
router.post('/logout', authMiddleware, logout);

router.get('/cart', authMiddleware, getCart);
router.post("/cart", authMiddleware, addCart);
router.delete("/cart/:id", authMiddleware, removeCart);

router.post("/payment", authMiddleware, buy);

router.get('/order', authMiddleware, getOrder);

export default router;