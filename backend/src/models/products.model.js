import mongoose,{Schema} from "mongoose";
const productSchema=new Schema({
    category:{
        type:String,
        required:true
    },
   productName: {
        type:String,
        required:true,

    },
    productDescription:{
        type:String,
        required:true
    },
    productImage:[{
        type:String,
        required:true
    }],
    productOwner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    productPrice:{
        type:String,
        required:true
    }
},{timestamps:true})
export const Product=new mongoose.model("Product",productSchema)