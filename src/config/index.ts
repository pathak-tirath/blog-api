import dotenv from 'dotenv'
dotenv.config()


export const config = {
    PORT: process.env.PORT || 5001,
    NODE_ENV: process.env.ENV,
    WHITELISTED_URL: process.env.WHITELIST_URL,
    MONGO_URI: process.env.MONGO_URI,
    LOG_LEVEL: process.env.LOG_LEVEL || 'info',
    SALT_HASH: process.env.SALT_HASH || 10
}