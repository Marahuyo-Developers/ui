"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DataTableViewOptions } from "../../components/data-table/data-table-view-options";
import { cn } from "../../lib/utils";
export function DataTableAdvancedToolbar({ table, children, className, ...props }) {
    return (_jsxs("div", { role: "toolbar", "aria-orientation": "horizontal", className: cn("flex w-full items-start justify-between gap-2 p-1", className), ...props, children: [_jsx("div", { className: "flex flex-1 flex-wrap items-center gap-2", children: children }), _jsx("div", { className: "flex items-center gap-2", children: _jsx(DataTableViewOptions, { table: table }) })] }));
}
//# sourceMappingURL=data-table-advanced-toolbar.js.map