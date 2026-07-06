import { Product } from "../models/products.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
const getOneProduct=async(req,res)=>{
    const {productId}=req.params;
    


    const oneproduct=await Product.findById(productId).populate("productOwner");
    if(!oneproduct){
        throw new ApiError(401,"Product not found");

    }
    res.status(200).json(oneproduct);
}
export {getOneProduct}
