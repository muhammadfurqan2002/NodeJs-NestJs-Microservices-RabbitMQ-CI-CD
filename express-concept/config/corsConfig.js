const cors = require("cors");

const configureCor = () => {
  return cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        "http://localhost:3000",
        "https://yourscustomdomain.com",
      ];
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by cors"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"],
    exposedHeaders: ["X-Total-Count", "Current-Range"],
    credentials: true, //enable support for cookies,
    preflightContinue: false,
    maxAge:600, //cache pre flight response for 10 minutes,
    optionsSuccessStatus:204
  });
};


module.exports={
    configureCor
}