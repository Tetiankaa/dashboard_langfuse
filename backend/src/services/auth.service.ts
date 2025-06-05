import {IUser} from "../interfaces/user.interface";
import userRepository from "../repositories/user.repository";
import {ApiError} from "../errors/api-error";
import {statusCodes} from "../constants/statusCodes";
import {errorMessages} from "../constants/errorMessages";
import passwordService from "./password.service";

class AuthService {
    public async login(body: IUser): Promise<void> {
        const user = await userRepository.findUserByEmail(body.email);

        if (!user) {
            throw new ApiError(statusCodes.UNAUTHORIZED, errorMessages.WRONG_EMAIL_OR_PASSWORD);
        }

        const isPasswordCorrect = await passwordService.compare(body.password, user.password);

        if (!isPasswordCorrect) {
            throw new ApiError(statusCodes.UNAUTHORIZED, errorMessages.WRONG_EMAIL_OR_PASSWORD);
        }

        // may be implemented JWT authentication
    }
}

export default new AuthService();
