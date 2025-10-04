require('dotenv').config();
const mongoose = require('mongoose');
const logger = require('./utils/logger');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { RateLimiterRedis } = require('rate-limiter-flexible')
const Redis = require('ioredis');
const { rateLimit } = require('express-rate-limit')
const { RedisStore } = require('rate-limit-redis');
const identityRoutes = require('./routes/identity-service');
const errorHandler = require('./middleware/errorHandler');
const app = express();


mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => { logger.info("Connected to MongoDB"); }).catch((error) => { logger.error("MongoDB connection error:", error); process.exit(1); });


const redisClient = new Redis(process.env.REDIS_URL);
redisClient.on('error', (err) => {
    logger.error('Redis error:', err);
})


app.use(helmet());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    logger.info(`Received ${req.method} request to ${req.url}`);
    logger.info('Request Body:', req.body);
    next();
})





//DDos protection and rate limiting
const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: 'middleware',
    points: 100, // 10 requests
    duration: 15 * 60, // per 15 minutes
    blockDuration: 15 * 60 // block for 15 minutes if consumed more than points
})



app.use((req, res, next) => {
    rateLimiter.consume(req.ip).then(() => next()).catch(() => {logger.warn('Too many requests from IP:', req.ip);res.status(429).json({ success: false, message: 'Too many requests, please try again later' })});
})




// Ip based rate limiting for sensitive routes/endpoints
const sensitiveEndPointsLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 500, // limit each IP to 5 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res) => {
        logger.warn("Sensitive endpoint rate limit exceeded for IP:", req.ip);
        res.status(429).json({ success: false, message: 'Too many requests from this IP, please try again after 15 minutes' })
    },
    store: new RedisStore({
        sendCommand: (...args) => redisClient.call(...args),
    })
})

// apply this sensitiveEndPointsLimiter to specific routes only
app.use('/api/auth/register',sensitiveEndPointsLimiter);

app.use('/api/auth',identityRoutes);



//error handling middleware

app.use(errorHandler)


app.listen(process.env.PORT, () => {
    logger.info(`Identity Service running on port ${process.env.PORT}`);
})



//  unhandled promise rejections handler

process.on('unhandledRejection', (reason, promise) => { 
    logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
})