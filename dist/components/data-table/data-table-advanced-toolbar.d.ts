import type { Table } from "@tanstack/react-table";
import type * as React from "react";
interface DataTableAdvancedToolbarProps<TData> extends React.ComponentProps<"div"> {
    table: Table<TData>;
}
export declare function DataTableAdvancedToolbar<TData>({ table, children, className, ...props }: DataTableAdvancedToolbarProps<TData>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=data-table-advanced-toolbar.d.ts.map