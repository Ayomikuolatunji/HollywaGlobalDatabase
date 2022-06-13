const db=require('../models/index');


export const createPosts=async(req,res)=>{
    try{
        const post=await db.posts.create(req.body);
        res.status(200).json(post);
    }catch(err){
        res.status(500).json(err);
    }
}

export const getPosts=async(req,res)=>{
    try{
        const posts=await db.posts.findAll({});
        res.status(200).json(posts);
    }catch(err){
        res.status(500).json(err);
    }
}