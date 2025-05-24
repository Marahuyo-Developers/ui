import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { flexRender } from '@tanstack/react-table';
import { DataTablePagination } from '../../components/data-table/data-table-pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from '../../components/ui/table';
import { getCommonPinningStyles } from '../../lib/data-table';
import { cn } from '../../lib/utils';
export function DataTable({ table, actionBar, children, className, ...props }) {
    return (_jsxs("div", { className: cn('flex w-full flex-col gap-2.5 overflow-auto', className), ...props, children: [children, _jsx("div", { className: "overflow-hidden rounded-md border", children: _jsxs(Table, { children: [_jsx(TableHeader, { children: table.getHeaderGroups().map((headerGroup) => (_jsx(TableRow, { children: headerGroup.headers.map((header) => (_jsx(TableHead, { colSpan: header.colSpan, style: {
                                        ...getCommonPinningStyles({ column: header.column }),
                                    }, children: header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext()) }, header.id))) }, headerGroup.id))) }), _jsx(TableBody, { children: table.getRowModel().rows?.length ? (table.getRowModel().rows.map((row) => (_jsx(TableRow, { "data-state": row.getIsSelected() && 'selected', children: row.getVisibleCells().map((cell) => (_jsx(TableCell, { style: {
                                        ...getCommonPinningStyles({ column: cell.column }),
                                    }, children: flexRender(cell.column.columnDef.cell, cell.getContext()) }, cell.id))) }, row.id)))) : (_jsx(TableRow, { children: _jsx(TableCell, { colSpan: table.getAllColumns().length, className: "h-24 text-center", children: "No results." }) })) })] }) }), _jsxs("div", { className: "flex flex-col gap-2.5", children: [_jsx(DataTablePagination, { table: table }), actionBar &&
                        table.getFilteredSelectedRowModel().rows.length > 0 &&
                        actionBar] })] }));
}
//# sourceMappingURL=data-table.js.map