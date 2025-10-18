const express=require("express");
const { addBook, getAllBooks, getBook, updateBook, deleteBook } = require("../controllers/book-controller");


const router=express.Router();

router.post('/add-book',addBook)
router.get('/get-books',getAllBooks)
router.get('/get-book/:id',getBook)
router.put('/update-book/:id',updateBook)
router.delete('/delete-book/:id',deleteBook)



module.exports=router;