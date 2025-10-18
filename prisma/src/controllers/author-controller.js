const authorService = require("../services/authorService")


exports.addAuthor = async (req, res) => {
    try {
        const { name } = req.body;
        const author = await authorService.addAuthor(name);
        res.status(201).json(author)
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
}


exports.deleteAuthor = async (req, res) => {
    try {
        const deletedData = await authorService.deleteAuthor(parseInt(req.params.id));

        res.json(deletedData);
    } catch (e) {
        res.status(400).json({ error: e.message })
    }
}