const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();



async function addBook(title, publishedDate, authorId) {
    try {
        const newlyCreatedBook = await prisma.book.create({
            data: {
                title,
                publishedDate,
                author: {
                    connect: { id: authorId }
                },
            },
            include: { author: true }
        });
        return newlyCreatedBook;
    } catch (e) {
        console.log(e);
    }
}

async function fetchAllBooks(params) {
    try {
        const books = await prisma.book.findMany({
            include: { author: true }
        });
        return books;
    } catch (e) {
        throw e;
    }
}
async function fetchSingleBook(id) {
    try {
        const books = await prisma.book.findUnique({
            where: { id },
            include: { author: true }
        })
        if (!books) {
            throw new Error("No Book find")
        }
        return books;
    } catch (e) {
        throw e;
    }
}
async function updateBook(id, newtitle) {
    try {

        // const books = await prisma.book.findUnique({
        //     where: { bookId },
        //     include: { author: true }
        // })
        // if (!books) {
        //     throw new Error("No Book find")
        // }

        // const updatedBook = await prisma.book.update({
        //     where: { bookId },
        //     data: {
        //         title: newtitle
        //     },
        //     include: {
        //         author: true
        //     }
        // })
        // if (!updatedBook) {
        //     throw new Error("No Book find")
        // }
        // return updateBook;


        // using transactions

        const updateBook = await prisma.$transaction(async (prisma) => {
            const book = await prisma.book.findUnique({ where: { id } });
            if (!book) {
                throw new Error("No Book find")
            }

            return prisma.book.update({
                where: { id },
                data: {
                    title: newtitle
                },
                include: {
                    author: true
                }
            })

        })


        return updateBook;

    } catch (e) {
        throw e;
    }
}
async function deleteBook(id) {
    try {
        const book = await prisma.book.delete({
            where: { id },
            include: { author: true }
        })
        return book;
    } catch (e) {
        throw e;
    }
}
module.exports = {
    addBook,
    fetchAllBooks,
    fetchSingleBook,
    updateBook,
    deleteBook
}