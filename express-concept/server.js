const dotenv=require("dotenv");
dotenv.config();
const express=require("express");
const { configureCor } = require("./config/corsConfig");
const { requestLogger, addTimeStamp } = require("./middleware/customMiddleware");
const { globalErrorHandler } = require("./middleware/errorHandler");
const { urlVersioning} = require("./middleware/apiVersioning");
const { createBasicRateLimiter } = require("./middleware/rateLimiting");
const itemRoutes=require('./routes/item-routes');
const PORT=process.env.PORT||3000;
const app=express();

console.log("configureCor():", configureCor());

app.use(requestLogger);
app.use(addTimeStamp);

console.log("RateLimiter:", createBasicRateLimiter(100, 15*60*1000));

app.use(configureCor())
app.use(createBasicRateLimiter(2,15*60*1000))  // 100 request per 15 minutes
app.use(express.json());



app.use(urlVersioning('v1'));
app.use('/api/v1',itemRoutes);

app.use(globalErrorHandler);

app.listen(PORT,()=>{
    console.log(`Server is running on server ${PORT}`)
})