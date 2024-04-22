import mongoose from "mongoose";

const {Schema} = mongoose;

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    stock: {
        type: Number,
        default: 0
    },
    category: {
        type: String,
        required: true
    },
    //image가 여러 개인 경우를 위해 배열
    images: {
        type: Array,
        default: []
    },
    // 게시자 정보를 참조하는 필드
    publisher: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: { createdAt: true, updatedAt: false }});



const Product = mongoose.model("Product", productSchema);

export default Product;