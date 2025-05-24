import { Button } from "../../components/ui/button";
import type { Table } from "@tanstack/react-table";
import { motion } from "motion/react";
import * as React from "react";
interface DataTableActionBarProps<TData> extends React.ComponentProps<typeof motion.div> {
    table: Table<TData>;
    visible?: boolean;
    container?: Element | DocumentFragment | null;
}
declare function DataTableActionBar<TData>({ table, visible: visibleProp, container: containerProp, children, className, ...props }: DataTableActionBarProps<TData>): React.ReactPortal | null;
interface DataTableActionBarActionProps extends React.ComponentProps<typeof Button> {
    tooltip?: string;
    isPending?: boolean;
}
declare function DataTableActionBarAction({ size, tooltip, isPending, disabled, className, children, ...props }: DataTableActionBarActionProps): import("react/jsx-runtime").JSX.Element;
interface DataTableActionBarSelectionProps<TData> {
    table: Table<TData>;
}
declare function DataTableActionBarSelection<TData>({ table, }: DataTableActionBarSelectionProps<TData>): import("react/jsx-runtime").JSX.Element;
export { DataTableActionBar, DataTableActionBarAction, DataTableActionBarSelection, };
//# sourceMappingURL=data-table-action-bar.d.ts.map