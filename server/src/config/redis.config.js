import Redis from "ioredis";

const redisClient = new Redis({
  port: 11953,
  host: "redis-11953.c305.ap-south-1-1.ec2.redns.redis-cloud.com",
  password: "28Bm1U7PqtTm9Lbme4ZGcJ3LMkuAg8E5",
  retryStrategy: (times) => Math.min(times * 50, 2000), // Retry with max 2s delay
});

redisClient.on("connect", () => console.log(" Redis connected"));
redisClient.on("error", (err) => console.error(" Redis error:", err));
redisClient.on("end", () => console.warn("Redis disconnected"));

process.on("SIGINT", async () => {
  await redisClient.quit();
  console.log("Redis connection closed");
  process.exit(0);
});

export default redisClient;
