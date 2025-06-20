import { FilterQuery } from "mongoose";

import { ISession } from "../interfaces/session.interface";
import { Session } from "../models/session.model";
import { IQuery } from "../interfaces/query.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";

class SessionRepository {
    public async saveIfNotPresent(sessions: ISession[]):Promise<void> {

        await Promise.all(
            sessions.map(async (session) => {

                const found = await Session.findOne({ id: session.id });

                if (!found) {
                    await Session.create({ ...session });
                }

            })
        );
    }

    public async getAll(query: IQuery): Promise<IPaginatedResponse<ISession>> {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 50;

        const skip = (page - 1) * limit;

        const { fromTimestamp, toTimestamp } = query;

        const now = new Date();

        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59 );

        const filter: FilterQuery<ISession> = {
            createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        }

        if (fromTimestamp && toTimestamp) {
            filter.createdAt = { $gte: fromTimestamp, $lte: toTimestamp }
        }

        const totalItems = await Session.countDocuments(filter);

        const data = await Session.find(filter).skip(skip).limit(limit);

        return {
            data,
            page,
            limit,
            totalItems,
            totalPages: Math.ceil(totalItems / limit)
        }
    }
}

export default new SessionRepository();
