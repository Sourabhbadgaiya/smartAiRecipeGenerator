import "dotenv/config";

const _config = {
  PORT: process.env.PORT,
  MONGO_URL: process.env.MONGO_URL,
  JWT_SEC: process.env.JWT_SEC,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  CLIENT_URL: process.env.CLIENT_URL,zzz
  NODE_ENV: process.env.NODE_ENV,
};

const config = Object.freeze(_config);

export default config;
