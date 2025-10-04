# Node.js Projects Collection

This repository contains a collection of Node.js projects and examples demonstrating various concepts, frameworks, and architectures. It includes basic Node.js demos, Express.js applications, Redis integrations, and a microservices-based social media platform.

## Project Structure

### basic/
Contains fundamental Node.js concepts and demos:
- `buffer-demo.js`: Demonstrates Buffer usage for handling binary data, including allocation, creation from strings/arrays, writing, reading, slicing, and concatenation.
- `event-loop.js`: Illustrates Node.js event loop phases with examples of timers, promises, nextTick, I/O callbacks, and crypto operations.
- `stream-demo.js`: Shows stream usage including readable, writable, duplex, and transform streams, with a practical example of file compression and encryption.
- `input.txt`: Sample input file for stream demos.
- `output.text.gz.enc`: Encrypted and compressed output from stream demo.

### express-concept/
An Express.js application showcasing middleware and routing:
- `server.js`: Main server file setting up Express app with middleware.
- `config/corsConfig.js`: CORS configuration.
- `middleware/`: Custom middleware including API versioning, custom middleware, error handling, and rate limiting.
- `routes/item-routes.js`: Routes for item management.
- Dependencies: Express, CORS, dotenv, express-rate-limit, nodemon.

### redis/
Redis integration examples and demos:
- `data-structures.js`: Comprehensive demo of Redis data structures (strings, lists, sets, sorted sets, hashes).
- `io-redis.js`: Simple example using ioredis client.
- `pub-sub.js`: Publisher-subscriber pattern, pipelining, transactions, and batch operations.
- `server.js`: Basic server implementation using Redis.
- Dependencies: redis, ioredis.

### SOCIAL-MEDIA-MICROSERVICES/
A microservices architecture for a social media platform:

#### api-gateway/
Acts as the entry point for the microservices:
- `src/server.js`: Main gateway server with proxying, rate limiting, logging, and error handling.
- `src/middleware/errorHandler.js`: Centralized error handling middleware.
- `src/utils/logger.js`: Logging utility using Winston.
- Dependencies: Express, CORS, helmet, express-rate-limit, express-http-proxy, ioredis, rate-limit-redis, winston, jsonwebtoken, dotenv.

#### identity-service/
Handles user authentication and identity management:
- `src/server.js`: Main identity service server.
- `src/controllers/identity-controller.js`: Controllers for auth operations.
- `src/models/user.js` & `src/models/resfreshToken.js`: Mongoose models for users and refresh tokens.
- `src/routes/identity-service.js`: Routes for registration, login, token refresh, etc.
- `src/middleware/errorHandler.js`: Error handling middleware.
- `src/utils/`: Utilities for token generation, logging, and validation.
- Dependencies: Express, mongoose, jsonwebtoken, argon2, joi, cors, helmet, express-rate-limit, ioredis, rate-limit-redis, winston, dotenv.

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Redis server (for redis and microservices projects)
- MongoDB (for identity-service)

## Installation and Running

### Basic Demos
```bash
cd basic
node buffer-demo.js
node event-loop.js
node stream-demo.js
```

### Express Concept
```bash
cd express-concept
npm install
npm run dev  # or npm start
```

### Redis Examples
Ensure Redis server is running on localhost:6379
```bash
cd redis
npm install
node data-structures.js
node io-redis.js
node pub-sub.js
node server.js
```

### Social Media Microservices
#### API Gateway
```bash
cd SOCIAL-MEDIA-MICROSERVICES/api-gateway
npm install
# Set up environment variables in .env (REDIS_URL, IDENTITY_SERVICE_URL, PORT)
npm run dev
```

#### Identity Service
```bash
cd SOCIAL-MEDIA-MICROSERVICES/identity-service
npm install
# Set up environment variables in .env (MONGODB_URI, JWT_SECRET, REDIS_URL, PORT)
npm run dev
```

## Technologies Used

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Redis**: In-memory data structure store
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication
- **Argon2**: Password hashing
- **Winston**: Logging library
- **Helmet**: Security middleware
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Request throttling
- **Streams**: Data processing
- **Buffers**: Binary data handling

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

ISC License
