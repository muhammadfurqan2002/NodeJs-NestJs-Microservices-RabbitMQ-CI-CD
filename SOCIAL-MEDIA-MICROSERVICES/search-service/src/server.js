require("dotenv").config()

const express = require("express");
const mongoose = require("mongoose");
const Redis = require("ioredis");
const cors = require("cors");
const helmet = require("helmet");
const errorHandler = require('./middleware/errorHandler');
const logger = require("./utils/logger");
const { connectRabbitMQ, consumeEvent } = require('./utils/rabbitmq');
const searchRoute = require("./routes/search-routes");
const { handlePostCreated, handlePostDeleted } = require("./eventHandlers/search-event-handler");


const app = express()
const PORT = process.env.PORT;


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => { logger.info("Connected to MongoDB"); }).catch((error) => { logger.error("MongoDB connection error:", error); process.exit(1); });

const redisClient = new Redis(process.env.REDIS_URL);

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    logger.info(`Received ${req.method} request to ${req.url}`);
    logger.info('Request Body:', req.body);
    next();
})

// implement rate limiting on sensitive end points



app.use("/api/search", searchRoute);

app.use(errorHandler);


async function startServer() {
    try {
        await connectRabbitMQ();
        // consume event // subscribe event
        await consumeEvent("post.created",handlePostCreated);
        await consumeEvent("post.deleted",handlePostDeleted);
        app.listen(PORT,()=>{   
            logger.info(`Search server is running on port : ${PORT}`)
        })
    } catch (e) {
        logger.error(e, "Failed to start search service");
        process.exit(1);
    }
}


startServer();