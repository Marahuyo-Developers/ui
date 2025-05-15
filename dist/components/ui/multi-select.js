import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, {} from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Primitive } from '@radix-ui/react-primitive';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { Check, X } from 'lucide-react';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, } from '@/components/ui/command';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from '@/components/ui/tooltip';
const MultiSelectContext = React.createContext(undefined);
const useMultiSelect = () => {
    const context = React.useContext(MultiSelectContext);
    if (!context) {
        throw new Error('useMultiSelect must be used within MultiSelectProvider');
    }
    return context;
};
const MultiSelect = ({ value: valueProp, onValueChange: onValueChangeProp, onDeselect: onDeselectProp, onSelect: onSelectProp, defaultValue, open: openProp, onOpenChange, defaultOpen, onSearch, filter, disabled, maxCount, ...popoverProps }) => {
    const itemCache = React.useRef(new Map()).current;
    const handleValueChange = React.useCallback((state) => {
        if (onValueChangeProp) {
            const items = state.map((value) => itemCache.get(value));
            onValueChangeProp(state, items);
        }
    }, [onValueChangeProp]);
    const [value, setValue] = useControllableState({
        prop: valueProp,
        defaultProp: defaultValue || [],
        onChange: handleValueChange,
    });
    const [open, setOpen] = useControllableState({
        prop: openProp,
        defaultProp: defaultOpen || false,
        onChange: onOpenChange,
    });
    const handleSelect = React.useCallback((value, item) => {
        setValue((prev) => {
            if (prev?.includes(value)) {
                return prev;
            }
            onSelectProp?.(value, item);
            return prev ? [...prev, value] : [value];
        });
    }, [onSelectProp, setValue]);
    const handleDeselect = React.useCallback((value, item) => {
        setValue((prev) => {
            if (!prev || !prev.includes(value)) {
                return prev;
            }
            onDeselectProp?.(value, item);
            return prev.filter((v) => v !== value);
        });
    }, [onDeselectProp, setValue]);
    const contextValue = React.useMemo(() => {
        return {
            value: value || [],
            open: open || false,
            onSearch,
            filter,
            disabled,
            maxCount,
            onSelect: handleSelect,
            onDeselect: handleDeselect,
            itemCache,
        };
    }, [
        value,
        open,
        onSearch,
        filter,
        disabled,
        maxCount,
        handleSelect,
        handleDeselect,
    ]);
    return (_jsx(MultiSelectContext.Provider, { value: contextValue, children: _jsx(PopoverPrimitive.Root, { ...popoverProps, open: open, onOpenChange: setOpen }) }));
};
MultiSelect.displayName = 'MultiSelect';
const PreventClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
};
const MultiSelectTrigger = React.forwardRef(({ className, children, ...props }, forwardedRef) => {
    const { disabled } = useMultiSelect();
    return (_jsx(PopoverPrimitive.Trigger, { ref: forwardedRef, asChild: true, children: _jsxs("div", { "aria-disabled": disabled, "data-disabled": disabled, ...props, className: cn('flex min-h-10 size-full items-center justify-between whitespace-nowrap rounded-sm border border-input border-dashed bg-transparent px-3 py-2 shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring [&>span]:line-clamp-1 text-base', disabled ? 'cursor-not-allowed opacity-50' : 'cursor-text', className), onClick: disabled ? PreventClick : props.onClick, onTouchStart: disabled ? PreventClick : props.onTouchStart, children: [children, _jsx(CaretSortIcon, { className: "size-4 opacity-50" })] }) }));
});
MultiSelectTrigger.displayName = 'MultiSelectTrigger';
const MultiSelectValue = React.forwardRef(({ className, placeholder, maxDisplay, maxItemLength, ...props }, forwardRef) => {
    const { value, itemCache, onDeselect } = useMultiSelect();
    const [firstRendered, setFirstRendered] = React.useState(false);
    const renderRemain = maxDisplay && value.length > maxDisplay ? value.length - maxDisplay : 0;
    const renderItems = renderRemain ? value.slice(0, maxDisplay) : value;
    React.useLayoutEffect(() => {
        setFirstRendered(true);
    }, []);
    if (!value.length || !firstRendered) {
        return (_jsx("span", { className: "pointer-events-none text-muted-foreground", children: placeholder }));
    }
    return (_jsx(TooltipProvider, { delayDuration: 300, children: _jsxs("div", { className: cn('flex flex-1 overflow-x-hidden flex-wrap items-center gap-1.5', className), ...props, ref: forwardRef, children: [renderItems.map((value) => {
                    const item = itemCache.get(value);
                    const content = item?.label || value;
                    const child = maxItemLength &&
                        typeof content === 'string' &&
                        content.length > maxItemLength
                        ? `${content.slice(0, maxItemLength)}...`
                        : content;
                    const el = (_jsxs(Badge, { variant: "outline", className: "pr-1.5 group/multi-select-badge cursor-pointer rounded-full py-0.5", onClick: (e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDeselect(value, item);
                        }, children: [_jsx("span", { children: child }), _jsx(X, { className: "size-3 ml-1.5 text-muted-foreground group-hover/multi-select-badge:text-foreground" })] }, value));
                    if (child !== content) {
                        return (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { className: "inline-flex", children: el }), _jsx(TooltipContent, { side: "bottom", align: "start", className: "z-[51]", children: content })] }, value));
                    }
                    return el;
                }), renderRemain ? (_jsxs("span", { className: "text-muted-foreground text-xs leading-4 py-.5", children: ["+", renderRemain] })) : null] }) }));
});
MultiSelectValue.displayName = 'MultiSelectValue';
const MultiSelectSearch = React.forwardRef((props, ref) => {
    const { onSearch } = useMultiSelect();
    return _jsx(CommandInput, { ref: ref, ...props, onValueChange: onSearch });
});
MultiSelectSearch.displayName = 'MultiSelectSearch';
const MultiSelectList = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx(CommandList, { ref: ref, className: cn('py-1 px-0 max-h-[unset]', className), ...props }));
});
MultiSelectList.displayName = 'MultiSelectList';
const MultiSelectContent = React.forwardRef(({ className, children, ...props }, ref) => {
    const context = useMultiSelect();
    const fragmentRef = React.useRef(document.createDocumentFragment());
    if (!context.open) {
        return fragmentRef.current
            ? createPortal(_jsx(Command, { children: children }), fragmentRef.current)
            : null;
    }
    return (_jsx(PopoverPrimitive.Portal, { forceMount: true, children: _jsx(PopoverPrimitive.Content, { ref: ref, align: "start", sideOffset: 4, collisionPadding: 10, className: cn('z-50 w-full rounded-sm border border-dashed bg-popover p-0 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2'), style: {
                '--radix-select-content-transform-origin': 'var(--radix-popper-transform-origin)',
                '--radix-select-content-available-width': 'var(--radix-popper-available-width)',
                '--radix-select-content-available-height': 'var(--radix-popper-available-height)',
                '--radix-select-trigger-width': 'var(--radix-popper-anchor-width)',
                '--radix-select-trigger-height': 'var(--radix-popper-anchor-height)',
            }, ...props, children: _jsx(Command, { className: cn('px-1 max-h-96 w-full min-w-[var(--radix-select-trigger-width)]', className), shouldFilter: !context.onSearch, children: children }) }) }));
});
MultiSelectContent.displayName = 'MultiSelectContent';
const MultiSelectItem = React.forwardRef(({ value, onSelect: onSelectProp, onDeselect: onDeselectProp, children, label, disabled: disabledProp, className, ...props }, forwardedRef) => {
    const { value: contextValue, maxCount, onSelect, onDeselect, itemCache, } = useMultiSelect();
    const item = React.useMemo(() => {
        return value
            ? {
                value,
                label: label || (typeof children === 'string' ? children : undefined),
            }
            : undefined;
    }, [value, label, children]);
    const selected = Boolean(value && contextValue.includes(value));
    React.useEffect(() => {
        if (value) {
            itemCache.set(value, item);
        }
    }, [selected, value, item]);
    const disabled = Boolean(disabledProp ||
        (!selected && maxCount && contextValue.length >= maxCount));
    const handleClick = () => {
        if (selected) {
            onDeselectProp?.(value, item);
            onDeselect(value, item);
        }
        else {
            itemCache.set(value, item);
            onSelectProp?.(value, item);
            onSelect(value, item);
        }
    };
    return (_jsxs(CommandItem, { ...props, value: value, className: cn(disabled && 'text-muted-foreground cursor-not-allowed', className), disabled: disabled, onSelect: !disabled && value ? handleClick : undefined, ref: forwardedRef, children: [_jsx("span", { className: "mr-2 whitespace-nowrap overflow-hidden text-ellipsis", children: children || label || value }), selected ? _jsx(Check, { className: "h-4 w-4 ml-auto shrink-0" }) : null] }));
});
MultiSelectItem.displayName = 'MultiSelectItem';
const MultiSelectGroup = React.forwardRef((props, forwardRef) => {
    return _jsx(CommandGroup, { ...props, ref: forwardRef });
});
MultiSelectGroup.displayName = 'MultiSelectGroup';
const MultiSelectSeparator = React.forwardRef((props, forwardRef) => {
    return _jsx(CommandSeparator, { ...props, ref: forwardRef });
});
MultiSelectSeparator.displayName = 'MultiSelectSeparator';
const MultiSelectEmpty = React.forwardRef(({ children = 'No Content', ...props }, forwardRef) => {
    return (_jsx(CommandEmpty, { ...props, ref: forwardRef, children: children }));
});
MultiSelectEmpty.displayName = 'MultiSelectEmpty';
const renderMultiSelectOptions = (list) => {
    return list.map((option, index) => {
        if ('type' in option) {
            if (option.type === 'separator') {
                return _jsx(MultiSelectSeparator, {}, index);
            }
            return null;
        }
        if ('children' in option) {
            return (_jsx(MultiSelectGroup, { value: option.value, heading: option.heading, children: renderMultiSelectOptions(option.children) }, option.value || index));
        }
        return (_jsx(MultiSelectItem, { ...option, children: option.label }, option.value));
    });
};
export { MultiSelect, MultiSelectTrigger, MultiSelectValue, MultiSelectSearch, MultiSelectContent, MultiSelectList, MultiSelectItem, MultiSelectGroup, MultiSelectSeparator, MultiSelectEmpty, renderMultiSelectOptions, };
//# sourceMappingURL=multi-select.js.map