import {User} from '../models/user.model.js'
import { ApiError } from '../utils/apiError.js'
import { asyncHandler } from '../utils/asynchandler.js'
import { ApiResponse } from '../utils/apiResponse.js'
import { uploadOnCloudinary } from '../utils/cloudinary.js'
import { Bid } from '../models/bid.model.js'
import { Product } from '../models/products.model.js'
const storeBid=asyncHandler(async(req,res)=>{
    
    
    const{bidAmount}=req.body
    const{productId,seller}=req.params;
    const buyer= req.user?._id;
     if (!bidAmount || !productId || !buyer || !seller) {
    throw new ApiError(401, "All fields are required");
}
    const bidResponse=await Bid.create({
        bidAmount,
        productId,
        buyer,
        seller

    })
    res.status(200).json(new ApiResponse(200,bidResponse,"Bid Placed"))
})
const getIncomingBids=asyncHandler(async(req,res)=>{
    const sellerId=req.user?._id;
    const bidRes= await Bid.find({seller:sellerId}).populate("productId").populate("buyer")
    if(!res){
        throw new ApiError(401,"No Bids placed currently")
    }
    res.status(200).json(bidRes);
})
const bidAction=asyncHandler(async(req,res)=>{
    const {bidId,action}=req.params;
    const actionRes=await Bid.findByIdAndUpdate(
        bidId,
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
const myBids=asyncHandler(async(req,res)=>{
    const buyerId=req.user?._id;
    const myBidsRes=await Bid.find({buyer:buyerId}).populate("productId").populate("seller")
    if(!myBidsRes){
        throw new ApiError(401,"No Bids")
    }
    res.status(200).json(myBidsRes);
})
const getOneBidData=asyncHandler(async(req,res)=>{
    const{bidId}=req.params;
    const buyRes=await Bid.findById(bidId).populate("productId").populate("seller").populate("buyer")
    res.status(200).json(buyRes)
})

export {storeBid,getIncomingBids,bidAction,myBids,getOneBidData}