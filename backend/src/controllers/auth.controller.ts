import { NextFunction, Request, Response } from "express";
import { IUser } from "../interfaces/user.interface";
import authService from "../services/auth.service";
import { statusCodes } from "../constants/statusCodes";

class AuthController {
    public async login(req: Request, res: Response, next: NextFunction) {
        try {
            const body = req.body as IUser;

            await authService.login(body);
            res.sendStatus(statusCodes.NO_CONTENT);
        } catch (error) {
            next(error);
        }
    }
}

export default new AuthController();
