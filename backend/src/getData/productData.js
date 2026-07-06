import { Product } from "../models/products.model.js";
const productData=async(req,res)=>{
    try {
        
        const totalProducts= await Product.countDocuments();

        const limit=5;
        
        const random =Math.floor(
            Math.random()*Math.max(totalProducts-limit,0)
        );
        
        const Products=await Product.find().skip(random).limit(limit).populate("productOwner")
        res.status(200).json(Products)
        
            
        
        
    } catch (error) {
        
        console.log(error)
        
    }
}
export {productData}