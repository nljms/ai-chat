import { RedisClientType } from "redis";
import { CacheMachine, Event } from "./types.js";

class RedisClient implements CacheMachine {
  constructor(private readonly client: RedisClientType) {}

  public async connect() {
    console.log("[redis client]: Connecting to redis...");

    await this.client.connect();

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

  public async set(key: string, value: string) {
    console.log(`[redis client]: Setting key: ${key} with value: ${value}`);
    await this.client.set(key, value, { EX: 60 });
  }

  public async get(key: string) {
    console.log(`[redis client]: Getting key: ${key}`);
    return this.client.get(key);
  }

  public on<T>(event: Event, callback: (message: T) => void) {
    this.client.on(event, callback);
  }

  public emit<T>(event: Event, message: T) {
    this.client.emit(event, message);
  }

  public async getOrSet(key: string, value: string) {
    const cache = await this.get(key);

    if (!cache) {
      await this.set(key, value);
      return value;
    }

    return cache;
  }
}

export default RedisClient;
