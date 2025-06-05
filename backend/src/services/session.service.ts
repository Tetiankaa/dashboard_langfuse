import { IQuery } from "../interfaces/query.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { ISession } from "../interfaces/session.interface";
import { axiosInstance } from "../utils/axiosInstance";
import { urls } from "../constants/urls";
import sessionRepository from "../repositories/session.repository";

class SessionService {
    public async getAll(query?: IQuery): Promise<IPaginatedResponse<ISession>> {
        const { data } = await axiosInstance.get(urls.sessions.base, { params: query });

        await sessionRepository.saveIfNotPresent(data.data);

        return await sessionRepository.getAll(query);

    }
}

export default new SessionService();
