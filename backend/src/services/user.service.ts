import userRepository from "../repositories/user.repository";
import passwordService from "./password.service";
import { config } from "../configs/config";

class UserService {
    public async createIfNotExists(email: string): Promise<void> {
        const user = await userRepository.findUserByEmail(email);

        if (!user) {
            const hashedPassword = await passwordService.hash(config.DEFAULT_PASSWORD);
            await userRepository.createUser(email, hashedPassword);
            console.log('Default user was created!')
            return;
        }

            console.log('Default user is already stored in DB!')
            return;
    }
}

export default new UserService();
