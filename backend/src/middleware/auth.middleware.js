import { asyncHandler } from "../utils/asynchandler.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/apiError.js"
import jwt  from "jsonwebtoken"
import { ApiResponse } from "../utils/apiResponse.js"
 const getAuth=async(req,res,next)=>{
    
    const token=req.cookies?.accessToken
    
    if(!token){
        throw new ApiError(401,"Token not provided")
        return;
    }
    
    const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    const user=await User.findById(decodedToken?._id).select("-refreshToken")
    
    if(!user){
         throw new ApiError(401,"Invalid Access Token")
        
         
    }
   
   
   
    req.user=user
        
    next();
    

}
export {getAuth}