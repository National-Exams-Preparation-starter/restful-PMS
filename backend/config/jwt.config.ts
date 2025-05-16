import dotenv from 'dotenv';
import env from 'env-var';
import { TJwtConfig } from '../types/configTypes';

dotenv.config()

// getting the environment variables related to jwt
export const jwtConfigs:TJwtConfig = {
    algorithm:"RS256",
    access_token_secret_key:env.get("ACCESS_TOKEN_SECRET_KEY").required().asString(),
    refresh_token_secret_key:env.get("REFRESH_TOKEN_SECRET_KEY").required().asString(),
    access_token_expiration_time:env.get("ACCESS_TOKEN_EXPIRATION_TIME").required().asString(),
    refresh_token_expiration_time:env.get("REFRESH_TOKEN_EXPIRATION_TIME").required().asString(),
}