import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    public async createUser(email: string, password: string): Promise<IUser> {
       return await User.create({email, password})
    }

    public async findUserByEmail(email: string): Promise<IUser> {
        return User.findOne({ email });
    }
}

export default new UserRepository();
