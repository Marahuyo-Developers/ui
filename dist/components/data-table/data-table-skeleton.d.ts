interface DataTableSkeletonProps extends React.ComponentProps<"div"> {
    columnCount: number;
    rowCount?: number;
    filterCount?: number;
    cellWidths?: string[];
    withViewOptions?: boolean;
    withPagination?: boolean;
    shrinkZero?: boolean;
}
export declare function DataTableSkeleton({ columnCount, rowCount, filterCount, cellWidths, withViewOptions, withPagination, shrinkZero, className, ...props }: DataTableSkeletonProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=data-table-skeleton.d.ts.map