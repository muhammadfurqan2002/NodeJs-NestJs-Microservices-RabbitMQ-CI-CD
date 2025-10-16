# Node.js Projects Collection

A concise collection of Node.js example projects and reference implementations for learning and experimentation. Includes core Node demos, an Express concept app, Redis examples, and a microservices sample (social-media).

## Quick start
1. Open the repo folder: e:\Node-Js Projects advance\Node-Js\projects  
2. Explore folders: basic/, express-concept/, redis/, SOCIAL-MEDIA-MICROSERVICES/  
3. Run examples per project (instructions below).

## Project layout
- basic/  
  - buffer-demo.js — Buffer API examples  
  - event-loop.js — Event loop demonstration  
  - stream-demo.js — Streams pipeline: read → gzip → encrypt → write  
  - input.txt, output.text.gz.enc — sample files

- express-concept/  
  - server.js — Express app bootstrap  
  - config/corsConfig.js — CORS helper  
  - middleware/ — apiVersioning, customMiddleware, rateLimiting, errorHandler  
  - routes/item-routes.js — example CRUD routes

- redis/  
  - data-structures.js — Redis data structures examples  
  - io-redis.js — ioredis example  
  - pub-sub.js — Pub/Sub and pipelines  
  - server.js — example server using Redis

- SOCIAL-MEDIA-MICROSERVICES/  
  - api-gateway/, identity-service/, post-service/, media-service/, search-service/  
  - docker-compose.yml — local orchestration (MongoDB, Redis, RabbitMQ)  
  - each service: src/, Dockerfile, package.json

## How to run (examples)
Basic demos:
```powershell
cd "e:\Node-Js Projects advance\Node-Js\projects\basic"
node buffer-demo.js
node event-loop.js
node stream-demo.js
```

Express concept:
```powershell
cd "e:\Node-Js Projects advance\Node-Js\projects\express-concept"
npm install
npm run dev
```

Redis examples (requires Redis on localhost:6379):
```powershell
cd "e:\Node-Js Projects advance\Node-Js\projects\redis"
npm install
node data-structures.js
node io-redis.js
node pub-sub.js
node server.js
```

Microservices (Docker Compose):
```powershell
cd "e:\Node-Js Projects advance\Node-Js\projects\SOCIAL-MEDIA-MICROSERVICES"
docker compose up --build
```
Or run services individually: create a `.env` in each service, then `npm install` and `npm run dev`.

## Common environment variables (examples)
- PORT  
- MONGODB_URI  
- JWT_SECRET  
- REDIS_URL  
- RABBITMQ_URL  
- CLOUDINARY_URL (or CLOUDINARY_*)

Refer to each service's src/server.js for exact names.

## Technologies used
- Runtime: Node.js (v14+)  
- Web: Express.js, CORS, Helmet  
- Datastores/Brokers: Redis (node-redis, ioredis), MongoDB + Mongoose, RabbitMQ (amqplib)  
- Auth & Security: jsonwebtoken (JWT), argon2, express-rate-limit, rate-limit-redis  
- Streams & Utilities: stream, zlib, crypto, fs  
- Logging & Validation: winston, joi  
- Dev & Infra: nodemon, Docker, Docker Compose, GitHub Actions (examples)

## Contributing
1. Fork the repository  
2. Create a branch for your change  
3. Commit and push changes  
4. Open a pull request with a brief description

## License
ISC
```// filepath: e:\Node-Js Projects advance\Node-Js\projects\README.md
# Node.js Projects Collection

A concise collection of Node.js example projects and reference implementations for learning and experimentation. Includes core Node demos, an Express concept app, Redis examples, and a microservices sample (social-media).

## Quick start
1. Open the repo folder: e:\Node-Js Projects advance\Node-Js\projects  
2. Explore folders: basic/, express-concept/, redis/, SOCIAL-MEDIA-MICROSERVICES/  
3. Run examples per project (instructions below).

## Project layout
- basic/  
  - buffer-demo.js — Buffer API examples  
  - event-loop.js — Event loop demonstration  
  - stream-demo.js — Streams pipeline: read → gzip → encrypt → write  
  - input.txt, output.text.gz.enc — sample files

- express-concept/  
  - server.js — Express app bootstrap  
  - config/corsConfig.js — CORS helper  
  - middleware/ — apiVersioning, customMiddleware, rateLimiting, errorHandler  
  - routes/item-routes.js — example CRUD routes

- redis/  
  - data-structures.js — Redis data structures examples  
  - io-redis.js — ioredis example  
  - pub-sub.js — Pub/Sub and pipelines  
  - server.js — example server using Redis

- SOCIAL-MEDIA-MICROSERVICES/  
  - api-gateway/, identity-service/, post-service/, media-service/, search-service/  
  - docker-compose.yml — local orchestration (MongoDB, Redis, RabbitMQ)  
  - each service: src/, Dockerfile, package.json

## How to run (examples)
Basic demos:
```powershell
cd "e:\Node-Js Projects advance\Node-Js\projects\basic"
node buffer-demo.js
node event-loop.js
node stream-demo.js
```

Express concept:
```powershell
cd "e:\Node-Js Projects advance\Node-Js\projects\express-concept"
npm install
npm run dev
```

Redis examples (requires Redis on localhost:6379):
```powershell
cd "e:\Node-Js Projects advance\Node-Js\projects\redis"
npm install
node data-structures.js
node io-redis.js
node pub-sub.js
node server.js
```

Microservices (Docker Compose):
```powershell
cd "e:\Node-Js Projects advance\Node-Js\projects\SOCIAL-MEDIA-MICROSERVICES"
docker compose up --build
```
Or run services individually: create a `.env` in each service, then `npm install` and `npm run dev`.

## Common environment variables (examples)
- PORT  
- MONGODB_URI  
- JWT_SECRET  
- REDIS_URL  
- RABBITMQ_URL  
- CLOUDINARY_URL (or CLOUDINARY_*)

Refer to each service's src/server.js for exact names.

## Technologies used
- Runtime: Node.js (v14+)  
- Web: Express.js, CORS, Helmet  
- Datastores/Brokers: Redis (node-redis, ioredis), MongoDB + Mongoose, RabbitMQ (amqplib)  
- Auth & Security: jsonwebtoken (JWT), argon2, express-rate-limit, rate-limit-redis  
- Streams & Utilities: stream, zlib, crypto, fs  
- Logging & Validation: winston, joi  
- Dev & Infra: nodemon, Docker, Docker Compose, GitHub Actions

## Contributing
1. Fork the repository  
2. Create a branch for your change  
3. Commit and push changes  
4. Open a pull request with a brief description
