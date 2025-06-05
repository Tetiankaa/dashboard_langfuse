import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { config } from "./configs/config";
import { authRoutes } from "./routes/auth.route";
import { ApiError } from "./errors/api-error";
import { traceRoutes } from "./routes/trace.route";
import { sessionRoutes } from "./routes/session.route";
import userService from "./services/user.service";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/traces', traceRoutes);
app.use('/api/sessions', sessionRoutes);

app.use("/{*any}", (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500).json(err.message);
});

app.listen(config.SERVER_PORT, '0.0.0.0', async () => {
    await mongoose.connect(config.MONGODB_URL);
    console.log('MongoDB Connected!');

    await userService.createIfNotExists(config.DEFAULT_LOGIN);

    console.log(`Server is running at port ${config.SERVER_PORT}`);
});
