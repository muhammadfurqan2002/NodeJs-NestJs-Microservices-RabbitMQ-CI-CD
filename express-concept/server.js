const dotenv=require("dotenv");
dotenv.config();
const express=require("express");
const cors=require("cors");
const { configureCor } = require("./config/corsConfig");
const { requestLogger, addTimeStamp } = require("./middleware/customMiddleware");
const { globalErrorHandler } = require("./middleware/errorHandler");
const PORT=process.env.PORT||3000;
const app=express();


app.use(requestLogger);
app.use(addTimeStamp);

app.use(configureCor())
app.use(express.json());
app.use(globalErrorHandler);

app.listen(PORT,()=>{
    console.log(`Server is running on server ${PORT}`)
})