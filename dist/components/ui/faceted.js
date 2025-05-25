'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Check, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import { Badge } from '../../components/ui/badge';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, } from '../../components/ui/command';
import { Popover, PopoverContent, PopoverTrigger, } from '../../components/ui/popover';
import { cn } from '../../lib/utils';
const FacetedContext = React.createContext(null);
function useFacetedContext(name) {
    const context = React.useContext(FacetedContext);
    if (!context) {
        throw new Error(`\`${name}\` must be within Faceted`);
    }
    return context;
}
function Faceted(props) {
    const { open: openProp, onOpenChange: onOpenChangeProp, value, onValueChange, children, multiple = false, ...facetedProps } = props;
    const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
    const isControlled = openProp !== undefined;
    const open = isControlled ? openProp : uncontrolledOpen;
    const onOpenChange = React.useCallback((newOpen) => {
        if (!isControlled) {
            setUncontrolledOpen(newOpen);
        }
        onOpenChangeProp?.(newOpen);
    }, [isControlled, onOpenChangeProp]);
    const onItemSelect = React.useCallback((selectedValue) => {
        if (!onValueChange)
            return;
        if (multiple) {
            const currentValue = (Array.isArray(value) ? value : []);
            const newValue = currentValue.includes(selectedValue)
                ? currentValue.filter((v) => v !== selectedValue)
                : [...currentValue, selectedValue];
            onValueChange(newValue);
        }
        else {
            if (value === selectedValue) {
                onValueChange(undefined);
            }
            else {
                onValueChange(selectedValue);
            }
            requestAnimationFrame(() => onOpenChange(false));
        }
    }, [multiple, value, onValueChange, onOpenChange]);
    const contextValue = React.useMemo(() => ({ value, onItemSelect, multiple }), [value, onItemSelect, multiple]);
    return (_jsx(FacetedContext.Provider, { value: contextValue, children: _jsx(Popover, { open: open, onOpenChange: onOpenChange, ...facetedProps, children: children }) }));
}
function FacetedTrigger(props) {
    const { className, children, ...triggerProps } = props;
    return (_jsx(PopoverTrigger, { ...triggerProps, className: cn('justify-between text-left', className), children: children }));
}
function FacetedBadgeList(props) {
    const { options = [], max = 2, placeholder = 'Select options...', className, badgeClassName, ...badgeListProps } = props;
    const context = useFacetedContext('FacetedBadgeList');
    const values = Array.isArray(context.value)
        ? context.value
        : [context.value].filter(Boolean);
    const getLabel = React.useCallback((value) => {
        const option = options.find((opt) => opt.value === value);
        return option?.label ?? value;
    }, [options]);
    if (!values || values.length === 0) {
        return (_jsxs("div", { ...badgeListProps, className: "flex w-full items-center gap-1 text-muted-foreground", children: [placeholder, _jsx(ChevronsUpDown, { className: "ml-auto size-4 shrink-0 opacity-50" })] }));
    }
    return (_jsx("div", { ...badgeListProps, className: cn('flex flex-wrap items-center gap-1', className), children: values.length > max ? (_jsxs(Badge, { variant: "secondary", className: cn('rounded-sm px-1 font-normal', badgeClassName), children: [values.length, " selected"] })) : (values.map((value) => (_jsx(Badge, { variant: "secondary", className: cn('rounded-sm px-1 font-normal', badgeClassName), children: _jsx("span", { className: "truncate", children: getLabel(value) }) }, value)))) }));
}
function FacetedContent(props) {
    const { className, children, ...contentProps } = props;
    return (_jsx(PopoverContent, { ...contentProps, align: "start", className: cn('w-[200px] origin-(--radix-popover-content-transform-origin) p-0', className), children: _jsx(Command, { children: children }) }));
}
const FacetedInput = CommandInput;
const FacetedList = CommandList;
const FacetedEmpty = CommandEmpty;
const FacetedGroup = CommandGroup;
function FacetedItem(props) {
    const { value, onSelect, className, children, ...itemProps } = props;
    const context = useFacetedContext('FacetedItem');
    const isSelected = context.multiple
        ? Array.isArray(context.value) && context.value.includes(value)
        : context.value === value;
    const onItemSelect = React.useCallback((currentValue) => {
        if (onSelect) {
            onSelect(currentValue);
        }
        else if (context.onItemSelect) {
            context.onItemSelect(currentValue);
        }
    }, [onSelect, context.onItemSelect]);
    return (_jsxs(CommandItem, { "aria-selected": isSelected, "data-selected": isSelected, className: cn('gap-2', className), onSelect: () => onItemSelect(value), ...itemProps, children: [_jsx("span", { className: cn('flex size-4 items-center justify-center rounded-sm border border-primary', isSelected
                    ? 'bg-primary text-primary-foreground'
                    : 'opacity-50 [&_svg]:invisible'), children: _jsx(Check, { className: "size-4" }) }), children] }));
}
const FacetedSeparator = CommandSeparator;
export { Faceted, FacetedBadgeList, FacetedContent, FacetedEmpty, FacetedGroup, FacetedInput, FacetedItem, FacetedList, FacetedSeparator, FacetedTrigger, };
//# sourceMappingURL=faceted.js.map