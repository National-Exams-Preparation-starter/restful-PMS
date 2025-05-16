import jwt from 'jsonwebtoken';

// server configutation type definition
export type TserverConfig = {
    host:string;
    port:number;
}

// jwt configutation type definition
export type TJwtConfig = {
    access_token_secret_key:string;
    refresh_token_secret_key:string;
    access_token_expiration_time:string;
    refresh_token_expiration_time:string;
}