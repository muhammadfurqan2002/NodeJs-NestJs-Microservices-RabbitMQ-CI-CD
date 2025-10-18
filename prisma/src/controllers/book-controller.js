// exports.addBook


const bookService = require("../services/bookService")




exports.addBook = async (req, res) => {
    try {
        const { title, publishedDate, authorId } = req.body;
        const book = await bookService.addBook(title, new Date(publishedDate), authorId);
        res.status(201).json(book);
    } catch (e) {
        res.status(500).json({ error: error.message });
    }
}

exports.updateBook = async (req, res) => {
    try {
        const updatedBook = await bookService.updateBook(parseInt(req.params.id),req.body.title);
        res.json(updatedBook);
    } catch (e) {
        res.status(500).json({ error: error.message });
    }
}
exports.getBook = async (req, res) => {
    try {
        const book = await bookService.fetchSingleBook(parseInt(req.params.id));
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
exports.getAllBooks = async (req, res) => {
    try {
        const books = await bookService.fetchAllBooks();
        res.json(books);
    } catch (e) {
        res.status(500).json({ error: error.message });
    }
}
exports.deleteBook = async (req, res) => {
    try {
        const deleteBook = await bookService.deleteBook(parseInt(req.params.id));
        res.status(201).json({ message: "Book deleted successfully", book: deleteBook });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}