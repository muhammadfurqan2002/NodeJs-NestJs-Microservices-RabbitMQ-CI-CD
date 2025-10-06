const Post = require("../models/post");
const logger=require("../utils/logger");




const createPost=async(req,res)=>{
    logger.info("Create Post endpoint hit");
    try{
        const {content,mediaIds}=req.body;
        const post=new Post({
            user:req.user.userId,
            content,
            mediaIds
        });

        await post.save();

        logger.info("Post created successfully",post);

        res.status(201).json({
            success:true,
            message:"Post created successfully"
        })

    }catch(e){
        logger.error("Error creating post",e);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
const fetchPosts=async(req,res)=>{
    logger.info("Fetching Posts endpoint hit");
    try{

    }catch(e){
        logger.error("Error Fetching posts",e);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
const getPost=async(req,res)=>{
    logger.info("Get post endpoint hit");
    try{

    }catch(e){
        logger.error("Error getting post",e);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}
const deletePost=async(req,res)=>{
    logger.info("Delete post endpoint hit");
    try{

    }catch(e){
        logger.error("Error deleting post",e);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        })
    }
}



module.exports={
    createPost
}