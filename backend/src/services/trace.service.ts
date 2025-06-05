import { IQuery } from "../interfaces/query.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { ITraceDetails } from "../interfaces/trace.interface";
import { axiosInstance } from "../utils/axiosInstance";
import { urls } from "../constants/urls";
import traceRepository from "../repositories/trace.repository";

class TraceService {
    public async getAll(query?: IQuery): Promise<IPaginatedResponse<ITraceDetails>> {
          const { data } = await axiosInstance.get(urls.traces.base, { params: query });

          await traceRepository.saveIfNotPresent(data.data);

          return await traceRepository.getAll(query);

    }

}

export default new TraceService();
