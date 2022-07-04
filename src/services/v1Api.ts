const api=require('express').Router();
const router = require('../router');
const userRouter=require("../routes/user.route")

// user routes
api.use("/v1", userRouter)
api.use('/v1',router)




module.exports=api;