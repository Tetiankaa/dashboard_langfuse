import { NextFunction, Request, Response } from "express";

import { IQuery } from "../interfaces/query.interface";
import { SessionMapper } from "../mappers/session.mapper";
import { statusCodes } from "../constants/statusCodes";
import sessionService from "../services/session.service";

class SessionController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query as IQuery;
            const sessions = await sessionService.getAll(query);

            const mappedData = SessionMapper.toPaginationResponse(sessions);
            res.status(statusCodes.OK).json(mappedData);

        } catch (error) {
            next(error);
        }
    }
}

export default new SessionController();
