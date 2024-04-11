import mongoose from "mongoose";
import nanoid from "nanoid";

const {Schema} = mongoose;

const productSchema = new Schema({
    shortId: {
        type: Stiring,
        default() {
            return nanoid();
        },
        require: true,
        index: true,
    },   
});

const Product = mongoose.model("Product", productSchema);

export default Product;