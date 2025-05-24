import type { Table as TanstackTable } from '@tanstack/react-table';
import type * as React from 'react';
interface DataTableProps<TData> extends React.ComponentProps<'div'> {
  table: TanstackTable<TData>;
  actionBar?: React.ReactNode;
}
export declare function DataTable<TData>({
  table,
  actionBar,
  children,
  className,
  ...props
}: DataTableProps<TData>): import('react/jsx-runtime').JSX.Element;
//# sourceMappingURL=data-table.d.ts.map
