'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Popover, PopoverContent, PopoverTrigger, } from '../../components/ui/popover';
import { Separator } from '../../components/ui/separator';
import { Slider } from '../../components/ui/slider';
import { cn } from '../../lib/utils';
import { PlusCircle, XCircle } from 'lucide-react';
function getIsValidRange(value) {
    return (Array.isArray(value) &&
        value.length === 2 &&
        typeof value[0] === 'number' &&
        typeof value[1] === 'number');
}
export function DataTableSliderFilter({ column, title, }) {
    const id = React.useId();
    const columnFilterValue = getIsValidRange(column.getFilterValue())
        ? column.getFilterValue()
        : undefined;
    const defaultRange = column.columnDef.meta?.range;
    const unit = column.columnDef.meta?.unit;
    const { min, max, step } = React.useMemo(() => {
        let minValue = 0;
        let maxValue = 100;
        if (defaultRange && getIsValidRange(defaultRange)) {
            [minValue, maxValue] = defaultRange;
        }
        else {
            const values = column.getFacetedMinMaxValues();
            if (values && Array.isArray(values) && values.length === 2) {
                const [facetMinValue, facetMaxValue] = values;
                if (typeof facetMinValue === 'number' &&
                    typeof facetMaxValue === 'number') {
                    minValue = facetMinValue;
                    maxValue = facetMaxValue;
                }
            }
        }
        const rangeSize = maxValue - minValue;
        const step = rangeSize <= 20
            ? 1
            : rangeSize <= 100
                ? Math.ceil(rangeSize / 20)
                : Math.ceil(rangeSize / 50);
        return { min: minValue, max: maxValue, step };
    }, [column, defaultRange]);
    const range = React.useMemo(() => {
        return columnFilterValue ?? [min, max];
    }, [columnFilterValue, min, max]);
    const formatValue = React.useCallback((value) => {
        return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
    }, []);
    const onFromInputChange = React.useCallback((event) => {
        const numValue = Number(event.target.value);
        if (!Number.isNaN(numValue) && numValue >= min && numValue <= range[1]) {
            column.setFilterValue([numValue, range[1]]);
        }
    }, [column, min, range]);
    const onToInputChange = React.useCallback((event) => {
        const numValue = Number(event.target.value);
        if (!Number.isNaN(numValue) && numValue <= max && numValue >= range[0]) {
            column.setFilterValue([range[0], numValue]);
        }
    }, [column, max, range]);
    const onSliderValueChange = React.useCallback((value) => {
        if (Array.isArray(value) && value.length === 2) {
            column.setFilterValue(value);
        }
    }, [column]);
    const onReset = React.useCallback((event) => {
        if (event.target instanceof HTMLDivElement) {
            event.stopPropagation();
        }
        column.setFilterValue(undefined);
    }, [column]);
    return (_jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", size: "sm", className: "border-dashed", children: [columnFilterValue ? (_jsx("div", { role: "button", "aria-label": `Clear ${title} filter`, tabIndex: 0, className: "rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring", onClick: onReset, children: _jsx(XCircle, {}) })) : (_jsx(PlusCircle, {})), _jsx("span", { children: title }), columnFilterValue ? (_jsxs(_Fragment, { children: [_jsx(Separator, { orientation: "vertical", className: "mx-0.5 data-[orientation=vertical]:h-4" }), formatValue(columnFilterValue[0]), " -", ' ', formatValue(columnFilterValue[1]), unit ? ` ${unit}` : ''] })) : null] }) }), _jsxs(PopoverContent, { align: "start", className: "flex w-auto flex-col gap-4", children: [_jsxs("div", { className: "flex flex-col gap-3", children: [_jsx("p", { className: "font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", children: title }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Label, { htmlFor: `${id}-from`, className: "sr-only", children: "From" }), _jsxs("div", { className: "relative", children: [_jsx(Input, { id: `${id}-from`, type: "number", "aria-valuemin": min, "aria-valuemax": max, inputMode: "numeric", pattern: "[0-9]*", placeholder: min.toString(), min: min, max: max, value: range[0]?.toString(), onChange: onFromInputChange, className: cn('h-8 w-24', unit && 'pr-8') }), unit && (_jsx("span", { className: "absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm", children: unit }))] }), _jsx(Label, { htmlFor: `${id}-to`, className: "sr-only", children: "to" }), _jsxs("div", { className: "relative", children: [_jsx(Input, { id: `${id}-to`, type: "number", "aria-valuemin": min, "aria-valuemax": max, inputMode: "numeric", pattern: "[0-9]*", placeholder: max.toString(), min: min, max: max, value: range[1]?.toString(), onChange: onToInputChange, className: cn('h-8 w-24', unit && 'pr-8') }), unit && (_jsx("span", { className: "absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm", children: unit }))] })] }), _jsxs(Label, { htmlFor: `${id}-slider`, className: "sr-only", children: [title, " slider"] }), _jsx(Slider, { id: `${id}-slider`, min: min, max: max, step: step, value: range, onValueChange: onSliderValueChange })] }), _jsx(Button, { "aria-label": `Clear ${title} filter`, variant: "outline", size: "sm", onClick: onReset, children: "Clear" })] })] }));
}
//# sourceMappingURL=data-table-slider-filter.js.map