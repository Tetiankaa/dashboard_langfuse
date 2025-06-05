import { IPaginatedResponse } from "../interfaces/paginated-response.interface";
import { ISession, ISessionDTO } from "../interfaces/session.interface";

export class SessionMapper {
    public static toDTO(sessionDetails: ISession): ISessionDTO {
        return {
            id: sessionDetails.id,
            projectId: sessionDetails.projectId ?? '',
            createdAt: sessionDetails.createdAt ?? '',
            environment: sessionDetails.environment ?? '',
        }
    }

    public static toPaginationResponse(dataToMap: IPaginatedResponse<ISession>): IPaginatedResponse<ISessionDTO> {
        return {
            data: dataToMap.data.map((item) => this.toDTO(item)),
            page: dataToMap.page,
            limit: dataToMap.limit,
            totalItems: dataToMap.totalItems,
            totalPages: dataToMap.totalPages
        }
    }
}
