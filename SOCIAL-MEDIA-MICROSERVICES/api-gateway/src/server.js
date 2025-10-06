require("dotenv").config();
const express = require('express');
const cors = require('cors');
const Redis = require('ioredis');
const helmet = require('helmet');
const { rateLimit } = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis')
const logger = require('./utils/logger');
const proxy = require('express-http-proxy');
const errorHandler = require('./middleware/errorHandler');
const app = express();
const PORT = process.env.PORT || 3000;

const redisClient = new Redis(process.env.REDIS_URL);

app.use(helmet());
app.use(cors());
app.use(express.json());




const ratelimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 5 requests per windowMs
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


app.use(ratelimit);


app.use((req, res, next) => {
    logger.info(`Received ${req.method} request to ${req.url}`);
    logger.info('Request Body:', req.body);
    next();
})



const proxyOptions = {
    proxyReqPathResolver: (req) => {
        return req.originalUrl.replace(/^\/v1/, '/api');
    },
    proxyErrorHandler: (err, res, next) => {
        logger.error('Proxy error:', err.message);
        res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
    }
}


//setting up the proxy for identity service
app.use('/v1/auth', proxy(process.env.IDENTITY_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        proxyReqOpts.headers["Content-Type"] = "application/json";
        return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
        logger.info(`Response from Identity Service for ${userReq.method} ${userReq.url}: ${proxyRes.statusCode}`);
        return proxyResData;
    }
}));


//setting up the proxy for post service
app.use('/v1/auth', proxy(process.env.IDENTITY_SERVICE_URL, {
    ...proxyOptions,
    proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
        proxyReqOpts.headers["Content-Type"] = "application/json";
        return proxyReqOpts;
    },
    userResDecorator: (proxyRes, proxyResData, userReq, userRes) => {
        logger.info(`Response from Identity Service for ${userReq.method} ${userReq.url}: ${proxyRes.statusCode}`);
        return proxyResData;
    }
}));


app.use(errorHandler)


app.listen(PORT, () => {
    logger.info(`API Gateway running on port ${PORT}`);
    logger.info(`Identity service is running on port ${process.env.IDENTITY_SERVICE_URL}`);
    logger.info(`Redis Url is ${process.env.REDIS_URL}`);
});

