import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
const oneUser=async(req,res)=>{
    const {ownerId}=req.params;
    const user=await User.findById(ownerId).select("-passsword");
    if(!user){
        throw new ApiError(401,"User not found")

    }
    res.status(200).json(user)


}
export {oneUser}