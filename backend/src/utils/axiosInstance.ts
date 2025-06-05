import axios from "axios";

import { config } from "../configs/config";

const axiosInstance = axios.create({ baseURL: config.LANGFUSE_HOST });

axiosInstance.interceptors.request.use(req => {
    const public_key = config.LANGFUSE_PUBLIC_KEY;
    const secret_key = config.LANGFUSE_SECRET_KEY;

    if (public_key && secret_key) {
        const token = Buffer.from(`${public_key}:${secret_key}`).toString("base64");

        req.headers.authorization = `Basic ${token}`;
    }

    return req;
})

export { axiosInstance }
