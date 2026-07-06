import { Product } from "../models/products.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
const uploadProduct=asyncHandler(async(req,res)=>{
    console.log("i am at the product")
    const{category,productName,productDescription,productPrice}=req.body
    if([category,productName,productDescription,productPrice].some((fields)=>fields?.trim()==="")){
        throw new ApiError(401,"All files are required")

    }
    const productOwner=await User.findById(req.user?._id)
    
    
    const productImages=req.files?.productImage;

    if(!productImages || productImages.length===0){
        throw new ApiError(401,"Images of the product is required")
    }
    const uploadedImages=[]
   for(const file of productImages){
    const productimageC=await uploadOnCloudinary(file.path)
    if (!productimageC) {
        throw new ApiError(500, "Image upload failed");
    }
    
    uploadedImages.push(productimageC.url)
    

   }
   
    const product= await Product.create(
        {
            category,
            productName,
            productDescription,
            productOwner:productOwner?._id,
            productPrice,
            productImage:uploadedImages
        }
    )
    
    return res.status(201).json(
        new ApiResponse(201,product,"Product registered successfuly"))

})
export {uploadProduct}