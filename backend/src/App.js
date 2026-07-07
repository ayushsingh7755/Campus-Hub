import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import {router} from './routes/user.router.js'
import { routerProduct } from './routes/product.router.js'
import { getAuth } from './middleware/auth.middleware.js'

const app=express()

app.use(cors({
    origin:["http://localhost:5173",
     " https://campus-hub-4i9c.vercel.app"
    ],
    credentials:true
}));

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/public",express.static("public"))
app.use("/users",router)
app.use("/product",routerProduct)

    

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message,
  });
});


export default app;