'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CalendarIcon, Check, ChevronsUpDown, GripVertical, ListFilter, Trash2, } from 'lucide-react';
import { parseAsStringEnum, useQueryState } from 'nuqs';
import * as React from 'react';
import { DataTableRangeFilter } from '../../components/data-table/data-table-range-filter';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Calendar } from '../../components/ui/calendar';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, } from '../../components/ui/command';
import { Faceted, FacetedBadgeList, FacetedContent, FacetedEmpty, FacetedGroup, FacetedInput, FacetedItem, FacetedList, FacetedTrigger, } from '../../components/ui/faceted';
import { Input } from '../../components/ui/input';
import { Popover, PopoverContent, PopoverTrigger, } from '../../components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '../../components/ui/select';
import { Sortable, SortableContent, SortableItem, SortableItemHandle, SortableOverlay, } from '../../components/ui/sortable';
import { dataTableConfig } from '../../config/data-table';
import { useDebouncedCallback } from '../../hooks/use-debounced-callback';
import { getDefaultFilterOperator, getFilterOperators } from '../../lib/data-table';
import { formatDate } from '../../lib/format';
import { generateId } from '../../lib/id';
import { getFiltersStateParser } from '../../lib/parsers';
import { cn } from '../../lib/utils';
const DEBOUNCE_MS = 300;
const THROTTLE_MS = 50;
export function DataTableFilterList({ table, debounceMs = DEBOUNCE_MS, throttleMs = THROTTLE_MS, shallow = true, filtersKey = 'filters', joinOperatorKey = 'joinOperator', openMenuShortcut = 'f', removeFilterShortcuts = ['backspace', 'delete'], ...props }) {
    const id = React.useId();
    const labelId = React.useId();
    const descriptionId = React.useId();
    const [open, setOpen] = React.useState(false);
    const addButtonRef = React.useRef(null);
    const columns = React.useMemo(() => {
        return table
            .getAllColumns()
            .filter((column) => column.columnDef.enableColumnFilter);
    }, [table]);
    const [filters, setFilters] = useQueryState(filtersKey, getFiltersStateParser(columns.map((field) => field.id))
        .withDefault([])
        .withOptions({
        clearOnDefault: true,
        shallow,
        throttleMs,
    }));
    const debouncedSetFilters = useDebouncedCallback(setFilters, debounceMs);
    const [joinOperator, setJoinOperator] = useQueryState(joinOperatorKey, parseAsStringEnum(['and', 'or']).withDefault('and').withOptions({
        clearOnDefault: true,
        shallow,
    }));
    const onFilterAdd = React.useCallback(() => {
        const column = columns[0];
        if (!column)
            return;
        debouncedSetFilters([
            ...filters,
            {
                id: column.id,
                value: '',
                variant: column.columnDef.meta?.variant ?? 'text',
                operator: getDefaultFilterOperator(column.columnDef.meta?.variant ?? 'text'),
                filterId: generateId({ length: 8 }),
            },
        ]);
    }, [columns, filters, debouncedSetFilters]);
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
    const onFilterRemove = React.useCallback((filterId) => {
        const updatedFilters = filters.filter((filter) => filter.filterId !== filterId);
        void setFilters(updatedFilters);
        requestAnimationFrame(() => {
            addButtonRef.current?.focus();
        });
    }, [filters, setFilters]);
    const onFiltersReset = React.useCallback(() => {
        void setFilters(null);
        void setJoinOperator('and');
    }, [setFilters, setJoinOperator]);
    React.useEffect(() => {
        function onKeyDown(event) {
            if (event.target instanceof HTMLInputElement ||
                event.target instanceof HTMLTextAreaElement) {
                return;
            }
            if (event.key.toLowerCase() === openMenuShortcut &&
                !event.ctrlKey &&
                !event.metaKey &&
                !event.shiftKey) {
                event.preventDefault();
                setOpen(true);
            }
            if (event.key.toLowerCase() === openMenuShortcut &&
                event.shiftKey &&
                filters.length > 0) {
                event.preventDefault();
                onFilterRemove(filters[filters.length - 1]?.filterId ?? '');
            }
        }
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [filters, onFilterRemove, openMenuShortcut]);
    const onTriggerKeyDown = React.useCallback((event) => {
        if (removeFilterShortcuts.includes(event.key.toLowerCase()) &&
            filters.length > 0) {
            event.preventDefault();
            onFilterRemove(filters[filters.length - 1]?.filterId ?? '');
        }
    }, [filters, onFilterRemove, removeFilterShortcuts]);
    return (_jsxs(Sortable, { value: filters, onValueChange: setFilters, getItemValue: (item) => item.filterId, children: [_jsxs(Popover, { open: open, onOpenChange: setOpen, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", size: "sm", onKeyDown: onTriggerKeyDown, children: [_jsx(ListFilter, {}), "Filter", filters.length > 0 && (_jsx(Badge, { variant: "secondary", className: "h-[18.24px] rounded-[3.2px] px-[5.12px] font-mono font-normal text-[10.4px]", children: filters.length }))] }) }), _jsxs(PopoverContent, { "aria-describedby": descriptionId, "aria-labelledby": labelId, className: "flex w-full max-w-[var(--radix-popover-content-available-width)] origin-[var(--radix-popover-content-transform-origin)] flex-col gap-3.5 p-4 sm:min-w-[380px]", ...props, children: [_jsxs("div", { className: "flex flex-col gap-1", children: [_jsx("h4", { id: labelId, className: "font-medium leading-none", children: filters.length > 0 ? 'Filters' : 'No filters applied' }), _jsx("p", { id: descriptionId, className: cn('text-muted-foreground text-sm', filters.length > 0 && 'sr-only'), children: filters.length > 0
                                            ? 'Modify filters to refine your rows.'
                                            : 'Add filters to refine your rows.' })] }), filters.length > 0 ? (_jsx(SortableContent, { asChild: true, children: _jsx("div", { role: "list", className: "flex max-h-[300px] flex-col gap-2 overflow-y-auto p-1", children: filters.map((filter, index) => (_jsx(DataTableFilterItem, { removeFilterShortcuts: removeFilterShortcuts, filter: filter, index: index, filterItemId: `${id}-filter-${filter.filterId}`, joinOperator: joinOperator, setJoinOperator: setJoinOperator, columns: columns, onFilterUpdate: onFilterUpdate, onFilterRemove: onFilterRemove }, filter.filterId))) }) })) : null, _jsxs("div", { className: "flex w-full items-center gap-2", children: [_jsx(Button, { size: "sm", className: "rounded", ref: addButtonRef, onClick: onFilterAdd, children: "Add filter" }), filters.length > 0 ? (_jsx(Button, { variant: "outline", size: "sm", className: "rounded", onClick: onFiltersReset, children: "Reset filters" })) : null] })] })] }), _jsx(SortableOverlay, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "h-8 min-w-[72px] rounded-sm bg-primary/10" }), _jsx("div", { className: "h-8 w-32 rounded-sm bg-primary/10" }), _jsx("div", { className: "h-8 w-32 rounded-sm bg-primary/10" }), _jsx("div", { className: "h-8 min-w-36 flex-1 rounded-sm bg-primary/10" }), _jsx("div", { className: "size-8 shrink-0 rounded-sm bg-primary/10" }), _jsx("div", { className: "size-8 shrink-0 rounded-sm bg-primary/10" })] }) })] }));
}
function DataTableFilterItem({ filter, index, filterItemId, joinOperator, setJoinOperator, columns, onFilterUpdate, onFilterRemove, removeFilterShortcuts, }) {
    const [showFieldSelector, setShowFieldSelector] = React.useState(false);
    const [showOperatorSelector, setShowOperatorSelector] = React.useState(false);
    const [showValueSelector, setShowValueSelector] = React.useState(false);
    const column = columns.find((column) => column.id === filter.id);
    if (!column)
        return null;
    const joinOperatorListboxId = `${filterItemId}-join-operator-listbox`;
    const fieldListboxId = `${filterItemId}-field-listbox`;
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
        if (removeFilterShortcuts.includes(event.key.toLowerCase())) {
            event.preventDefault();
            onFilterRemove(filter.filterId);
        }
    }, [
        filter.filterId,
        showFieldSelector,
        showOperatorSelector,
        showValueSelector,
        onFilterRemove,
        removeFilterShortcuts,
    ]);
    return (_jsx(SortableItem, { value: filter.filterId, asChild: true, children: _jsxs("div", { role: "listitem", id: filterItemId, tabIndex: -1, className: "flex items-center gap-2", onKeyDown: onItemKeyDown, children: [_jsx("div", { className: "min-w-[72px] text-center", children: index === 0 ? (_jsx("span", { className: "text-muted-foreground text-sm", children: "Where" })) : index === 1 ? (_jsxs(Select, { value: joinOperator, onValueChange: (value) => setJoinOperator(value), children: [_jsx(SelectTrigger, { "aria-label": "Select join operator", "aria-controls": joinOperatorListboxId, className: "h-8 rounded lowercase [&[data-size]]:h-8", children: _jsx(SelectValue, { placeholder: joinOperator }) }), _jsx(SelectContent, { id: joinOperatorListboxId, position: "popper", className: "min-w-(--radix-select-trigger-width) lowercase", children: dataTableConfig.joinOperators.map((joinOperator) => (_jsx(SelectItem, { value: joinOperator, children: joinOperator }, joinOperator))) })] })) : (_jsx("span", { className: "text-muted-foreground text-sm", children: joinOperator })) }), _jsxs(Popover, { open: showFieldSelector, onOpenChange: setShowFieldSelector, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { role: "combobox", "aria-controls": fieldListboxId, variant: "outline", size: "sm", className: "w-32 justify-between rounded font-normal", children: [_jsx("span", { className: "truncate", children: columns.find((column) => column.id === filter.id)?.columnDef
                                            .meta?.label ?? 'Select field' }), _jsx(ChevronsUpDown, { className: "opacity-50" })] }) }), _jsx(PopoverContent, { id: fieldListboxId, align: "start", className: "w-40 origin-[var(--radix-popover-content-transform-origin)] p-0", children: _jsxs(Command, { children: [_jsx(CommandInput, { placeholder: "Search fields..." }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: "No fields found." }), _jsx(CommandGroup, { children: columns.map((column) => (_jsxs(CommandItem, { value: column.id, onSelect: (value) => {
                                                        onFilterUpdate(filter.filterId, {
                                                            id: value,
                                                            variant: column.columnDef.meta?.variant ?? 'text',
                                                            operator: getDefaultFilterOperator(column.columnDef.meta?.variant ?? 'text'),
                                                            value: '',
                                                        });
                                                        setShowFieldSelector(false);
                                                    }, children: [_jsx("span", { className: "truncate", children: column.columnDef.meta?.label }), _jsx(Check, { className: cn('ml-auto', column.id === filter.id ? 'opacity-100' : 'opacity-0') })] }, column.id))) })] })] }) })] }), _jsxs(Select, { open: showOperatorSelector, onOpenChange: setShowOperatorSelector, value: filter.operator, onValueChange: (value) => onFilterUpdate(filter.filterId, {
                        operator: value,
                        value: value === 'isEmpty' || value === 'isNotEmpty'
                            ? ''
                            : filter.value,
                    }), children: [_jsx(SelectTrigger, { "aria-controls": operatorListboxId, className: "h-8 w-32 rounded lowercase [&[data-size]]:h-8", children: _jsx("div", { className: "truncate", children: _jsx(SelectValue, { placeholder: filter.operator }) }) }), _jsx(SelectContent, { id: operatorListboxId, className: "origin-[var(--radix-select-content-transform-origin)]", children: filterOperators.map((operator) => (_jsx(SelectItem, { value: operator.value, className: "lowercase", children: operator.label }, operator.value))) })] }), _jsx("div", { className: "min-w-36 flex-1", children: onFilterInputRender({
                        filter,
                        inputId,
                        column,
                        columnMeta,
                        onFilterUpdate,
                        showValueSelector,
                        setShowValueSelector,
                    }) }), _jsx(Button, { "aria-controls": filterItemId, variant: "outline", size: "icon", className: "size-8 rounded", onClick: () => onFilterRemove(filter.filterId), children: _jsx(Trash2, {}) }), _jsx(SortableItemHandle, { asChild: true, children: _jsx(Button, { variant: "outline", size: "icon", className: "size-8 rounded", children: _jsx(GripVertical, {}) }) })] }) }));
}
function onFilterInputRender({ filter, inputId, column, columnMeta, onFilterUpdate, showValueSelector, setShowValueSelector, }) {
    if (filter.operator === 'isEmpty' || filter.operator === 'isNotEmpty') {
        return (_jsx("div", { id: inputId, role: "status", "aria-label": `${columnMeta?.label} filter is ${filter.operator === 'isEmpty' ? 'empty' : 'not empty'}`, "aria-live": "polite", className: "h-8 w-full rounded border bg-transparent dark:bg-input/30" }));
    }
    switch (filter.variant) {
        case 'text':
        case 'number':
        case 'range': {
            if ((filter.variant === 'range' && filter.operator === 'isBetween') ||
                filter.operator === 'isBetween') {
                return (_jsx(DataTableRangeFilter, { filter: filter, column: column, inputId: inputId, onFilterUpdate: onFilterUpdate }));
            }
            const isNumber = filter.variant === 'number' || filter.variant === 'range';
            return (_jsx(Input, { id: inputId, type: isNumber ? 'number' : filter.variant, "aria-label": `${columnMeta?.label} filter value`, "aria-describedby": `${inputId}-description`, inputMode: isNumber ? 'numeric' : undefined, placeholder: columnMeta?.placeholder ?? 'Enter a value...', className: "h-8 w-full rounded", defaultValue: typeof filter.value === 'string' ? filter.value : undefined, onChange: (event) => onFilterUpdate(filter.filterId, {
                    value: event.target.value,
                }) }));
        }
        case 'boolean': {
            if (Array.isArray(filter.value))
                return null;
            const inputListboxId = `${inputId}-listbox`;
            return (_jsxs(Select, { open: showValueSelector, onOpenChange: setShowValueSelector, value: filter.value, onValueChange: (value) => onFilterUpdate(filter.filterId, {
                    value,
                }), children: [_jsx(SelectTrigger, { id: inputId, "aria-controls": inputListboxId, "aria-label": `${columnMeta?.label} boolean filter`, className: "h-8 w-full rounded [&[data-size]]:h-8", children: _jsx(SelectValue, { placeholder: filter.value ? 'True' : 'False' }) }), _jsxs(SelectContent, { id: inputListboxId, children: [_jsx(SelectItem, { value: "true", children: "True" }), _jsx(SelectItem, { value: "false", children: "False" })] })] }));
        }
        case 'select':
        case 'multiSelect': {
            const inputListboxId = `${inputId}-listbox`;
            const multiple = filter.variant === 'multiSelect';
            const selectedValues = multiple
                ? Array.isArray(filter.value)
                    ? filter.value
                    : []
                : typeof filter.value === 'string'
                    ? filter.value
                    : undefined;
            return (_jsxs(Faceted, { open: showValueSelector, onOpenChange: setShowValueSelector, value: selectedValues, onValueChange: (value) => {
                    onFilterUpdate(filter.filterId, {
                        value,
                    });
                }, multiple: multiple, children: [_jsx(FacetedTrigger, { asChild: true, children: _jsx(Button, { id: inputId, "aria-controls": inputListboxId, "aria-label": `${columnMeta?.label} filter value${multiple ? 's' : ''}`, variant: "outline", size: "sm", className: "w-full rounded font-normal", children: _jsx(FacetedBadgeList, { options: columnMeta?.options, placeholder: columnMeta?.placeholder ??
                                    `Select option${multiple ? 's' : ''}...` }) }) }), _jsxs(FacetedContent, { id: inputListboxId, className: "w-[200px] origin-[var(--radix-popover-content-transform-origin)]", children: [_jsx(FacetedInput, { "aria-label": `Search ${columnMeta?.label} options`, placeholder: columnMeta?.placeholder ?? 'Search options...' }), _jsxs(FacetedList, { children: [_jsx(FacetedEmpty, { children: "No options found." }), _jsx(FacetedGroup, { children: columnMeta?.options?.map((option) => (_jsxs(FacetedItem, { value: option.value, children: [option.icon && _jsx(option.icon, {}), _jsx("span", { children: option.label }), option.count && (_jsx("span", { className: "ml-auto font-mono text-xs", children: option.count }))] }, option.value))) })] })] })] }));
        }
        case 'date':
        case 'dateRange': {
            const inputListboxId = `${inputId}-listbox`;
            const dateValue = Array.isArray(filter.value)
                ? filter.value.filter(Boolean)
                : [filter.value, filter.value].filter(Boolean);
            const displayValue = filter.operator === 'isBetween' && dateValue.length === 2
                ? `${formatDate(new Date(Number(dateValue[0])))} - ${formatDate(new Date(Number(dateValue[1])))}`
                : dateValue[0]
                    ? formatDate(new Date(Number(dateValue[0])))
                    : 'Pick a date';
            return (_jsxs(Popover, { open: showValueSelector, onOpenChange: setShowValueSelector, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { id: inputId, "aria-controls": inputListboxId, "aria-label": `${columnMeta?.label} date filter`, variant: "outline", size: "sm", className: cn('w-full justify-start rounded text-left font-normal', !filter.value && 'text-muted-foreground'), children: [_jsx(CalendarIcon, {}), _jsx("span", { className: "truncate", children: displayValue })] }) }), _jsx(PopoverContent, { id: inputListboxId, align: "start", className: "w-auto origin-[var(--radix-popover-content-transform-origin)] p-0", children: filter.operator === 'isBetween' ? (_jsx(Calendar, { "aria-label": `Select ${columnMeta?.label} date range`, mode: "range", initialFocus: true, selected: dateValue.length === 2
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
                                            (date.from?.getTime() ?? '').toString(),
                                            (date.to?.getTime() ?? '').toString(),
                                        ]
                                        : [],
                                });
                            } })) : (_jsx(Calendar, { "aria-label": `Select ${columnMeta?.label} date`, mode: "single", initialFocus: true, selected: dateValue[0] ? new Date(Number(dateValue[0])) : undefined, onSelect: (date) => {
                                onFilterUpdate(filter.filterId, {
                                    value: (date?.getTime() ?? '').toString(),
                                });
                            } })) })] }));
        }
        default:
            return null;
    }
}
//# sourceMappingURL=data-table-filter-list.js.map