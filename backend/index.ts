import { InitServer } from "@/server";
import { serverConfigs } from "@/config/server.config";

const app = new InitServer();

// configuring the server
app.configureServer(serverConfigs);

// starting the server
app.startServer()
