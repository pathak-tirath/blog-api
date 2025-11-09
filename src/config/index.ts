import dotenv from 'dotenv'
dotenv.config()


export const config = {
    PORT: process.env.PORT || 5001,
    NODE_ENV: process.env.ENV,
    WHITELISTED_PORTS: process.env.WHITELIST_URL,
    MONGO_URI: process.env.MONGO_URI
}