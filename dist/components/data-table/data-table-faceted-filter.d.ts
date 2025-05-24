import type { Option } from '../../types/data-table';
import type { Column } from '@tanstack/react-table';
interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: Option[];
  multiple?: boolean;
}
export declare function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  multiple,
}: DataTableFacetedFilterProps<TData, TValue>): import(
  'react/jsx-runtime',
).JSX.Element;
//# sourceMappingURL=data-table-faceted-filter.d.ts.map
