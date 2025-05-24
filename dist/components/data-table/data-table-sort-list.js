"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ArrowDownUp, ChevronsUpDown, GripVertical, Trash2, } from "lucide-react";
import * as React from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "../../components/ui/command";
import { Popover, PopoverContent, PopoverTrigger, } from "../../components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../../components/ui/select";
import { Sortable, SortableContent, SortableItem, SortableItemHandle, SortableOverlay, } from "../../components/ui/sortable";
import { dataTableConfig } from "../../config/data-table";
import { cn } from "../../lib/utils";
const OPEN_MENU_SHORTCUT = "s";
const REMOVE_SORT_SHORTCUTS = ["backspace", "delete"];
export function DataTableSortList({ table, ...props }) {
    const id = React.useId();
    const labelId = React.useId();
    const descriptionId = React.useId();
    const [open, setOpen] = React.useState(false);
    const addButtonRef = React.useRef(null);
    const sorting = table.getState().sorting;
    const onSortingChange = table.setSorting;
    const { columnLabels, columns } = React.useMemo(() => {
        const labels = new Map();
        const sortingIds = new Set(sorting.map((s) => s.id));
        const availableColumns = [];
        for (const column of table.getAllColumns()) {
            if (!column.getCanSort())
                continue;
            const label = column.columnDef.meta?.label ?? column.id;
            labels.set(column.id, label);
            if (!sortingIds.has(column.id)) {
                availableColumns.push({ id: column.id, label });
            }
        }
        return {
            columnLabels: labels,
            columns: availableColumns,
        };
    }, [sorting, table]);
    const onSortAdd = React.useCallback(() => {
        const firstColumn = columns[0];
        if (!firstColumn)
            return;
        onSortingChange((prevSorting) => [
            ...prevSorting,
            { id: firstColumn.id, desc: false },
        ]);
    }, [columns, onSortingChange]);
    const onSortUpdate = React.useCallback((sortId, updates) => {
        onSortingChange((prevSorting) => {
            if (!prevSorting)
                return prevSorting;
            return prevSorting.map((sort) => sort.id === sortId ? { ...sort, ...updates } : sort);
        });
    }, [onSortingChange]);
    const onSortRemove = React.useCallback((sortId) => {
        onSortingChange((prevSorting) => prevSorting.filter((item) => item.id !== sortId));
    }, [onSortingChange]);
    const onSortingReset = React.useCallback(() => onSortingChange(table.initialState.sorting), [onSortingChange, table.initialState.sorting]);
    React.useEffect(() => {
        function onKeyDown(event) {
            if (event.target instanceof HTMLInputElement ||
                event.target instanceof HTMLTextAreaElement) {
                return;
            }
            if (event.key.toLowerCase() === OPEN_MENU_SHORTCUT &&
                !event.ctrlKey &&
                !event.metaKey &&
                !event.shiftKey) {
                event.preventDefault();
                setOpen(true);
            }
            if (event.key.toLowerCase() === OPEN_MENU_SHORTCUT &&
                event.shiftKey &&
                sorting.length > 0) {
                event.preventDefault();
                onSortingReset();
            }
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [sorting.length, onSortingReset]);
    const onTriggerKeyDown = React.useCallback((event) => {
        if (REMOVE_SORT_SHORTCUTS.includes(event.key.toLowerCase()) &&
            sorting.length > 0) {
            event.preventDefault();
            onSortingReset();
        }
    }, [sorting.length, onSortingReset]);
    return (_jsxs(Sortable, { value: sorting, onValueChange: onSortingChange, getItemValue: (item) => item.id, children: [_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", size: "sm", onKeyDown: onTriggerKeyDown, children: [_jsx(ArrowDownUp, {}), "Sort", sorting.length > 0 && (_jsx(Badge, { variant: "secondary", className: "h-[18.24px] rounded-[3.2px] px-[5.12px] font-mono font-normal text-[10.4px]", children: sorting.length }))] }) }), _jsxs(PopoverContent, { "aria-labelledby": labelId, "aria-describedby": descriptionId, className: "flex w-full max-w-[var(--radix-popover-content-available-width)] origin-[var(--radix-popover-content-transform-origin)] flex-col gap-3.5 p-4 sm:min-w-[380px]", ...props, children: [_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("h4", { id: labelId, className: "font-medium leading-none", children: sorting.length > 0 ? "Sort by" : "No sorting applied" }), _jsx("p", { id: descriptionId, className: cn("text-muted-foreground text-sm", sorting.length > 0 && "sr-only"), children: sorting.length > 0
                                            ? "Modify sorting to organize your rows."
                                            : "Add sorting to organize your rows." })] }), sorting.length > 0 && (_jsx(SortableContent, { asChild: true, children: _jsx("div", { role: "list", className: "flex max-h-[300px] flex-col gap-2 overflow-y-auto p-1", children: sorting.map((sort) => (_jsx(DataTableSortItem, { sort: sort, sortItemId: `${id}-sort-${sort.id}`, columns: columns, columnLabels: columnLabels, onSortUpdate: onSortUpdate, onSortRemove: onSortRemove }, sort.id))) }) })), _jsxs("div", { className: "flex w-full items-center gap-2", children: [_jsx(Button, { size: "sm", className: "rounded", ref: addButtonRef, onClick: onSortAdd, disabled: columns.length === 0, children: "Add sort" }), sorting.length > 0 && (_jsx(Button, { variant: "outline", size: "sm", className: "rounded", onClick: onSortingReset, children: "Reset sorting" }))] })] })] }), _jsx(SortableOverlay, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-8 w-[180px] rounded-sm bg-primary/10" }), _jsx("div", { className: "h-8 w-24 rounded-sm bg-primary/10" }), _jsx("div", { className: "size-8 shrink-0 rounded-sm bg-primary/10" }), _jsx("div", { className: "size-8 shrink-0 rounded-sm bg-primary/10" })] }) })] }));
}
function DataTableSortItem({ sort, sortItemId, columns, columnLabels, onSortUpdate, onSortRemove, }) {
    const fieldListboxId = `${sortItemId}-field-listbox`;
    const fieldTriggerId = `${sortItemId}-field-trigger`;
    const directionListboxId = `${sortItemId}-direction-listbox`;
    const [showFieldSelector, setShowFieldSelector] = React.useState(false);
    const [showDirectionSelector, setShowDirectionSelector] = React.useState(false);
    const onItemKeyDown = React.useCallback((event) => {
        if (event.target instanceof HTMLInputElement ||
            event.target instanceof HTMLTextAreaElement) {
            return;
        }
        if (showFieldSelector || showDirectionSelector) {
            return;
        }
        if (REMOVE_SORT_SHORTCUTS.includes(event.key.toLowerCase())) {
            event.preventDefault();
            onSortRemove(sort.id);
        }
    }, [sort.id, showFieldSelector, showDirectionSelector, onSortRemove]);
    return (_jsx(SortableItem, { value: sort.id, asChild: true, children: _jsxs("div", { role: "listitem", id: sortItemId, tabIndex: -1, className: "flex items-center gap-2", onKeyDown: onItemKeyDown, children: [_jsxs(Popover, { open: showFieldSelector, onOpenChange: setShowFieldSelector, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { id: fieldTriggerId, role: "combobox", "aria-controls": fieldListboxId, variant: "outline", size: "sm", className: "w-44 justify-between rounded font-normal", children: [_jsx("span", { className: "truncate", children: columnLabels.get(sort.id) }), _jsx(ChevronsUpDown, { className: "opacity-50" })] }) }), _jsx(PopoverContent, { id: fieldListboxId, className: "w-[var(--radix-popover-trigger-width)] origin-[var(--radix-popover-content-transform-origin)] p-0", children: _jsxs(Command, { children: [_jsx(CommandInput, { placeholder: "Search fields..." }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: "No fields found." }), _jsx(CommandGroup, { children: columns.map((column) => (_jsx(CommandItem, { value: column.id, onSelect: (value) => onSortUpdate(sort.id, { id: value }), children: _jsx("span", { className: "truncate", children: column.label }) }, column.id))) })] })] }) })] }), _jsxs(Select, { open: showDirectionSelector, onOpenChange: setShowDirectionSelector, value: sort.desc ? "desc" : "asc", onValueChange: (value) => onSortUpdate(sort.id, { desc: value === "desc" }), children: [_jsx(SelectTrigger, { "aria-controls": directionListboxId, className: "h-8 w-24 rounded [&[data-size]]:h-8", children: _jsx(SelectValue, {}) }), _jsx(SelectContent, { id: directionListboxId, className: "min-w-[var(--radix-select-trigger-width)] origin-[var(--radix-select-content-transform-origin)]", children: dataTableConfig.sortOrders.map((order) => (_jsx(SelectItem, { value: order.value, children: order.label }, order.value))) })] }), _jsx(Button, { "aria-controls": sortItemId, variant: "outline", size: "icon", className: "size-8 shrink-0 rounded", onClick: () => onSortRemove(sort.id), children: _jsx(Trash2, {}) }), _jsx(SortableItemHandle, { asChild: true, children: _jsx(Button, { variant: "outline", size: "icon", className: "size-8 shrink-0 rounded", children: _jsx(GripVertical, {}) }) })] }) }));
}
//# sourceMappingURL=data-table-sort-list.js.map