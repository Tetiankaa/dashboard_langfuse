import { IMetaResponse } from "./meta-response.interface";

export interface ITraceDetails {
    id: string;
    timestamp: Date;
    scores: string[];
    observations: string[];
    totalCost: number;
    latency: number;
    htmlPath: string;
    projectId: string | null;
    name?: string | null;
    bookmarked: boolean;
    release?: string | null;
    version?: string | null;
    userId?: string | null;
    sessionId?: string | null;
    public?: boolean | null;
    input?: IInputData | null;
    output?: string | null;
    metadata?: any | null;
    tags?: string[] | null;
    externalId: string | null;
    createdAt: string;
    updatedAt: string;
}

interface IInputData {
    question: string;
    chat_history: IChatHistory[] | [];
}

interface IChatHistory {
    message: string;
    type: string;
}

export interface ITraceApi {
    data: ITraceDetails[],
    meta: IMetaResponse;
}

export interface ITraceDetailsDTO extends Pick<ITraceDetails, 'id' | "timestamp" | "scores" | "observations" | "totalCost" | "latency" | "htmlPath" | "createdAt" | "updatedAt"> {
    projectId: string;
    name: string;
    bookmarked: boolean;
    release: string;
    version: string;
    userId: string;
    sessionId: string;
    public: boolean;
    input: IInputData;
    output: string;
    metadata: any;
    tags: string[];
    externalId: string;
}
