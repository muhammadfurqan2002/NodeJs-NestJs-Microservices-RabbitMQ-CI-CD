// pub/sub -> publisher -> send -> channel -> subscriber will consume the message

const redis = require("redis");

const client = redis.createClient({
  host: "localhost",
  post: 6379,
});

//event listener

client.on("error", (error) => {
  console.log("Redis client error appear");
});

async function testAdditionalFeatures() {
  try {
    await client.connect();
    console.log("connected");
    // publish subscribe
    const subscriber = client.duplicate(); // it will create another connection(new Client) -> shares the same configuration as client
    await subscriber.connect(); // connect to redis server for subscriber

    await subscriber.subscribe("news", (message, channel) => {
      console.log(`Received message from ${channel}:`, message);
    });

    // publish message to channel(news)

    await client.publish("news", "Hello, this is a news message!");
    await client.publish("news", "Breaking news: Redis is awesome!");
    await client.publish(
      "news",
      "Latest update: Node.js and Redis work great together!"
    );

    await new Promise((resolve) => setTimeout(resolve, 1000)); // wait for a second to receive messages
    await subscriber.unsubscribe("news");
    await subscriber.quit(); // disconnect subscriber
    console.log("Subscriber disconnected");

    // pipelining & transactions
    // pipelining -> send multiple commands(batch) to server without waiting for the response of each command
    // transactions -> group multiple commands into a single atomic operation (using MULTI and EXEC commands)
    // e.g money transfer from one account to another

    const multi = client.multi(); // start transaction
    multi.set("transaction-account:1", 1000);
    multi.set("transaction-account:2", 500);
    multi.get("transaction-account:1");
    multi.get("transaction-account:2");

    const results = await multi.exec(); // execute all commands in transaction
    console.log(results); // [ 'OK', 'OK', '1000', '500' ]

    //pipelining
    const pipeline = client.pipeline();
    pipeline.incr("pipeline-counter", "val1");
    pipeline.incr("pipeline-counter", "val2");
    pipeline.incr("pipeline-counter");
    const pipelineResults = await pipeline.exec();
    console.log(pipelineResults); // [ [ null, 1 ], [ null, 2 ], [ null, 3 ] ]

    // batch data operations

    const pipeline1 = client.multi();
    for (let i = 1; i <= 100; i++) {
      pipeline1.set(`key:${i}`, `value${i}`);
    }

    await pipeline1.exec();
    console.log("Batch data insertion completed");

    // dummy example of banking system

    const dummyTransaction = client.multi();
    dummyTransaction.decr("account:A", 1000);
    dummyTransaction.incr("account:B", 1000);

    const dummyResults = await dummyTransaction.exec();
    console.log(dummyResults); // [ [ null, 9000 ], [ null, 4000 ] ]

    const cartExample = client.multi();
    multi.incrBy("cart:100", "item_count", 1);
    multi.incrBy("cart:100", "total_price", 10);
    await multi.exec();

    console.timeEnd(
      "Performance optimizations using pipelining and transactions completed"
    );
    console.time(
      "Without pipelining and transactions, each command would require a round-trip to the server, resulting in higher latency and reduced throughput."
    );
    for (let i = 1; i <= 100; i++) {
      await client.get(`key:${i}`);
    }
    console.timeEnd("Data retrieval without pipelining completed");

    console.time("with-pipelining");
    for (let i = 1; i <= 100; i++) {
      await pipeline.set(`pipeline-key:${i}`, `user${i}`);
    }

    await pipeline.exec();
    console.timeEnd("Data insertion with pipelining completed");
  } catch (e) {
    console.error(e);
  } finally {
    await client.quit();
  }
}

testAdditionalFeatures();
