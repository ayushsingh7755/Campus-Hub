import 'dotenv/config';
import  express from 'express'
import {connectDb} from './database/connect.js'
import app from './App.js'


app.get("/", (req, res) => {
  res.send("Backend working perfectly on 4000");
});
connectDb().then(()=>{
    app.listen(process.env.PORT||4000,()=>{
        console.log(`App is running at the port ${process.env.PORT}`)
    })}
)


