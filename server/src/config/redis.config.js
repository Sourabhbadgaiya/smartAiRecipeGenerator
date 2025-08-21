import Redis from "ioredis";

const redisClient = new Redis({
  port: 13462,
  host: "redis-13462.c212.ap-south-1-1.ec2.redns.redis-cloud.com",
  password: "wq4UevVau6wk8AdH4j5rZgKZm50RScgO",
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
