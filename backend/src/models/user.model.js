import {mongoose,Schema} from "mongoose"; 
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"
const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true
    },
    fullname:{
        type:String,
        required:true,
    },
    password:{
        required:true,
        type:String,

    },
    avatar:{
        required:true,
        type:String
    },
    
    college:{
        required:true,
        type:String
        
    },
    contactNumber:{
        required:true,
        type:String

    },
    course:{
        type:String,
        required:true
    },
    year:{
        required:true,
        type:String
    }
    ,
    refreshToken:{
        type:String
    }
},{timestamps:true})
userSchema.pre("save",async function(){
    if(!this.isModified("password")) return;
    this.password=await bcrypt.hash(this.password,10)
})
userSchema.methods.isPasswordCorrect=async function(password){

return await bcrypt.compare(password,this.password)
}
userSchema.methods.generateAccessToken=async function(){
    return jwt.sign(
        {
        _id:this._id,
        email:this.email,
        username:this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
)

}
userSchema.methods.generateRefreshToken=async function(){
    return jwt.sign(
        {
        _id:this._id,
        
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
)

}

export const User=mongoose.model("User",userSchema)