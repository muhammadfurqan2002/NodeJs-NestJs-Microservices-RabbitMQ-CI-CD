const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();



async function addAuthor(name) {
    try {
        const newAuthor = await prisma.author.create({
            data: {
                name
            }
        })
        return newAuthor;
    } catch (e) {
        throw e;
    }
}

async function deleteAuthor(id) {
    try {
        const deletedAuthor = await prisma.author.delete({
            where: { id },
            include: { books: true }
        })
        return deletedAuthor;
    } catch (e) {
        throw e;
    }
}


module.exports = {
    addAuthor,
    deleteAuthor
}