import dotenv from 'dotenv'
import ms from 'ms'
dotenv.config()


export const config = {
    PORT: process.env.PORT || 5001,
    NODE_ENV: process.env.ENV,
    WHITELISTED_URL: process.env.WHITELIST_URL,
    MONGO_URI: process.env.MONGO_URI,
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    SALT_HASH: process.env.SALT_HASH || 10,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET!,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN  as ms.StringValue|| '1h' ,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN as ms.StringValue || '7d' , 

}