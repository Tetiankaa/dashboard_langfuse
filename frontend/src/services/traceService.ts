import type {ApiResponse} from "../types/api-res.type.ts";
import type {IPaginatedResponse} from "../interfaces/paginated-response.interface.ts";
import type {ITraceDetails} from "../interfaces/trace.interface.ts";
import {apiService} from "./apiService.ts";
import {urls} from "../constants/urls.ts";
import type {IQuery} from "../interfaces/query.interface.ts";

export const traceService = {
    getAll:(query?: IQuery): ApiResponse<IPaginatedResponse<ITraceDetails>> => apiService.get(urls.data.traces, { params: query })
}
