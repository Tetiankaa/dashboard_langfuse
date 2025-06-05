import dotenv from 'dotenv'

import { Config } from "../types/config.type";

dotenv.config();

export const config: Config = {
    SERVER_PORT: Number(process.env.SERVER_PORT) || 5000,
    DEFAULT_LOGIN: process.env.DEFAULT_LOGIN,
    DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD,
    MONGODB_URL: process.env.MONGODB_URL,
    LANGFUSE_SECRET_KEY: process.env.LANGFUSE_SECRET_KEY,
    LANGFUSE_PUBLIC_KEY: process.env.LANGFUSE_PUBLIC_KEY,
    LANGFUSE_HOST: process.env.LANGFUSE_HOST,
}
