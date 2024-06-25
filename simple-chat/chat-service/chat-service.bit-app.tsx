import { NodeServer } from "@bitdev/node.node-server";
import dotenv from "dotenv";

dotenv.config();

export default NodeServer.from({
  name: "chat-service",
  mainPath: import.meta.resolve("./chat-service.app-root.js"),
});
