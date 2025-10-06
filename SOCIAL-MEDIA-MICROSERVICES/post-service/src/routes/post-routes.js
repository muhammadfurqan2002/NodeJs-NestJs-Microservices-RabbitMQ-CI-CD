const express=require("express");
const { createPost } = require("../controllers/post-controller");
const authenticatedRequest = require("../middleware/auth-middleware");


const route=express.Router();


// route.post("/post",authenticatedRequest,createPost);

route.use(authenticatedRequest);


route.post('/create',createPost);

module.exports=route;