import {NextFunction, Request, Response} from "express";
import {ObjectSchema} from "joi";
import {ApiError} from "../errors/api-error";
import {statusCodes} from "../constants/statusCodes";

class CommonMiddleware {
    public isBodyValid(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const { error } = await validator.validateAsync(req.body);

                if (error) {
                    throw new ApiError(statusCodes.BAD_REQUEST, error.details[0].message);
                }

                next();
            } catch (error) {
                next(error);
            }
        }
    }
}

export default new CommonMiddleware();
