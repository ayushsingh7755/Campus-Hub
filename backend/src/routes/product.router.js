import { Router } from "express";
import { uploadProduct } from "../controllers/product.controller.js";
import { getAuth } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";
import { getProductServices } from "../getData/servicedata.js";
import { productData } from "../getData/productData.js";
import { getProducts } from "../getData/getProducts.js";
import { getUserProducts } from "../getData/getUserProducts.js";
import { getOneProduct } from "../getData/oneProduct.js";
import { bidAction, getIncomingBids, getOneBidData, myBids, storeBid } from "../controllers/bid.controller.js";
import { getBuyRequests, getBuyRequestsSend, getOneBuyData, handleBuyClick, updateStatus } from "../controllers/buy.controller.js";

const routerProduct=Router();
routerProduct.route("/register").post(upload.fields([
    {
        name:"productImage",
        maxCount:10
    }
]),getAuth,uploadProduct)
routerProduct.route("/getServices/:collegeName").get(getProductServices)
routerProduct.route("/getProducts/:collegeName").get(getProducts)

routerProduct.route("/getProducts").get(productData)
routerProduct.route("/getUserProducts").get(getAuth,getUserProducts)
routerProduct.route("/getProducts/one/:productId").get(getOneProduct)
routerProduct.route("/bid/:productId/:seller").post(getAuth,storeBid)
routerProduct.route("/bid/incomingbids").get(getAuth,getIncomingBids)
routerProduct.route("/bid/:bidId/:action").patch(getAuth,bidAction)
routerProduct.route("/bid/mybids").get(getAuth,myBids)
routerProduct.route("/bid/mybids").get(getAuth,myBids)
routerProduct.route("/buyrequest/:productId/:seller").post(getAuth,handleBuyClick)
routerProduct.route("/buy/getincomingbuys").get(getAuth,getBuyRequests)
routerProduct.route("/buy/getoutgoingbuys").get(getAuth,getBuyRequestsSend)
routerProduct.route("/buy/:buyId/:action").patch(getAuth,updateStatus)
routerProduct.route("/getOneBuyData/:buyId").get(getAuth,getOneBuyData)
routerProduct.route("/getOneBidData/:bidId").get(getAuth,getOneBidData)




export{routerProduct}
