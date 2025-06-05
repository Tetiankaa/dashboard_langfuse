import mongoose, { Schema } from "mongoose";

import { ISession } from "../interfaces/session.interface";

const sessionSchema = new Schema<ISession>({
    id: { type: String, required: true, unique: true },
    projectId: { type: String, default: '' },
    environment: { type: String,  default: null },
}, {
    timestamps: true,
    versionKey: false
})

export const Session = mongoose.model<ISession>('sessions', sessionSchema);
