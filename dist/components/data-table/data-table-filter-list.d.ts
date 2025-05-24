import type { Table } from "@tanstack/react-table";
import * as React from "react";
import { PopoverContent } from "../../components/ui/popover";
interface DataTableFilterListProps<TData> extends React.ComponentProps<typeof PopoverContent> {
    table: Table<TData>;
    debounceMs?: number;
    throttleMs?: number;
    shallow?: boolean;
}
export declare function DataTableFilterList<TData>({ table, debounceMs, throttleMs, shallow, ...props }: DataTableFilterListProps<TData>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=data-table-filter-list.d.ts.map