import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { DATE_TIME_FORMAT } from "constants/date";
import type { Dayjs } from "dayjs";

dayjs.extend(utc);

export type QueryValue = Dayjs | string | null | undefined;

/**
 * Formats Day.js object as ISOString (with milliseconds removed).
 * If values is falsy, the function will return undefined.
 * utcOffset default to +7 (WIB)
 */
export const formatDateQuery = (value: QueryValue, utcOffset = 7) => {
    if (!value) {
        return undefined;
    }
    if (typeof value === "string") {
        return value;
    }
    return `${value.utcOffset(utcOffset).toISOString().slice(0, 19)}Z`;
};

export const renderDate: (
    date?: string | Date | null,
    format?: string,
    utcOffset?: number
) => string = (date, format = DATE_TIME_FORMAT, utcOffset = 7) =>
    date ? dayjs(date).utcOffset(utcOffset).format(format) : "-";
