import express from "express";
import { uploadImage, uploadProduct, getAllProducts, getPopularProducts, getNewProducts, getDetailProduct, upload } from "../controller/product.js";

const router = express.Router();

router.post('/image', upload.single("file"), uploadImage);
router.post('/', uploadProduct);
router.get('/', getAllProducts);
router.get('/popular', getPopularProducts);
router.get('/new', getNewProducts);
router.get('/:id', getDetailProduct);

export default router;
