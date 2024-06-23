import mongoose from "mongoose";
import { Storage } from "./types.js";

class MongooseClient implements Storage {
  private client = mongoose;

  // TODO: move this to a config file
  private dbUrl =
    "mongodb://root:hello@localhost:27017/chat-app?authSource=admin";

  public async connect() {
    console.log("[mongoose client]: Connecting to mongoose...");
    await this.client.connect(this.dbUrl, {
      rejectUnauthorized: false,
    });
    console.log("[mongoose client]: Client connected...");
  }

  public async disconnect() {
    console.log("[mongoose client]: Disconnecting from mongoose...");
    await this.client.disconnect();
    console.log("[mongoose client]: Client disconnected...");
  }
}

export default MongooseClient;
