import { Buy } from "../models/buy.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asynchandler.js";

const handleBuyClick=asyncHandler(async(req,res)=>{
    const{productId,seller}=req.params;
    const  buyer=req.user?._id;
    if(!buyer){
         throw new ApiError(401,"User not logged in ")
    }else if(!productId   || !seller){
        throw new ApiError(401,"productId or seller not recieved")
    }

    const buyRes=await Buy.create(
        {
            productId,
            buyer,
            seller
        }
    )
    if(!buyRes){

        throw new ApiError(401,"Buy request not send")
    } 
    res.status(200).json(buyRes)
   
    

})
const getBuyRequests=asyncHandler(async(req,res)=>{
    const sellerId=req.user?._id
    if(!sellerId){
        throw new ApiError(401,"User not logged in ")
    }
    const buyRes=await Buy.find({seller:sellerId}).populate("productId").populate("buyer").populate("seller")
    if(buyRes.length===0){
        throw new ApiError(404,"No Buy Requests")
    }
    res.status(200).json(buyRes)
    

})
const getBuyRequestsSend=asyncHandler(async(req,res)=>{
    const buyerId=req.user?._id
    if(!buyerId){
        throw new ApiError(401,"User not logged in ")
    }
    const buyRes=await Buy.find({buyer:buyerId}).populate("productId").populate("seller").populate("buyer")
    if(buyRes.length===0){
        throw new ApiError(404,"No Buy Requests")
    }
    res.status(200).json(buyRes)
    

})
const updateStatus=asyncHandler(async(req,res)=>{
    const {buyId,action}=req.params;
        const actionRes=await Buy.findByIdAndUpdate(
            buyId,
            {
                $set:{
                    status:action
                }
            },{
                new:true
    
            }
        );
        res.status(200).json(actionRes);
})
const getOneBuyData=asyncHandler(async(req,res)=>{
    const{buyId}=req.params;
    const buyRes=await Buy.findById(buyId).populate("productId").populate("seller").populate("buyer")
    res.status(200).json(buyRes)
})
export {handleBuyClick,getBuyRequests,getBuyRequestsSend,updateStatus,getOneBuyData}