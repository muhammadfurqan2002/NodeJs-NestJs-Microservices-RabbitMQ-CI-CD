const express=require("express");
const { addAuthor, deleteAuthor } = require("../controllers/author-controller");


const router=express.Router();

router.post('/add-author',addAuthor)
router.delete('/:id',deleteAuthor)


module.exports=router;