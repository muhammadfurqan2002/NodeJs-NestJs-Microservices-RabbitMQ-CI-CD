const redis=require("redis");

const client=redis.createClient({
    host:'localhost',
    post:6379
})


//event listener

client.on('error',(error)=>{
    console.log("Redis client error appear")
});


async function testRedisConnection() {
    try{
        await client.connect();
        console.log('connected');

        // CRUD operations in redis
       
        await client.set('name','furqan');

        const value=await client.get('name');
        console.log(value);

        const del=await client.del('name');
        console.log(del); //1 if deleted otherwise 0

        const exists=await client.exists('name');
        console.log(exists); // 0 if not exist otherwise 1

        await client.set("count",100);
        console.log(await client.incr("count")); //101
        console.log(await client.decr("count")); //100
        
    }catch(e){
        console.log(error);
    }finally{
        await client.quit()   //use for closing some already open connections
    }
}


testRedisConnection();