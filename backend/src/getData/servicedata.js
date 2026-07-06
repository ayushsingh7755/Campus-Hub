import { Product } from "../models/products.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";
const getProductServices = async (req, res) => {

  const {collegeName}= req.params;
  
  const pData = await Product.find({ category: "services" }).populate({
    path:"productOwner",
    match:{college:collegeName}
});
const filteredData = pData.filter(
  (item) => item.productOwner !== null
);

  
 
  if (filteredData.length === 0) {
    throw new ApiError(401, "No services found");
  }

  
  res.status(200).json(filteredData);
};
export {getProductServices};
