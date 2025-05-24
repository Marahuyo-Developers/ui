'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, ChevronsUpDown, Settings2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from '../../components/ui/command';
import { Popover, PopoverContent, PopoverTrigger, } from '../../components/ui/popover';
import { cn } from '../../lib/utils';
import * as React from 'react';
export function DataTableViewOptions({ table, }) {
    const columns = React.useMemo(() => table
        .getAllColumns()
        .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide()), [table]);
    return (_jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { "aria-label": "Toggle columns", role: "combobox", variant: "outline", size: "sm", className: "ml-auto hidden h-8 lg:flex", children: [_jsx(Settings2, {}), "View", _jsx(ChevronsUpDown, { className: "ml-auto opacity-50" })] }) }), _jsx(PopoverContent, { align: "end", className: "w-44 p-0", children: _jsxs(Command, { children: [_jsx(CommandInput, { placeholder: "Search columns..." }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: "No columns found." }), _jsx(CommandGroup, { children: columns.map((column) => (_jsxs(CommandItem, { onSelect: () => column.toggleVisibility(!column.getIsVisible()), children: [_jsx("span", { className: "truncate", children: column.columnDef.meta?.label ?? column.id }), _jsx(Check, { className: cn('ml-auto size-4 shrink-0', column.getIsVisible() ? 'opacity-100' : 'opacity-0') })] }, column.id))) })] })] }) })] }));
}
//# sourceMappingURL=data-table-view-options.js.map