import type { Table } from "@tanstack/react-table";
import * as React from "react";
import { PopoverContent } from "../../components/ui/popover";
interface DataTableSortListProps<TData> extends React.ComponentProps<typeof PopoverContent> {
    table: Table<TData>;
}
export declare function DataTableSortList<TData>({ table, ...props }: DataTableSortListProps<TData>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=data-table-sort-list.d.ts.map