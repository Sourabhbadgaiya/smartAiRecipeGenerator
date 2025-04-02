import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import config from "../config/env.config.js";

export const securityMiddleware = (app) => {
  const isProduction = process.env.NODE_ENV === "production";

  app.use(
    helmet({
      contentSecurityPolicy: false, 
      crossOriginResourcePolicy: { policy: "cross-origin" }, 
    })
  );

  app.use(
    cors({
      origin: ["http://localhost:5173"],
      credentials: true,
    })
  );

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, 
    max: 200, 
    standardHeaders: true, 
    legacyHeaders: false, 
  });

  app.use(limiter);
};
