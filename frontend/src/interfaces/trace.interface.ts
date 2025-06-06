export interface ITraceDetails {
    id: string;
    timestamp: Date;
    scores: string[];
    observations: string[];
    totalCost: number;
    latency: number;
    htmlPath: string;
    projectId: string;
    name?: string;
    bookmarked: boolean;
    release?: string;
    version?: string;
    userId?: string;
    sessionId?: string;
    public?: boolean;
    input?: IInputData;
    output?: string;
    metadata?: any;
    tags?: string[];
    externalId: string;
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
