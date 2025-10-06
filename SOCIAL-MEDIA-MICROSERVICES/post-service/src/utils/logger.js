const winston = require("winston");

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(  //how we formatting the messages/logs
    winston.format.timestamp(), //timestamp of the log
    winston.format.errors({ stack: true }), //log the error stack trace if available
    winston.format.splat(), //string interpolation
    winston.format.json() //log in json format (structured logging)
  ),
  defaultMeta: { service: "post-service" },
  transports: [ //where to log the messages means output destination
    new winston.transports.Console({ //log to console
      format: winston.format.combine( //override the format for console transport
        winston.format.colorize(), //colorize the output
        winston.format.simple() //simple format for console
      ),
    }),
    new winston.transports.File({ filename: "error.log", level: "error" }), //log only error level messages to error.log file
    new winston.transports.File({ filename: "combined.log" }), //log all messages to combined.log file
  ],
});

module.exports = logger;
