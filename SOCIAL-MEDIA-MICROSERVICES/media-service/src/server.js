require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const Redis = require("ioredis");
const cors = require("cors");
const helmet = require("helmet");
const MediaRoutes = require("./routes/media-route")
const errorHandler = require('./middleware/errorHandler');
const logger = require("./utils/logger");
const { connectRabbitMQ, consumeEvent } = require('./utils/rabbitmq');
const { handlePostDeleted } = require('./eventHandlers/media-event-handlers');


const app = express();



const PORT = process.env.PORT || 3003;


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => { logger.info("Connected to MongoDB"); }).catch((error) => { logger.error("MongoDB connection error:", error); process.exit(1); });

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    logger.info(`Received ${req.method} request to ${req.url}`);
    logger.info('Request Body:', req.body);
    next();
})

// implement rate limiting on sensitive end points




app.use('/api/media', MediaRoutes);


app.use(errorHandler);


async function startServer() {
    try {
        await connectRabbitMQ()
        //here we will consume all events
        await consumeEvent("post.deleted", handlePostDeleted);
        app.listen(process.env.PORT, () => {
            logger.info(`Media Service running on port ${process.env.PORT}`);
        })
    } catch (e) {
        logger.info("Failed to connect to server", e);
        process.exit(1);
    }
}

startServer();
//unhandled promise rejections handler

process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
})