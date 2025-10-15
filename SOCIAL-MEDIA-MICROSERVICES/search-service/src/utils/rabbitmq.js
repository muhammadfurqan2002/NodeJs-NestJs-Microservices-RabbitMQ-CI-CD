const ampq = require("amqplib")
const logger = require("./logger")


let connection = null;
let channel = null;

const EXCHANGE_NAME = 'facebook_name';

async function connectRabbitMQ() {
    try {
        connection = await ampq.connect({
            protocol: "amqp",
            hostname: "localhost",
            port: 5672,
            username: "admin",
            password: "admin123"
        })
        channel = await connection.createChannel();
        await channel.assertExchange(EXCHANGE_NAME, 'topic', { durable: false });
        logger.info("Connected to rabbit mq");
        return channel;
    } catch (e) {
        logger.error("Error connecting to rabbit mq", e)
    }
}



async function consumeEvent(routingKey,callback) {
    if(!channel){
        await connectRabbitMQ();
    }
    const queue=await channel.assertQueue("",{exclusive:true});
    await channel.bindQueue(queue.queue,EXCHANGE_NAME,routingKey);
    channel.consume(queue.queue,(msg)=>{
        if(msg!==null){
            const content=JSON.parse(msg.content.toString());
            callback(content);
            channel.ack(msg);
        }
        logger.info(`Subscribed to event: ${routingKey}`);
    });
}

module.exports = { connectRabbitMQ ,consumeEvent}