const express=require("express");
const { createPost, fetchPosts, getPost, deletePost } = require("../controllers/post-controller");
const authenticatedRequest = require("../middleware/auth-middleware");


const route=express.Router();


// route.post("/post",authenticatedRequest,createPost);

route.use(authenticatedRequest);


route.post('/create-post',createPost);
route.get('/all-posts',fetchPosts);
route.get('/:id',getPost);
route.delete('/:id',deletePost);

module.exports=route;