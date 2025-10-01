//custom error class

class APIError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = "APIError"; //set error type
  }
}

//it catch error if happen in any function

const asyncHandler = (fn )=> (req,res,next) => {
    Promise.resolve(fn(req,res,next)).catch(next);
};


const globalErrorHandler=(err,req,res,next)=>{
    console.error(err.stack);  //log the error stack

    if(err instanceof APIError){
        return res.status(err.statusCode).json({
            message:err.message,
            status:"Error"
        })
    }

    //handle mongoose validation
    else if(err.name==="validationError"){
        return res.status(400).json({
            message:"Validation Error",
            status:"Error"
        })
    }else{
        return res.status(500).json({
            message:"An Unexpected Error",
            status:"Error"
        })
    }
}


module.exports={
    APIError,globalErrorHandler,asyncHandler
}