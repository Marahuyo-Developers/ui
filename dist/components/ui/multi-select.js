import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
import { cva } from 'class-variance-authority';
import { CheckIcon, XCircle, ChevronDown, XIcon, WandSparkles, } from 'lucide-react';
import { cn } from '../../lib/utils';
import { Separator } from './separator';
import { Button } from './button';
import { Badge } from './badge';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, } from './command';
/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva('m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300', {
    variants: {
        variant: {
            default: 'border-foreground/10 text-foreground bg-card hover:bg-card/80',
            secondary: 'border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80',
            destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
            inverted: 'inverted',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});
export const MultiSelect = React.forwardRef(({ options, onValueChange, variant, defaultValue = [], placeholder = 'Select options', animation = 0, maxCount = 3, modalPopover = false, asChild = false, className, ...props }, ref) => {
    const [selectedValues, setSelectedValues] = React.useState(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const handleInputKeyDown = (event) => {
        if (event.key === 'Enter') {
            setIsPopoverOpen(true);
        }
        else if (event.key === 'Backspace' && !event.currentTarget.value) {
            const newSelectedValues = [...selectedValues];
            newSelectedValues.pop();
            setSelectedValues(newSelectedValues);
            onValueChange(newSelectedValues);
        }
    };
    const toggleOption = (option) => {
        const newSelectedValues = selectedValues.includes(option)
            ? selectedValues.filter((value) => value !== option)
            : [...selectedValues, option];
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
    };
    const handleClear = () => {
        setSelectedValues([]);
        onValueChange([]);
    };
    const handleTogglePopover = () => {
        setIsPopoverOpen((prev) => !prev);
    };
    const clearExtraOptions = () => {
        const newSelectedValues = selectedValues.slice(0, maxCount);
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
    };
    const toggleAll = () => {
        if (selectedValues.length === options.length) {
            handleClear();
        }
        else {
            const allValues = options.map((option) => option.value);
            setSelectedValues(allValues);
            onValueChange(allValues);
        }
    };
    return (_jsxs(Popover, { open: isPopoverOpen, onOpenChange: setIsPopoverOpen, modal: modalPopover, children: [_jsx(PopoverTrigger, { asChild: true, children: _jsx(Button, { ref: ref, ...props, onClick: handleTogglePopover, className: cn('flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit [&_svg]:pointer-events-auto', className), children: selectedValues.length > 0 ? (_jsxs("div", { className: "flex justify-between items-center w-full", children: [_jsxs("div", { className: "flex flex-wrap items-center", children: [selectedValues.slice(0, maxCount).map((value) => {
                                        const option = options.find((o) => o.value === value);
                                        const IconComponent = option?.icon;
                                        return (_jsxs(Badge, { className: cn(multiSelectVariants({ variant })), children: [IconComponent && (_jsx(IconComponent, { className: "h-4 w-4 mr-2" })), option?.label, _jsx(XCircle, { className: "ml-2 h-4 w-4 cursor-pointer", onClick: (event) => {
                                                        event.stopPropagation();
                                                        toggleOption(value);
                                                    } })] }, value));
                                    }), selectedValues.length > maxCount && (_jsxs(Badge, { className: cn('bg-transparent text-foreground border-foreground/1 hover:bg-transparent', multiSelectVariants({ variant })), children: [`+ ${selectedValues.length - maxCount} more`, _jsx(XCircle, { className: "ml-2 h-4 w-4 cursor-pointer", onClick: (event) => {
                                                    event.stopPropagation();
                                                    clearExtraOptions();
                                                } })] }))] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(XIcon, { className: "h-4 mx-2 cursor-pointer text-muted-foreground", onClick: (event) => {
                                            event.stopPropagation();
                                            handleClear();
                                        } }), _jsx(Separator, { orientation: "vertical", className: "flex min-h-6 h-full" }), _jsx(ChevronDown, { className: "h-4 mx-2 cursor-pointer text-muted-foreground" })] })] })) : (_jsxs("div", { className: "flex items-center justify-between w-full mx-auto", children: [_jsx("span", { className: "text-sm text-muted-foreground mx-3", children: placeholder }), _jsx(ChevronDown, { className: "h-4 cursor-pointer text-muted-foreground mx-2" })] })) }) }), _jsx(PopoverContent, { className: "w-auto p-0", align: "start", onEscapeKeyDown: () => setIsPopoverOpen(false), children: _jsxs(Command, { children: [_jsx(CommandInput, { placeholder: "Search...", onKeyDown: handleInputKeyDown }), _jsxs(CommandList, { children: [_jsx(CommandEmpty, { children: "No results found." }), _jsxs(CommandGroup, { children: [_jsxs(CommandItem, { onSelect: toggleAll, className: "cursor-pointer", children: [_jsx("div", { className: cn('mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary', selectedValues.length === options.length
                                                        ? 'bg-primary text-primary-foreground'
                                                        : 'opacity-50 [&_svg]:invisible'), children: _jsx(CheckIcon, { className: "h-4 w-4" }) }), _jsx("span", { children: "(Select All)" })] }, "all"), options.map((option) => {
                                            const isSelected = selectedValues.includes(option.value);
                                            return (_jsxs(CommandItem, { onSelect: () => toggleOption(option.value), className: "cursor-pointer", children: [_jsx("div", { className: cn('mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary', isSelected
                                                            ? 'bg-primary text-primary-foreground'
                                                            : 'opacity-50 [&_svg]:invisible'), children: _jsx(CheckIcon, { className: "h-4 w-4" }) }), option.icon && (_jsx(option.icon, { className: "mr-2 h-4 w-4 text-muted-foreground" })), _jsx("span", { children: option.label })] }, option.value));
                                        })] }), _jsx(CommandSeparator, {}), _jsx(CommandGroup, { children: _jsxs("div", { className: "flex items-center justify-between", children: [selectedValues.length > 0 && (_jsxs(_Fragment, { children: [_jsx(CommandItem, { onSelect: handleClear, className: "flex-1 justify-center cursor-pointer", children: "Clear" }), _jsx(Separator, { orientation: "vertical", className: "flex min-h-6 h-full" })] })), _jsx(CommandItem, { onSelect: () => setIsPopoverOpen(false), className: "flex-1 justify-center cursor-pointer max-w-full", children: "Close" })] }) })] })] }) }), animation > 0 && selectedValues.length > 0 && (_jsx(WandSparkles, { className: cn('cursor-pointer my-2 text-foreground bg-background w-3 h-3', isAnimating ? '' : 'text-muted-foreground'), onClick: () => setIsAnimating(!isAnimating) }))] }));
});
MultiSelect.displayName = 'MultiSelect';
//# sourceMappingURL=multi-select.js.map