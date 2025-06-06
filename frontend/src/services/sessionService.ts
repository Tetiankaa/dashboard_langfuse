import type {ApiResponse} from "../types/api-res.type.ts";
import type {IPaginatedResponse} from "../interfaces/paginated-response.interface.ts";
import {apiService} from "./apiService.ts";
import {urls} from "../constants/urls.ts";
import type {ISession} from "../interfaces/session.interface.ts";
import type {IQuery} from "../interfaces/query.interface.ts";

export const sessionService = {
    getAll:(query?: IQuery): ApiResponse<IPaginatedResponse<ISession>> => apiService.get(urls.data.sessions, { params: query })
}
