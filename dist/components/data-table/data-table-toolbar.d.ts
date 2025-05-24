import type { Table } from '@tanstack/react-table';
import * as React from 'react';
interface DataTableToolbarProps<TData> extends React.ComponentProps<'div'> {
    table: Table<TData>;
}
export declare function DataTableToolbar<TData>({ table, children, className, ...props }: DataTableToolbarProps<TData>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=data-table-toolbar.d.ts.map