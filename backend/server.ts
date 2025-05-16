import express, { Express } from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import { TserverConfig } from "./types/configTypes";
import errorMiddleware from "./middlewares/error.middleware";
import { prisma } from "./prisma";
import router from "./routes";


export class InitServer {
    private readonly app: Express;

    constructor(){
        this.app = express();
    }

    // configuring the server
    public configureServer(config:TserverConfig):void {
        // setting up the server with host and port for later usage
        this.app.set("host",config.host);
        this.app.set("port",config.port);

        // other configurations
        this.setupMiddleware();
        this.setupRoutes();

        // global error handling
        this.app.use(errorMiddleware)
    }

    // setting up the middleware necessary for the protected and working server
    private setupMiddleware():void {
        // enabling cors
        this.app.use(cors());
        this.app.use(morgan("common"));
        this.app.use(helmet()); // adding layer of security
        this.app.use(express.json()); // handling json
        this.app.use(express.urlencoded({ extended:false })); // encoding for forms submission
    }

    // setting up the routes
    private setupRoutes():void {
        this.app.use("/api/v1",router)
    }

    // starting the server
    public async startServer():Promise<void> {
        const host = this.app.get("host");
        const port = this.app.get("port");

        try {
            // connecting to the database
            await prisma.$connect();
            console.log("✅ Database connected.");

            const server = this.app.listen(port, () => {
                console.log(`🚀 [server]:server is running at ${host}:${port}`);
            });

            // server stop handler
            this.setupGracefulShutdown(server);
            
        } catch (error) {
            console.error("❌ Failed to connect to the database:", error);
            process.exit(1);
            
        }
    }

    // stopping the server gracefully
    private setupGracefulShutdown(server: ReturnType<Express["listen"]>): void {
    const shutdown = async (signal: string) => {
      console.log(`\n🛑 Received ${signal}. Closing server...`);
      server.close(async () => {
        await prisma.$disconnect();
        console.log("✅ Cleanup complete. Exiting.");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT")); //when typed ctrl+c
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  }
}