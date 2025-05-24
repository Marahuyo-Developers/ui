"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { BadgeCheck, CalendarIcon, Check, ListFilter, Text, X, } from "lucide-react";
import { useQueryState } from "nuqs";
import * as React from "react";
import { DataTableRangeFilter } from "../../components/data-table/data-table-range-filter";
import { Button } from "../../components/ui/button";
import { Calendar } from "../../components/ui/calendar";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from "../../components/ui/command";
import { Input } from "../../components/ui/input";
import { Popover, PopoverContent, PopoverTrigger, } from "../../components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "../../components/ui/select";
import { useDebouncedCallback } from "../../hooks/use-debounced-callback";
import { getDefaultFilterOperator, getFilterOperators } from "../../lib/data-table";
import { formatDate } from "../../lib/format";
import { generateId } from "../../lib/id";
import { getFiltersStateParser } from "../../lib/parsers";
import { cn } from "../../lib/utils";
const FILTERS_KEY = "filters";
const DEBOUNCE_MS = 300;
const THROTTLE_MS = 50;
const OPEN_MENU_SHORTCUT = "f";
const REMOVE_FILTER_SHORTCUTS = ["backspace", "delete"];
export function DataTableFilterMenu({ table, debounceMs = DEBOUNCE_MS, throttleMs = THROTTLE_MS, shallow = true, align = "start", ...props }) {
    const id = React.useId();
    const columns = React.useMemo(() => {
        return table
            .getAllColumns()
            .filter((column) => column.columnDef.enableColumnFilter);
    }, [table]);
    const [open, setOpen] = React.useState(false);
    const [selectedColumn, setSelectedColumn] = React.useState(null);
    const [inputValue, setInputValue] = React.useState("");
    const triggerRef = React.useRef(null);
    const inputRef = React.useRef(null);
    const onOpenChange = React.useCallback((open) => {
        setOpen(open);
        if (!open) {
            setTimeout(() => {
                setSelectedColumn(null);
                setInputValue("");
            }, 100);
        }
    }, []);
    const onInputKeyDown = React.useCallback((event) => {
        if (REMOVE_FILTER_SHORTCUTS.includes(event.key.toLowerCase()) &&
            !inputValue &&
            selectedColumn) {
            event.preventDefault();
            setSelectedColumn(null);
        }
    }, [inputValue, selectedColumn]);
    const [filters, setFilters] = useQueryState(FILTERS_KEY, getFiltersStateParser(columns.map((field) => field.id))
        .withDefault([])
        .withOptions({
        clearOnDefault: true,
        shallow,
        throttleMs,
    }));
    const debouncedSetFilters = useDebouncedCallback(setFilters, debounceMs);
    const onFilterAdd = React.useCallback((column, value) => {
        if (!value.trim() && column.columnDef.meta?.variant !== "boolean") {
            return;
        }
        const filterValue = column.columnDef.meta?.variant === "multiSelect" ? [value] : value;
        const newFilter = {
            id: column.id,
            value: filterValue,
            variant: column.columnDef.meta?.variant ?? "text",
            operator: getDefaultFilterOperator(column.columnDef.meta?.variant ?? "text"),
            filterId: generateId({ length: 8 }),
        };
        debouncedSetFilters([...filters, newFilter]);
        setOpen(false);
        setTimeout(() => {
            setSelectedColumn(null);
            setInputValue("");
        }, 100);
    }, [filters, debouncedSetFilters]);
    const onFilterRemove = React.useCallback((filterId) => {
        const updatedFilters = filters.filter((filter) => filter.filterId !== filterId);
        debouncedSetFilters(updatedFilters);
        requestAnimationFrame(() => {
            triggerRef.current?.focus();
        });
    }, [filters, debouncedSetFilters]);
    const onFilterUpdate = React.useCallback((filterId, updates) => {
        debouncedSetFilters((prevFilters) => {
            const updatedFilters = prevFilters.map((filter) => {
                if (filter.filterId === filterId) {
                    return { ...filter, ...updates };
                }
                return filter;
            });
            return updatedFilters;
        });
    }, [debouncedSetFilters]);
    const onFiltersReset = React.useCallback(() => {
        debouncedSetFilters([]);
    }, [debouncedSetFilters]);
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
                !open &&
                filters.length > 0) {
                event.preventDefault();
                onFilterRemove(filters[filters.length - 1]?.filterId ?? "");
            }
        }
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, filters, onFilterRemove]);
    const onTriggerKeyDown = React.useCallback((event) => {
        if (REMOVE_FILTER_SHORTCUTS.includes(event.key.toLowerCase()) &&
            filters.length > 0) {
            event.preventDefault();
            onFilterRemove(filters[filters.length - 1]?.filterId ?? "");
        }
    }, [filters, onFilterRemove]);
    return (_jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [filters.map((filter) => (_jsx(DataTableFilterItem, { filter: filter, filterItemId: `${id}-filter-${filter.filterId}`, columns: columns, onFilterUpdate: onFilterUpdate, onFilterRemove: onFilterRemove }, filter.filterId))), filters.length > 0 && (_jsx(Button, { "aria-label": "Reset all filters", variant: "outline", size: "icon", className: "size-8", onClick: onFiltersReset, children: _jsx(X, {}) })), _jsxs(Popover, { open: open, onOpenChange: onOpenChange, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { "aria-label": "Open filter command menu", variant: "outline", size: filters.length > 0 ? "icon" : "sm", className: cn(filters.length > 0 && "size-8", "h-8"), ref: triggerRef, onKeyDown: onTriggerKeyDown, children: [_jsx(ListFilter, {}), filters.length > 0 ? null : "Filter"] }) }), _jsx(PopoverContent, { align: align, className: "w-full max-w-[var(--radix-popover-content-available-width)] origin-[var(--radix-popover-content-transform-origin)] p-0", ...props, children: _jsxs(Command, { loop: true, className: "[&_[cmdk-input-wrapper]_svg]:hidden", children: [_jsx(CommandInput, { ref: inputRef, placeholder: selectedColumn
                                        ? (selectedColumn.columnDef.meta?.label ?? selectedColumn.id)
                                        : "Search fields...", value: inputValue, onValueChange: setInputValue, onKeyDown: onInputKeyDown }), _jsx(CommandList, { children: selectedColumn ? (_jsxs(_Fragment, { children: [selectedColumn.columnDef.meta?.options && (_jsx(CommandEmpty, { children: "No options found." })), _jsx(FilterValueSelector, { column: selectedColumn, value: inputValue, onSelect: (value) => onFilterAdd(selectedColumn, value) })] })) : (_jsxs(_Fragment, { children: [_jsx(CommandEmpty, { children: "No fields found." }), _jsx(CommandGroup, { children: columns.map((column) => (_jsxs(CommandItem, { value: column.id, onSelect: () => {
                                                        setSelectedColumn(column);
                                                        setInputValue("");
                                                        requestAnimationFrame(() => {
                                                            inputRef.current?.focus();
                                                        });
                                                    }, children: [column.columnDef.meta?.icon && (_jsx(column.columnDef.meta.icon, {})), _jsx("span", { className: "truncate", children: column.columnDef.meta?.label ?? column.id })] }, column.id))) })] })) })] }) })] })] }));
}
function DataTableFilterItem({ filter, filterItemId, columns, onFilterUpdate, onFilterRemove, }) {
    {
        const [showFieldSelector, setShowFieldSelector] = React.useState(false);
        const [showOperatorSelector, setShowOperatorSelector] = React.useState(false);
        const [showValueSelector, setShowValueSelector] = React.useState(false);
        const column = columns.find((column) => column.id === filter.id);
        if (!column)
            return null;
        const operatorListboxId = `${filterItemId}-operator-listbox`;
        const inputId = `${filterItemId}-input`;
        const columnMeta = column.columnDef.meta;
        const filterOperators = getFilterOperators(filter.variant);
        const onItemKeyDown = React.useCallback((event) => {
            if (event.target instanceof HTMLInputElement ||
                event.target instanceof HTMLTextAreaElement) {
                return;
            }
            if (showFieldSelector || showOperatorSelector || showValueSelector) {
                return;
            }
            if (REMOVE_FILTER_SHORTCUTS.includes(event.key.toLowerCase())) {
                event.preventDefault();
                onFilterRemove(filter.filterId);
            }
        }, [
            filter.filterId,
            showFieldSelector,
            showOperatorSelector,
            showValueSelector,
            onFilterRemove,
        ]);
        return (_jsxs("div", { role: "listitem", id: filterItemId, className: "flex h-8 items-center rounded-md bg-background", onKeyDown: onItemKeyDown, children: [_jsxs(Popover, { open: showFieldSelector, onOpenChange: setShowFieldSelector, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "ghost", size: "sm", className: "rounded-none rounded-l-md border border-r-0 font-normal dark:bg-input/30", children: [columnMeta?.icon && (_jsx(columnMeta.icon, { className: "text-muted-foreground" })), columnMeta?.label ?? column.id] }) }), _jsx(PopoverContent, { align: "start", className: "w-48 origin-[var(--radix-popover-content-transform-origin)] p-0", children: _jsxs(Command, { loop: true, children: [_jsx(CommandInput, { placeholder: "Search fields..." }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: "No fields found." }), _jsx(CommandGroup, { children: columns.map((column) => (_jsxs(CommandItem, { value: column.id, onSelect: () => {
                                                        onFilterUpdate(filter.filterId, {
                                                            id: column.id,
                                                            variant: column.columnDef.meta?.variant ?? "text",
                                                            operator: getDefaultFilterOperator(column.columnDef.meta?.variant ?? "text"),
                                                            value: "",
                                                        });
                                                        setShowFieldSelector(false);
                                                    }, children: [column.columnDef.meta?.icon && (_jsx(column.columnDef.meta.icon, {})), _jsx("span", { className: "truncate", children: column.columnDef.meta?.label ?? column.id }), _jsx(Check, { className: cn("ml-auto", column.id === filter.id ? "opacity-100" : "opacity-0") })] }, column.id))) })] })] }) })] }), _jsxs(Select, { open: showOperatorSelector, onOpenChange: setShowOperatorSelector, value: filter.operator, onValueChange: (value) => onFilterUpdate(filter.filterId, {
                        operator: value,
                        value: value === "isEmpty" || value === "isNotEmpty"
                            ? ""
                            : filter.value,
                    }), children: [_jsx(SelectTrigger, { "aria-controls": operatorListboxId, className: "h-8 rounded-none border-r-0 px-2.5 lowercase [&[data-size]]:h-8 [&_svg]:hidden", children: _jsx(SelectValue, { placeholder: filter.operator }) }), _jsx(SelectContent, { id: operatorListboxId, className: "origin-[var(--radix-select-content-transform-origin)]", children: filterOperators.map((operator) => (_jsx(SelectItem, { className: "lowercase", value: operator.value, children: operator.label }, operator.value))) })] }), onFilterInputRender({
                    filter,
                    column,
                    inputId,
                    onFilterUpdate,
                    showValueSelector,
                    setShowValueSelector,
                }), _jsx(Button, { "aria-controls": filterItemId, variant: "ghost", size: "sm", className: "h-full rounded-none rounded-r-md border border-l-0 px-1.5 font-normal dark:bg-input/30", onClick: () => onFilterRemove(filter.filterId), children: _jsx(X, { className: "size-3.5" }) })] }, filter.filterId));
    }
}
function FilterValueSelector({ column, value, onSelect, }) {
    const variant = column.columnDef.meta?.variant ?? "text";
    switch (variant) {
        case "boolean":
            return (_jsxs(CommandGroup, { children: [_jsx(CommandItem, { value: "true", onSelect: () => onSelect("true"), children: "True" }), _jsx(CommandItem, { value: "false", onSelect: () => onSelect("false"), children: "False" })] }));
        case "select":
        case "multiSelect":
            return (_jsx(CommandGroup, { children: column.columnDef.meta?.options?.map((option) => (_jsxs(CommandItem, { value: option.value, onSelect: () => onSelect(option.value), children: [option.icon && _jsx(option.icon, {}), _jsx("span", { className: "truncate", children: option.label }), option.count && (_jsx("span", { className: "ml-auto font-mono text-xs", children: option.count }))] }, option.value))) }));
        case "date":
        case "dateRange":
            return (_jsx(Calendar, { initialFocus: true, mode: "single", selected: value ? new Date(value) : undefined, onSelect: (date) => onSelect(date?.getTime().toString() ?? "") }));
        default: {
            const isEmpty = !value.trim();
            return (_jsx(CommandGroup, { children: _jsx(CommandItem, { value: value, onSelect: () => onSelect(value), disabled: isEmpty, children: isEmpty ? (_jsxs(_Fragment, { children: [_jsx(Text, {}), _jsx("span", { children: "Type to add filter..." })] })) : (_jsxs(_Fragment, { children: [_jsx(BadgeCheck, {}), _jsxs("span", { className: "truncate", children: ["Filter by \"", value, "\""] })] })) }) }));
        }
    }
}
function onFilterInputRender({ filter, column, inputId, onFilterUpdate, showValueSelector, setShowValueSelector, }) {
    if (filter.operator === "isEmpty" || filter.operator === "isNotEmpty") {
        return (_jsx("div", { id: inputId, role: "status", "aria-label": `${column.columnDef.meta?.label} filter is ${filter.operator === "isEmpty" ? "empty" : "not empty"}`, "aria-live": "polite", className: "h-full w-16 rounded-none border bg-transparent px-1.5 py-0.5 text-muted-foreground dark:bg-input/30" }));
    }
    switch (filter.variant) {
        case "text":
        case "number":
        case "range": {
            if ((filter.variant === "range" && filter.operator === "isBetween") ||
                filter.operator === "isBetween") {
                return (_jsx(DataTableRangeFilter, { filter: filter, column: column, inputId: inputId, onFilterUpdate: onFilterUpdate, className: "size-full max-w-28 gap-0 [&_[data-slot='range-min']]:border-r-0 [&_input]:rounded-none [&_input]:px-1.5" }));
            }
            const isNumber = filter.variant === "number" || filter.variant === "range";
            return (_jsx(Input, { id: inputId, type: isNumber ? "number" : "text", inputMode: isNumber ? "numeric" : undefined, placeholder: column.columnDef.meta?.placeholder ?? "Enter value...", className: "h-full w-24 rounded-none px-1.5", defaultValue: typeof filter.value === "string" ? filter.value : "", onChange: (event) => onFilterUpdate(filter.filterId, { value: event.target.value }) }));
        }
        case "boolean": {
            const inputListboxId = `${inputId}-listbox`;
            return (_jsxs(Select, { open: showValueSelector, onOpenChange: setShowValueSelector, value: typeof filter.value === "string" ? filter.value : "true", onValueChange: (value) => onFilterUpdate(filter.filterId, { value }), children: [_jsx(SelectTrigger, { id: inputId, "aria-controls": inputListboxId, className: "rounded-none bg-transparent px-1.5 py-0.5 [&_svg]:hidden", children: _jsx(SelectValue, { placeholder: filter.value ? "True" : "False" }) }), _jsxs(SelectContent, { id: inputListboxId, children: [_jsx(SelectItem, { value: "true", children: "True" }), _jsx(SelectItem, { value: "false", children: "False" })] })] }));
        }
        case "select":
        case "multiSelect": {
            const inputListboxId = `${inputId}-listbox`;
            const options = column.columnDef.meta?.options ?? [];
            const selectedValues = Array.isArray(filter.value)
                ? filter.value
                : [filter.value];
            const selectedOptions = options.filter((option) => selectedValues.includes(option.value));
            return (_jsxs(Popover, { open: showValueSelector, onOpenChange: setShowValueSelector, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { id: inputId, "aria-controls": inputListboxId, variant: "ghost", size: "sm", className: "h-full min-w-16 rounded-none border px-1.5 font-normal dark:bg-input/30", children: selectedOptions.length === 0 ? (filter.variant === "multiSelect" ? ("Select options...") : ("Select option...")) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "-space-x-2 flex items-center rtl:space-x-reverse", children: selectedOptions.map((selectedOption) => selectedOption.icon ? (_jsx("div", { className: "rounded-full border bg-background p-0.5", children: _jsx(selectedOption.icon, { className: "size-3.5" }) }, selectedOption.value)) : null) }), _jsx("span", { className: "truncate", children: selectedOptions.length > 1
                                            ? `${selectedOptions.length} selected`
                                            : selectedOptions[0]?.label })] })) }) }), _jsx(PopoverContent, { id: inputListboxId, align: "start", className: "w-48 origin-[var(--radix-popover-content-transform-origin)] p-0", children: _jsxs(Command, { children: [_jsx(CommandInput, { placeholder: "Search options..." }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: "No options found." }), _jsx(CommandGroup, { children: options.map((option) => (_jsxs(CommandItem, { value: option.value, onSelect: () => {
                                                    const value = filter.variant === "multiSelect"
                                                        ? selectedValues.includes(option.value)
                                                            ? selectedValues.filter((v) => v !== option.value)
                                                            : [...selectedValues, option.value]
                                                        : option.value;
                                                    onFilterUpdate(filter.filterId, { value });
                                                }, children: [option.icon && _jsx(option.icon, {}), _jsx("span", { className: "truncate", children: option.label }), filter.variant === "multiSelect" && (_jsx(Check, { className: cn("ml-auto", selectedValues.includes(option.value)
                                                            ? "opacity-100"
                                                            : "opacity-0") }))] }, option.value))) })] })] }) })] }));
        }
        case "date":
        case "dateRange": {
            const inputListboxId = `${inputId}-listbox`;
            const dateValue = Array.isArray(filter.value)
                ? filter.value.filter(Boolean)
                : [filter.value, filter.value].filter(Boolean);
            const displayValue = filter.operator === "isBetween" && dateValue.length === 2
                ? `${formatDate(new Date(Number(dateValue[0])))} - ${formatDate(new Date(Number(dateValue[1])))}`
                : dateValue[0]
                    ? formatDate(new Date(Number(dateValue[0])))
                    : "Pick date...";
            return (_jsxs(Popover, { open: showValueSelector, onOpenChange: setShowValueSelector, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { id: inputId, "aria-controls": inputListboxId, variant: "ghost", size: "sm", className: cn("h-full rounded-none border px-1.5 font-normal dark:bg-input/30", !filter.value && "text-muted-foreground"), children: [_jsx(CalendarIcon, { className: "size-3.5" }), _jsx("span", { className: "truncate", children: displayValue })] }) }), _jsx(PopoverContent, { id: inputListboxId, align: "start", className: "w-auto origin-[var(--radix-popover-content-transform-origin)] p-0", children: filter.operator === "isBetween" ? (_jsx(Calendar, { mode: "range", initialFocus: true, selected: dateValue.length === 2
                                ? {
                                    from: new Date(Number(dateValue[0])),
                                    to: new Date(Number(dateValue[1])),
                                }
                                : {
                                    from: new Date(),
                                    to: new Date(),
                                }, onSelect: (date) => {
                                onFilterUpdate(filter.filterId, {
                                    value: date
                                        ? [
                                            (date.from?.getTime() ?? "").toString(),
                                            (date.to?.getTime() ?? "").toString(),
                                        ]
                                        : [],
                                });
                            } })) : (_jsx(Calendar, { mode: "single", initialFocus: true, selected: dateValue[0] ? new Date(Number(dateValue[0])) : undefined, onSelect: (date) => {
                                onFilterUpdate(filter.filterId, {
                                    value: (date?.getTime() ?? "").toString(),
                                });
                            } })) })] }));
        }
        default:
            return null;
    }
}
//# sourceMappingURL=data-table-filter-menu.js.map