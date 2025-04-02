import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import config from "../config/env.config.js";

export const securityMiddleware = (app) => {
  app.use(helmet());
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes (Time window in milliseconds)
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again later.",
  });

  app.use(limiter);
};
