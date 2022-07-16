const api=require('express').Router();
import userRouter from "../routes/user.route";
import productRouter from "../routes/products.route";

// user routes
api.use("/v1", userRouter)

// products routes
api.use("/v1",productRouter)





export default api;