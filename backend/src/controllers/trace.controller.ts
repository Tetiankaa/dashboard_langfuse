import { NextFunction, Request, Response } from "express";

import { IQuery } from "../interfaces/query.interface";
import traceService from "../services/trace.service";
import { TraceMapper } from "../mappers/trace.mapper";
import { statusCodes } from "../constants/statusCodes";

class TraceController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const query = req.query as IQuery;
            const traces = await traceService.getAll(query);

            const mappedData = TraceMapper.toPaginationResponse(traces);
            res.status(statusCodes.OK).json(mappedData);
        } catch (error) {
            next(error);
        }
    }
}

export default new TraceController();
