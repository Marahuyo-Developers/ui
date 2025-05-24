import { z } from 'zod';
import type { ExtendedColumnFilter, ExtendedColumnSort } from '../types/data-table';
export declare const getSortingStateParser: <TData>(columnIds?: string[] | Set<string>) => import("nuqs").ParserBuilder<ExtendedColumnSort<TData>[]>;
declare const filterItemSchema: z.ZodObject<{
    id: z.ZodString;
    value: z.ZodUnion<[z.ZodString, z.ZodArray<z.ZodString, "many">]>;
    variant: z.ZodEnum<["text", "number", "range", "date", "dateRange", "boolean", "select", "multiSelect"]>;
    operator: z.ZodEnum<["iLike", "notILike", "eq", "ne", "inArray", "notInArray", "isEmpty", "isNotEmpty", "lt", "lte", "gt", "gte", "isBetween", "isRelativeToToday"]>;
    filterId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    value: string | string[];
    id: string;
    operator: "iLike" | "notILike" | "eq" | "ne" | "isEmpty" | "isNotEmpty" | "lt" | "lte" | "gt" | "gte" | "isBetween" | "isRelativeToToday" | "inArray" | "notInArray";
    variant: "number" | "boolean" | "date" | "range" | "text" | "select" | "dateRange" | "multiSelect";
    filterId: string;
}, {
    value: string | string[];
    id: string;
    operator: "iLike" | "notILike" | "eq" | "ne" | "isEmpty" | "isNotEmpty" | "lt" | "lte" | "gt" | "gte" | "isBetween" | "isRelativeToToday" | "inArray" | "notInArray";
    variant: "number" | "boolean" | "date" | "range" | "text" | "select" | "dateRange" | "multiSelect";
    filterId: string;
}>;
export type FilterItemSchema = z.infer<typeof filterItemSchema>;
export declare const getFiltersStateParser: <TData>(columnIds?: string[] | Set<string>) => import("nuqs").ParserBuilder<ExtendedColumnFilter<TData>[]>;
export {};
//# sourceMappingURL=parsers.d.ts.map