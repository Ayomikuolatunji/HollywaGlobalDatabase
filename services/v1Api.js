const router = require('../router');

const api=require('express').Router();


api.use('/v1',router)




module.exports=api;