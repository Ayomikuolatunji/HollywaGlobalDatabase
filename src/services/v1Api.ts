const api = require("express").Router();
import userRouter from "../routes/user.route";
import productRouter from "../routes/products.route";
import adminRouter from "../routes/admin.route";
import cartRouter from "../routes/cart.route";

// user routes
api.use("/v1", userRouter);

// products routes
api.use("/v1", productRouter);

// admin routes
api.use("/v1", adminRouter);

// cart routes
api.use("/v1", cartRouter);
export default api;
