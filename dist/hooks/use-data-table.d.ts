import { type TableOptions, type TableState } from '@tanstack/react-table';
import * as React from 'react';
import type { ExtendedColumnSort } from '../types/data-table';
interface UseDataTableProps<TData> extends Omit<TableOptions<TData>, 'state' | 'pageCount' | 'getCoreRowModel' | 'manualFiltering' | 'manualPagination' | 'manualSorting'>, Required<Pick<TableOptions<TData>, 'pageCount'>> {
    initialState?: Omit<Partial<TableState>, 'sorting'> & {
        sorting?: ExtendedColumnSort<TData>[];
    };
    history?: 'push' | 'replace';
    debounceMs?: number;
    throttleMs?: number;
    clearOnDefault?: boolean;
    enableAdvancedFilter?: boolean;
    scroll?: boolean;
    shallow?: boolean;
    startTransition?: React.TransitionStartFunction;
    pageKey?: string;
    perPageKey?: string;
    sortKey?: string;
}
export declare function useDataTable<TData>(props: UseDataTableProps<TData>): {
    table: import("@tanstack/table-core").Table<TData>;
    shallow: boolean;
    debounceMs: number;
    throttleMs: number;
};
export {};
//# sourceMappingURL=use-data-table.d.ts.map