import { NodeServer } from "@bitdev/node.node-server";

export default NodeServer.from({
  name: "chat-service",
  mainPath: import.meta.resolve("./chat-service.app-root.js"),
});
