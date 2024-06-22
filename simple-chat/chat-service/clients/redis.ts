import { RedisClientType } from "redis";

class RedisClient {
  constructor(private readonly client: RedisClientType) {}

  public connect() {
    console.log("[redis client]: Connecting to redis...");

    this.client.connect();

    console.log("[redis client]: Client connected...");

    this.client.on("error", (err) =>
      console.log("[redis client]:Redis Client Error", err)
    );
  }

  public async disconnect() {
    console.log("[redis client]: Disconnecting from redis...");
    await this.client.disconnect();
    console.log("[redis client]: Client disconnected...");
  }
}

export default RedisClient;
