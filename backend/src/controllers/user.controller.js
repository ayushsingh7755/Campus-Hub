import {User} from '../models/user.model.js'
import { ApiError } from '../utils/apiError.js'
import { asyncHandler } from '../utils/asynchandler.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
const generateAccesandRefreshToken=async(userId)=>{
    const user= await User.findById(userId)
    const accessToken=await user.generateAccessToken()
    const refreshToken=await user.generateRefreshToken()
    user.refreshToken=refreshToken
    await user.save({validateBeforeSave:false})
    return {accessToken,refreshToken}
    
}
const registerUser=async(req,res)=>{
    const{fullname,username,email,password,college,contactNumber,course,year}=req.body
    if([fullname,username,email,password,college,course,contactNumber,year].some((fields)=>fields?.trim()==="")){
        throw new ApiError(401,"All fields are required")
    }
    
    const existedUser=await User.findOne({
        $or:[{username},{email}]
    })
    if(existedUser){
        throw new ApiError(409,"User already exists")
    }
    const avatarLocalPath=req.files?.avatar[0]?.path;
   
    
    if(!avatarLocalPath){
        throw new ApiError(401,"Avatar is Misssing")
    }
    const avatarC=await uploadOnCloudinary(avatarLocalPath)
    
    const user= await User.create(
        {
            fullname,
            username,
            email,
            password,
            college,
            course,
            year,
            contactNumber,
            avatar:avatarC.url,
            
        }
    )
    const createdUser=await User.findById(user._id).select("-refreshToken -password")
    if(!createdUser){
        throw new ApiError(401,"user not created successfully")
    }
    return res.status(201).json(
        new ApiResponse(201,createdUser,"User Registered Successfully"))
    
   
    
    

}
const loginUser=asyncHandler(async(req,res)=>{
    const {username,email,password}=req.body
    if(!username && !email){
        throw new ApiError(401,"One of the email or username is required")

    }
    if(!password){
        throw new ApiError(401,"password is required")
    }
    

    const user=await User.findOne(
       { $or:[{username},{email}]}
    )
    if(!user){
        throw new ApiError(401,"User do not exists")
    }
    const ispasswordValid= await user.isPasswordCorrect(password)
    if(!ispasswordValid){
        throw new ApiError(401,"Incorrect password")
    }
    
    const{accessToken,refreshToken}=await generateAccesandRefreshToken(user._id)
    const loggedInUser=await User.findById(user._id).select("-password -refreshToken")
    const options={
        httpOnly:true,
        secure:true,
        sameSite:"None"
    }
    return res.status(201).cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(201,loggedInUser,"User logged in successfully"))

})
const logOut=asyncHandler(async(req,res)=>{
    
    User.findByIdAndUpdate(
        req.user._id,
        {
            $unset:{
                refreshToken:1

            }
        },
        {
            new:true
        }
    )
    const options={
        httpOnly:true,
        secure:true,
        sameSite:"None"
    }
    return res.status(200)
    .clearCookie("refreshToken",options)
    .clearCookie("accessToken",options)
    .json(new ApiResponse(200,{},"User logged out successfully"))
    
    

})
const updateDetails=asyncHandler(async(req,res)=>{
    const{fullname,username,email}=req.body
    if(!username&&!email&&!fullname){
        throw new ApiError(401,"Give atleast one field to update")
    }
   const avatarLocalpath=req.files?.avatar[0]?.path
    const coverLocalpath=req.files?.coverImage[0]?.path
    const avatarC=await uploadOnCloudinary(avatarLocalpath)
    const coverC=await uploadOnCloudinary(coverLocalpath)

    const user=await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{username:username,
                email:email,
                fullname:fullname,
                

            }
        },
        {
            new:true
        }
    ).select("-password")
    return res.status(200).
    json(new ApiResponse(200,user,"Updated details successfully"))
    
})
const updatePassword=asyncHandler(async(req,res)=>{
    const {oldPassword,newPassword}=req.body
    const user=await User.findById(req.user._id)
    const isPassCorrect=await user.isPasswordCorrect(oldPassword);
    if(!user){
        throw new ApiError(401,"User not found")
    }else if(!isPassCorrect){
        
        
        throw new ApiError(401,"Password incorrect")

    }
    
    

    user.password=newPassword
    const response=await user.save({validateBeforeSave:false})
    return res.status(200).
    json(new ApiResponse(200,response,"Password updated"))
})
const changeAvatar=asyncHandler(async(req,res)=>{
    const  avatarLocalPath=req.files?.avatar[0]?.path
    const avatarC=await uploadOnCloudinary(avatarLocalPath);
    const user=await User.findByIdAndUpdate(req.user._id,
       { $set:{
            avatar:avatarC.url
        }
    },
    {
        new:true
    }

    ).select("-password")
    res.status(200).json(new ApiResponse(200,user,"Avatar Updated"))
    
})

export{registerUser,loginUser,logOut,updateDetails,updatePassword,changeAvatar}
