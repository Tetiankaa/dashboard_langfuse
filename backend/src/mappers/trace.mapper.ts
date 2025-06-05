import { ITraceDetails, ITraceDetailsDTO } from "../interfaces/trace.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";

export class TraceMapper {
    public static toDTO(traceDetails: ITraceDetails): ITraceDetailsDTO {
        return {
             id: traceDetails.id,
             timestamp: new Date(traceDetails.timestamp),
             scores: traceDetails.scores ?? [],
             observations: traceDetails.observations ?? [],
             totalCost: traceDetails.totalCost,
            latency: traceDetails.latency,
            htmlPath: traceDetails.htmlPath,
            projectId: traceDetails.projectId ?? '',
            name: traceDetails.name ?? '',
            bookmarked: traceDetails.bookmarked ?? false,
            release: traceDetails.release ?? '',
            version: traceDetails.version ?? '',
            userId: traceDetails.userId ?? '',
            sessionId: traceDetails.sessionId ?? '',
            public: traceDetails.public ?? false,
            input: {
                 question: traceDetails.input.question ?? '',
                 chat_history: traceDetails.input.chat_history ?? [],
            },
            output: traceDetails.output ?? '',
            metadata: traceDetails.metadata ?? {},
            tags: traceDetails.tags ?? [],
            externalId: traceDetails.externalId ?? '',
            createdAt: traceDetails.createdAt ?? '',
            updatedAt: traceDetails.updatedAt ?? '',
        }
    }

    public static toPaginationResponse(dataToMap: IPaginatedResponse<ITraceDetails>): IPaginatedResponse<ITraceDetailsDTO> {
        return {
            data: dataToMap.data.map((item) => this.toDTO(item)),
            page: dataToMap.page,
            limit: dataToMap.limit,
            totalItems: dataToMap.totalItems,
            totalPages: dataToMap.totalPages
        }
    }
}
