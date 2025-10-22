// npx prisma init

require("dotenv").config()
const express = require("express")
const AuthorRoute = require("./routes/author-route")
const BookRoute = require("./routes/book-route")
const promClient = require("prom-client");

const app = express()
app.use(express.json())

const register = new promClient.Registry();
promClient.collectDefaultMetrics({ register });


const httpRequestsCounter =new promClient.Counter({
    name: "http_requests_total",
    help: "Total number of HTTP requests",
    labelNames: ["method", "route", "status"]
});

register.registerMetric(httpRequestsCounter);


// Middleware to track  API requests

app.use((req, res, next) => {
    res.on('finish', () => {
        httpRequestsCounter.inc({
            method: req.method,
            route: req.path,
            status: res.statusCode
        });
    });
    next();
})


//Expose the /metrics endpoint for prometheus

app.get('/metrics', async (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics())
})



app.use("/api/author", AuthorRoute)
app.use("/api/book", BookRoute)



app.listen(3000, () => {
    console.log("Server is running on 3000");
})