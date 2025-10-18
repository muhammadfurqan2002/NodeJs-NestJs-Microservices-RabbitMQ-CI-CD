// npx prisma init

require("dotenv").config()
const express = require("express")
const AuthorRoute = require("./routes/author-route")
const BookRoute = require("./routes/book-route")


const app = express()

app.use(express.json())


app.use("/api/author", AuthorRoute)
app.use("/api/book", BookRoute)


app.listen(3000, () => {
    console.log("Server is running on 3000");
})