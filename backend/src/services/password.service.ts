import * as bcrypt from "bcrypt";

class PasswordService {
    public async hash(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    public async compare(dataToCompare: string, encryptedData: string): Promise<boolean> {
        return bcrypt.compare(dataToCompare, encryptedData);
    }
}

export default new PasswordService();
