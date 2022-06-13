

const express=require("express")
const { createPosts, getPosts, getPost } = require("./controllers")

const router=express.Router()



router.post("/posts", createPosts)

router.get("/posts",getPosts)

router.get("/posts/:id",getPost)

module.exports=router


