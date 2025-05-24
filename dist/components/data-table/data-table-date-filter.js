'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { CalendarIcon, XCircle } from 'lucide-react';
import * as React from 'react';
import { Button } from '../../components/ui/button';
import { Calendar } from '../../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger, } from '../../components/ui/popover';
import { Separator } from '../../components/ui/separator';
import { formatDate } from '../../lib/format';
function getIsDateRange(value) {
    return value && typeof value === 'object' && !Array.isArray(value);
}
function parseAsDate(timestamp) {
    if (!timestamp)
        return undefined;
    const numericTimestamp = typeof timestamp === 'string' ? Number(timestamp) : timestamp;
    const date = new Date(numericTimestamp);
    return !Number.isNaN(date.getTime()) ? date : undefined;
}
function parseColumnFilterValue(value) {
    if (value === null || value === undefined) {
        return [];
    }
    if (Array.isArray(value)) {
        return value.map((item) => {
            if (typeof item === 'number' || typeof item === 'string') {
                return item;
            }
            return undefined;
        });
    }
    if (typeof value === 'string' || typeof value === 'number') {
        return [value];
    }
    return [];
}
export function DataTableDateFilter({ column, title, multiple, }) {
    const columnFilterValue = column.getFilterValue();
    const selectedDates = React.useMemo(() => {
        if (!columnFilterValue) {
            return multiple ? { from: undefined, to: undefined } : [];
        }
        if (multiple) {
            const timestamps = parseColumnFilterValue(columnFilterValue);
            return {
                from: parseAsDate(timestamps[0]),
                to: parseAsDate(timestamps[1]),
            };
        }
        const timestamps = parseColumnFilterValue(columnFilterValue);
        const date = parseAsDate(timestamps[0]);
        return date ? [date] : [];
    }, [columnFilterValue, multiple]);
    const onSelect = React.useCallback((date) => {
        if (!date) {
            column.setFilterValue(undefined);
            return;
        }
        if (multiple && !('getTime' in date)) {
            const from = date.from?.getTime();
            const to = date.to?.getTime();
            column.setFilterValue(from || to ? [from, to] : undefined);
        }
        else if (!multiple && 'getTime' in date) {
            column.setFilterValue(date.getTime());
        }
    }, [column, multiple]);
    const onReset = React.useCallback((event) => {
        event.stopPropagation();
        column.setFilterValue(undefined);
    }, [column]);
    const hasValue = React.useMemo(() => {
        if (multiple) {
            if (!getIsDateRange(selectedDates))
                return false;
            return selectedDates.from || selectedDates.to;
        }
        if (!Array.isArray(selectedDates))
            return false;
        return selectedDates.length > 0;
    }, [multiple, selectedDates]);
    const formatDateRange = React.useCallback((range) => {
        if (!range.from && !range.to)
            return '';
        if (range.from && range.to) {
            return `${formatDate(range.from)} - ${formatDate(range.to)}`;
        }
        return formatDate(range.from ?? range.to);
    }, []);
    const label = React.useMemo(() => {
        if (multiple) {
            if (!getIsDateRange(selectedDates))
                return null;
            const hasSelectedDates = selectedDates.from || selectedDates.to;
            const dateText = hasSelectedDates
                ? formatDateRange(selectedDates)
                : 'Select date range';
            return (_jsxs("span", { className: "flex items-center gap-2", children: [_jsx("span", { children: title }), hasSelectedDates && (_jsxs(_Fragment, { children: [_jsx(Separator, { orientation: "vertical", className: "mx-0.5 data-[orientation=vertical]:h-4" }), _jsx("span", { children: dateText })] }))] }));
        }
        if (getIsDateRange(selectedDates))
            return null;
        const hasSelectedDate = selectedDates.length > 0;
        const dateText = hasSelectedDate
            ? formatDate(selectedDates[0])
            : 'Select date';
        return (_jsxs("span", { className: "flex items-center gap-2", children: [_jsx("span", { children: title }), hasSelectedDate && (_jsxs(_Fragment, { children: [_jsx(Separator, { orientation: "vertical", className: "mx-0.5 data-[orientation=vertical]:h-4" }), _jsx("span", { children: dateText })] }))] }));
    }, [selectedDates, multiple, formatDateRange, title]);
    return (_jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", size: "sm", className: "border-dashed", children: [hasValue ? (_jsx("div", { role: "button", "aria-label": `Clear ${title} filter`, tabIndex: 0, onClick: onReset, className: "rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring", children: _jsx(XCircle, {}) })) : (_jsx(CalendarIcon, {})), label] }) }), _jsx(PopoverContent, { className: "w-auto p-0", align: "start", children: multiple ? (_jsx(Calendar, { initialFocus: true, mode: "range", selected: getIsDateRange(selectedDates)
                        ? selectedDates
                        : { from: undefined, to: undefined }, onSelect: onSelect })) : (_jsx(Calendar, { initialFocus: true, mode: "single", selected: !getIsDateRange(selectedDates) ? selectedDates[0] : undefined, onSelect: onSelect })) })] }));
}
//# sourceMappingURL=data-table-date-filter.js.map