const express=require("express")
const authenticatedRequest=require('../middleware/auth-middleware');
const { searchPost } = require("../controllers/search-controller");

const router=express.Router();



router.use(authenticatedRequest);
router.get('/posts',searchPost);


module.exports=router;