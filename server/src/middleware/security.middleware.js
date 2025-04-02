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

const allowedOrigins = [
  "http://localhost:5173",
  "https://recipe-client-2ohxtsa3i-sourabhbadgaiya2s-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // ✅ Cookies allow karne ke liye zaroori hai
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
