import { mongoose,Schema } from "mongoose";
const bidSchema=new Schema({
    productId:{
        type:Schema.Types.ObjectId,
        ref:"Product"
    },
    buyer:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    seller:{
        type:Schema.Types.ObjectId,
        ref:"User"

    },
    bidAmount:{
        type:Number,
        required:true

    },
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }
    

},{timestamps:true})
export const Bid=mongoose.model("Bid",bidSchema)