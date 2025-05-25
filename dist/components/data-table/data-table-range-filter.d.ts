import type { Column } from '@tanstack/react-table';
import * as React from 'react';
import type { ExtendedColumnFilter } from '../../types/data-table';
interface DataTableRangeFilterProps<TData> extends React.ComponentProps<'div'> {
    filter: ExtendedColumnFilter<TData>;
    column: Column<TData>;
    inputId: string;
    onFilterUpdate: (filterId: string, updates: Partial<Omit<ExtendedColumnFilter<TData>, 'filterId'>>) => void;
}
export declare function DataTableRangeFilter<TData>({ filter, column, inputId, onFilterUpdate, className, ...props }: DataTableRangeFilterProps<TData>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=data-table-range-filter.d.ts.map