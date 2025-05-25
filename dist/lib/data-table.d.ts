import type { ExtendedColumnFilter, FilterOperator, FilterVariant } from '../types/data-table';
import type { Column } from '@tanstack/react-table';
export declare function getCommonPinningStyles<TData>({ column, withBorder, }: {
    column: Column<TData>;
    withBorder?: boolean;
}): React.CSSProperties;
export declare function getFilterOperators(filterVariant: FilterVariant): {
    label: string;
    value: FilterOperator;
}[];
export declare function getDefaultFilterOperator(filterVariant: FilterVariant): "iLike" | "notILike" | "eq" | "ne" | "isEmpty" | "isNotEmpty" | "lt" | "lte" | "gt" | "gte" | "isBetween" | "isRelativeToToday" | "inArray" | "notInArray";
export declare function getValidFilters<TData>(filters: ExtendedColumnFilter<TData>[]): ExtendedColumnFilter<TData>[];
//# sourceMappingURL=data-table.d.ts.map