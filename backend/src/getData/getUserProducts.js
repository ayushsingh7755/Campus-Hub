import { Product } from "../models/products.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
const getUserProducts=async(req,res)=>{
    const data=await Product.find({productOwner: req.user._id})
    if(data.length===0){
        throw new ApiError(401,"No products found")
    }
    if(!data){
        throw new ApiError(401,"Something went wrong")
    }
    res.status(200).json(data)
}
export {getUserProducts}