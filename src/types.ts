import { Dayjs } from "dayjs";

/** For endpoints with a JSON response. */
export type Endpoint = [
    "get" | "post" | "put" | "patch" | "delete",
    string,
    { secondaryHost: true }?
];
/** For endpoints with blob/file response. */
export type BlobEndpoint = ["get" | "post", string, { blob: true }];

export interface TableHeader {
    key: string;
    label: string;
    align?: "left" | "center";
    minWidth?: number;
    width?: number;
}
export interface QueryObj {
    page?: number;
    limit?: number;
    sort?: string[];
    [key: string]:
        | string
        | number
        | string[]
        | boolean
        | Dayjs
        | null
        | undefined;
}
