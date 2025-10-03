const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  post: 6379,
});

//event listener

client.on("error", (error) => {
  console.log("Redis client error appear");
});

async function redisDataStructures() {
  try {
    await client.connect();
    // Strings -> SET, GET, DEL, EXISTS, INCR, DECR, mSET, mGET
    await client.set("user:name", "furqan");
    console.log(await client.get("user:name")); // furqan

    // multi set and multi get key value pairs
    await client.mSet(["user:city", "karachi", "user:country", "pakistan"]);
    const [city, country, name] = await client.mGet([
      "user:city",
      "user:country",
      "user:name",
    ]);
    console.log(city, country, name); // karachi pakistan

    //lists -> LPUSH, RPUSH, LPOP, RPOP, LRANGE (similar working like arrays)
    await client.rPush("fruits", "apple");
    await client.lPush("fruits", "banana");

    await client.lRange("fruits", 0, -1).then(console.log); // [ 'banana', 'apple' ]

    await client.lPop("fruits");
    await client.lRange("fruits", 0, -1).then(console.log); //RETURN [ 'apple' ]
    await client.lPop("fruits");
    await client.lRange("fruits", 0, -1).then(console.log); //RETURN []

    // Sets -> SADD, SREM, SMEMBERS, SISMEMBER (unordered collection of unique strings)

    await client.sAdd("tags", "nodejs");
    await client.sAdd("tags", "redis");
    await client.sAdd("tags", "database");
    await client.sAdd("tags", "nodejs"); //duplicate will not be added

    // await client.sAdd("name",["furqan","ali","ahmed"]);

    console.log(await client.sMembers("tags")); // [ 'nodejs', 'redis', 'database' ]

    await client.sRem("tags", "database"); // remove database from set
    console.log(await client.sMembers("tags")); // [ 'nodejs', 'redis' ]
    console.log(await client.sIsMember("tags", "nodejs")); // 1 (true)
    console.log(await client.sIsMember("tags", "database")); // 0 (false)

    // Sorted Sets -> ZADD, ZRANGE, ZREM, ZSCORE, ZRANK ,ZRANGESCORES (like sets but ordered by score)
    // e.g cart , player scores , leaderboard etc
    await client.zAdd("players", [
      { score: 10, value: "player1" },
      { score: 20, value: "player2" },
      { score: 200, value: "player3" },
    ]);
    console.log(await client.zRange("players", 0, -1)); // [ 'player1', 'player3', 'player2' ]
    console.log(await client.zScore("players", "player3")); // 15
    console.log(await client.zRem("players", "player2")); // 1 (removed)
    console.log(await client.zRange("players", 0, -1)); // [ 'player1', 'player3' ]

    console.log(await client.zRangeWithScores("players", 0, -1)); // [//   { value: 'player1', score: 10 },//   { value: 'player3', score: 200 }// ]
    console.log(await client.zRank("players", "player3")); // 1 (index position)

    // Hashes -> HSET, HGET, HGETALL, HDEL, HEXISTS (like objects key value pairs)
    await client.hSet("product:1", {
      name: "laptop",
      price: "1000",
      quantity: "5",
    });
    console.log(await client.hGet("product:1", "name")); // laptop
    await client.hDel("product:1", "price");
    console.log(await client.hGet("product:1", "price")); // 1000
    console.log(await client.hGetAll("product:1")); // { name: 'laptop', price: '1000', quantity: '5' }



    console.log(await client.hGet("product:1", "name"));
  } catch (e) {
    console.error(e);
  } finally {
    client.quit();
  }
}

redisDataStructures();
