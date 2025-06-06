import type {EYearDropdown} from "../enums/yearDropdown.enum.ts";
import type {EMonths} from "../enums/months.enum.ts";
import type {IQuery} from "../interfaces/query.interface.ts";

export const getDate = (year: EYearDropdown, month: EMonths): IQuery => {

    const fromTimestamp = new Date(Number(year), Number(month), 1 ).toISOString();
    const toTimestamp = new Date(Number(year), Number(month) + 1, 0, 23, 59, 59).toISOString();

    return {
        fromTimestamp,
        toTimestamp
    }

}
