import mongoose from "mongoose";
 
const productSchema = mongoose.Schema({
    productName: String,
    price: Number,
    sellerName: String,
    category: String,
    images:[
        {
            data: Buffer,
            contentType: String,
        }
    ],
    totalItems: Number

})

const product = mongoose.model('Product', productSchema)
export default product
