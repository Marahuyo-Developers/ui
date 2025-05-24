import type { Table } from "@tanstack/react-table";
interface DataTablePaginationProps<TData> extends React.ComponentProps<"div"> {
    table: Table<TData>;
    pageSizeOptions?: number[];
}
export declare function DataTablePagination<TData>({ table, pageSizeOptions, className, ...props }: DataTablePaginationProps<TData>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=data-table-pagination.d.ts.map