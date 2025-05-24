import type { Column } from '@tanstack/react-table';
import { DropdownMenuTrigger } from '../../components/ui/dropdown-menu';
interface DataTableColumnHeaderProps<TData, TValue> extends React.ComponentProps<typeof DropdownMenuTrigger> {
    column: Column<TData, TValue>;
    title: string;
}
export declare function DataTableColumnHeader<TData, TValue>({ column, title, className, ...props }: DataTableColumnHeaderProps<TData, TValue>): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=data-table-column-header.d.ts.map