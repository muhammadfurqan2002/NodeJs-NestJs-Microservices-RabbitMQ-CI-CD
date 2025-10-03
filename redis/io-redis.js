const Redis = require("ioredis");

const redis = new Redis();

async function ioRedisDemo() {
  try {
    await redis.set("key", "value");
    const value = await redis.get("key");
    console.log("Value from Redis:", value);
  } catch (err) {
    console.error("Error interacting with Redis:", err);
  } finally {
    redis.disconnect();
  }
}


ioRedisDemo();