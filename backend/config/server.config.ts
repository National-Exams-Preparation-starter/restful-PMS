import dotenv from 'dotenv';
import env from 'env-var';
import { TserverConfig } from '../types/configTypes';

dotenv.config()

// getting the environment variables related to server
export const serverConfigs:TserverConfig = {
    host:env.get("HOST").asString() || "http://localhost",
    port:env.get("PORT").asPortNumber() || 8000,
}