import mongoose, { connect } from "mongoose";
import {db_name} from '../constants.js'
const connectDb=async()=>{
    try {
        const connectedResponse=await mongoose.connect(`${process.env.MONGO_URL}${db_name}`)
        await console.log(`The database is succesfully connected at ${connectedResponse.connection.host} aur gand phad do bhai`)
    } catch (error) {
        console.log("Error connecting to the database",error)
        process.exit(1)
    }
}
export {connectDb}