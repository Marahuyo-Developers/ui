import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Skeleton } from '../../components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '../../components/ui/table';
import { cn } from '../../lib/utils';
export function DataTableSkeleton({ columnCount, rowCount = 10, filterCount = 0, cellWidths = ['auto'], withViewOptions = true, withPagination = true, shrinkZero = false, className, ...props }) {
    const cozyCellWidths = Array.from({ length: columnCount }, (_, index) => cellWidths[index % cellWidths.length] ?? 'auto');
    return (_jsxs("div", { className: cn('flex w-full flex-col gap-2.5 overflow-auto', className), ...props, children: [_jsxs("div", { className: "flex w-full items-center justify-between gap-2 overflow-auto p-1", children: [_jsx("div", { className: "flex flex-1 items-center gap-2", children: filterCount > 0
                            ? Array.from({ length: filterCount }).map((_, i) => (_jsx(Skeleton, { className: "h-7 w-[4.5rem] border-dashed" }, i)))
                            : null }), withViewOptions ? (_jsx(Skeleton, { className: "ml-auto hidden h-7 w-[4.5rem] lg:flex" })) : null] }), _jsx("div", { className: "rounded-md border", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: Array.from({ length: 1 }).map((_, i) => (_jsx(TableRow, { className: "hover:bg-transparent", children: Array.from({ length: columnCount }).map((_, j) => (_jsx(TableHead, { style: {
                                        width: cozyCellWidths[j],
                                        minWidth: shrinkZero ? cozyCellWidths[j] : 'auto',
                                    }, children: _jsx(Skeleton, { className: "h-6 w-full" }) }, j))) }, i))) }), _jsx(TableBody, { children: Array.from({ length: rowCount }).map((_, i) => (_jsx(TableRow, { className: "hover:bg-transparent", children: Array.from({ length: columnCount }).map((_, j) => (_jsx(TableCell, { style: {
                                        width: cozyCellWidths[j],
                                        minWidth: shrinkZero ? cozyCellWidths[j] : 'auto',
                                    }, children: _jsx(Skeleton, { className: "h-6 w-full" }) }, j))) }, i))) })] }) }), withPagination ? (_jsxs("div", { className: "flex w-full items-center justify-between gap-4 overflow-auto p-1 sm:gap-8", children: [_jsx(Skeleton, { className: "h-7 w-40 shrink-0" }), _jsxs("div", { className: "flex items-center gap-4 sm:gap-6 lg:gap-8", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Skeleton, { className: "h-7 w-24" }), _jsx(Skeleton, { className: "h-7 w-[4.5rem]" })] }), _jsx("div", { className: "flex items-center justify-center font-medium text-sm", children: _jsx(Skeleton, { className: "h-7 w-20" }) }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Skeleton, { className: "hidden size-7 lg:block" }), _jsx(Skeleton, { className: "size-7" }), _jsx(Skeleton, { className: "size-7" }), _jsx(Skeleton, { className: "hidden size-7 lg:block" })] })] })] })) : null] }));
}
//# sourceMappingURL=data-table-skeleton.js.map