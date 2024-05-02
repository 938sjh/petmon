import multer from "multer";
import Product from "../models/Product.js";
import admin from "../firebase.js";
import dotenv from "dotenv";

dotenv.config();

const bucket = admin.storage().bucket();

// Multer 설정
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

const paging = (page, totalProduct, limit) => {
    const maxPage = 5;
    const skip = (page - 1) * limit;
    const totalPage = Math.ceil(totalProduct / limit);
    const startPage = Math.floor(((page - 1) / maxPage)) * maxPage + 1;
    let endPage = startPage + maxPage - 1;

    if(endPage > totalPage){
        endPage = totalPage;
    }
    return {startPage, endPage, skip, totalPage};

}

export function uploadImage (req,res){
    const file = req.file;

    if (!file) {
        return res.status(400).json({ success: false });
    }

    // 업로드할 파일 경로 및 이름 설정
    const filePath = `image/${file.originalname}`;

    // Firebase Storage에 파일 업로드
    const fileUpload = bucket.file(filePath);
    const stream = fileUpload.createWriteStream({
        metadata: {
            contentType: file.mimetype
        }
    });

    stream.on('error', (err) => {
        console.error(err);
        return res.json({ success: false, err});
    });

    stream.on('finish', () => {
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename})
    });

    stream.end(file.buffer);
};

export async function uploadProduct(req,res){
    const product = new Product(req.body);
    //db에 저장
    try{
        await product.save();        
        return res.status(200).json({ success: true})
    }

    catch(err){
        return res.status(400).json({ success: false, err})
    }
};

export async function getAllProducts(req,res){    
    let limit = req.query.limit ? parseInt(req.query.limit) : 12;
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let category = req.query.category;
    let searchTerm = req.query.searchTerm;

    try{
        if(searchTerm){
            try{
                const productInfo = await Product.find({ 'title': { $regex: searchTerm, $options: "i" } })
                .populate("publisher")   
                .exec();
                return res.status(200).json({ success: true, productInfo, postSize: productInfo.length})
            }
            catch (err){
                return res.status(400).json({ success: false, err})
            }
        }
        else if(category){
            const totalProduct = await Product.countDocuments({category: category});
            const {
                startPage,
                endPage,
                skip,
                totalPage
            } = paging(page, totalProduct, limit);

            if(page > totalPage){
                page = totalPage;
            }
        
            const productInfo = await Product.find({category: category}) 
            .skip(skip) 
            .limit(limit)
            .populate("publisher")  
            .exec();

            return res.status(200).json({ success: true, productInfo, startPage, endPage, totalPage})
        }
        else{
            const totalProduct = await Product.countDocuments();
            const {
                startPage,
                endPage,
                skip,
                totalPage
            } = paging(page, totalProduct, limit);

            if(page > totalPage){
                page = totalPage;
            }
            const productInfo = await Product.find() 
            .skip(skip) 
            .limit(limit)
            .populate("publisher")  
            .exec();

            return res.status(200).json({ success: true, productInfo, startPage, endPage, totalPage})
        }
    }
    catch (err){
        return res.status(400).json({ success: false, err})
    }
   
};

//sold순으로 top 10개
export async function getPopularProducts(req,res){
    try{
        const productInfo = await Product.find()
        .sort({sold:-1})
        .limit(10)
        .populate("publisher")   
        .exec();
        return res.status(200).json({ success: true, productInfo, postSize: productInfo.length})
    }
    catch (err){
        return res.status(400).json({ success: false, err})
    }
};

//createdAt 기준으로 top 10개
export async function getNewProducts(req,res){
    try{
        const productInfo = await Product.find()
        .sort({createdAt:-1})
        .limit(10)
        .populate("publisher")   
        .exec();
        return res.status(200).json({ success: true, productInfo, postSize: productInfo.length})
    }
    catch (err){
        return res.status(400).json({ success: false, err})
    }
};

export async function getDetailProduct(req,res){
    let productId = req.params.id;
    const storage = admin.storage();
    // ProductId를 이용해서 DB에서 상품정보 반환
    try {
        const productInfo = await Product.find({ _id: productId })
        .populate('publisher')
        .exec();
        const file = storage.bucket().file(`image/${productInfo[0].images[0].path}`);
        const expirationTime = new Date();
        expirationTime.setMinutes(expirationTime.getMinutes() + 30);

        let [url] = await file.getSignedUrl({
            action: 'read',
            expires: expirationTime
        });
        return res.status(200).json({productInfo, url})
    }
    catch (err){
        return res.status(400).send(err)
    }
};