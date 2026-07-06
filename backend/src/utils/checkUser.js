import { ApiError } from "./apiError.js";
import { ApiResponse } from "./apiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken"
const checkUser=async(req,res)=>{
    const token=await req.cookies?.accessToken
    if(!token){
        throw new ApiError(401,"Token not provided")
        
    }
    const decodedToken=jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    const user=await User.findById(decodedToken?._id).select("-refreshToken")
    if(!user){
        throw new ApiError(401,"Invalid Access Token")
        return;
    }
    else{
        return res.status(200).json(
            new ApiResponse(200,user,"User Exists")
        )
    }


}
export {checkUser}