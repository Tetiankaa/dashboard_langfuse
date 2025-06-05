import mongoose, { Schema } from "mongoose";

import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
}, {
    versionKey: false,
    timestamps: true
})

export const User = mongoose.model<IUser>("users", userSchema);
