import { FilterQuery } from "mongoose";

import { ITraceDetails } from "../interfaces/trace.interface";
import { Trace } from "../models/trace.model";
import { IQuery } from "../interfaces/query.interface";
import { IPaginatedResponse } from "../interfaces/paginated-response.interface";

class TraceRepository {
    public async saveIfNotPresent(traces: ITraceDetails[]):Promise<void> {

        await Promise.all(
            traces.map(async (trace) => {

                const found = await Trace.findOne({ id: trace.id });

                if (!found) {
                    await Trace.create({ ...trace });
                }

            })
        );
    }

    public async getAll(query: IQuery): Promise<IPaginatedResponse<ITraceDetails>> {
        const page = Number(query.page) || 1;
        const limit = Number(query.limit) || 50;

        const skip = (page - 1) * limit;

        const { fromTimestamp, toTimestamp } = query;

        const now = new Date();

        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59 );

        const filter: FilterQuery<ITraceDetails> = {
            createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        }

        if (fromTimestamp && toTimestamp) {
            filter.createdAt = { $gte: fromTimestamp, $lte: toTimestamp }
        }

        const totalItems = await Trace.countDocuments(filter);

        const data = await Trace.find(filter).skip(skip).limit(limit);

        return {
            data,
            page,
            limit,
            totalItems,
            totalPages: Math.ceil(totalItems / limit)
        }
    }
}

export default new TraceRepository();
