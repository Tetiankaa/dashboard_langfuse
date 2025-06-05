import mongoose, { Schema } from "mongoose";

import { ITraceDetails } from "../interfaces/trace.interface";


const traceSchema = new Schema<ITraceDetails>({
    id: { type: String, required: true, unique: true },
    projectId: { type: String },
    name: { type: String, default: null },
    timestamp: { type: Date, required: true },
    tags: { type: [String], default: [] },
    bookmarked: { type: Boolean, default: false },
    release: { type: String, default: null },
    version: { type: String, default: null },
    userId: { type: String, default: null },
    sessionId: { type: String, default: null },
    public: { type: Boolean, default: false },
    input: { type:
            {
                question: { type: String },
                chat_history: { type: [{ message: { type: String}, type: { type: String }}], default: []}
            },
        default: null },
    output: { type: String, default: null },
    metadata: { type: Schema.Types.Mixed, default: null },
    externalId: { type: String, default: null },
    observations: { type: [String], default: []},
    scores: { type: [String], default: [] },
    latency: { type: Number },
    totalCost: { type: Number },
    htmlPath: { type: String }
}, {
    timestamps: true,
    versionKey: false
})

export const Trace = mongoose.model<ITraceDetails>('traces', traceSchema);
