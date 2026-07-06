import {mongoose,Schema} from "mongoose";
const buySchema=new Schema({
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
   
    status: {
        type: String,
        enum: ["pending", "accepted", "rejected"],
        default: "pending"
    }

},{timestamps:true})
export const Buy=mongoose.model("Buy",buySchema)