const api=require('express').Router();
import userRouter from "../routes/user.route";

// user routes
api.use("/v1", userRouter)





export default api;