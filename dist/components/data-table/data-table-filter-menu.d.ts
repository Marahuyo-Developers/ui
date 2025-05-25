import type { Table } from '@tanstack/react-table';
import * as React from 'react';
import { PopoverContent } from '../../components/ui/popover';
interface DataTableFilterMenuProps<TData> extends React.ComponentProps<typeof PopoverContent> {
    table: Table<TData>;
    debounceMs?: number;
    throttleMs?: number;
    shallow?: boolean;
    filtersKey?: string;
    openMenuShortcut?: string;
    removeFilterShortcuts?: string[];
}
export declare function DataTableFilterMenu<TData>({ table, debounceMs, throttleMs, shallow, align, filtersKey, openMenuShortcut, removeFilterShortcuts, ...props }: DataTableFilterMenuProps<TData>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=data-table-filter-menu.d.ts.map