'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '../../components/ui/button';
import { Separator } from '../../components/ui/separator';
import { Tooltip, TooltipContent, TooltipTrigger, } from '../../components/ui/tooltip';
import { cn } from '../../lib/utils';
import { Loader, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
function DataTableActionBar({ table, visible: visibleProp, container: containerProp, children, className, ...props }) {
    const [mounted, setMounted] = React.useState(false);
    React.useLayoutEffect(() => {
        setMounted(true);
    }, []);
    React.useEffect(() => {
        function onKeyDown(event) {
            if (event.key === 'Escape') {
                table.toggleAllRowsSelected(false);
            }
        }
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [table]);
    const container = containerProp ?? (mounted ? globalThis.document?.body : null);
    if (!container)
        return null;
    const visible = visibleProp ?? table.getFilteredSelectedRowModel().rows.length > 0;
    return ReactDOM.createPortal(_jsx(AnimatePresence, { children: visible && (_jsx(motion.div, { role: "toolbar", "aria-orientation": "horizontal", initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 20 }, transition: { duration: 0.2, ease: 'easeInOut' }, className: cn('fixed inset-x-0 bottom-6 z-50 mx-auto flex w-fit flex-wrap items-center justify-center gap-2 rounded-md border bg-background p-2 text-foreground shadow-sm', className), ...props, children: children })) }), container);
}
function DataTableActionBarAction({ size = 'sm', tooltip, isPending, disabled, className, children, ...props }) {
    const trigger = (_jsx(Button, { variant: "secondary", size: size, className: cn('gap-1.5 border border-secondary bg-secondary/50 hover:bg-secondary/70 [&>svg]:size-3.5', size === 'icon' ? 'size-7' : 'h-7', className), disabled: disabled || isPending, ...props, children: isPending ? _jsx(Loader, { className: "animate-spin" }) : children }));
    if (!tooltip)
        return trigger;
    return (_jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: trigger }), _jsx(TooltipContent, { sideOffset: 6, className: "border bg-accent font-semibold text-foreground dark:bg-zinc-900 [&>span]:hidden", children: _jsx("p", { children: tooltip }) })] }));
}
function DataTableActionBarSelection({ table, }) {
    const onClearSelection = React.useCallback(() => {
        table.toggleAllRowsSelected(false);
    }, [table]);
    return (_jsxs("div", { className: "flex h-7 items-center rounded-md border pr-1 pl-2.5", children: [_jsxs("span", { className: "whitespace-nowrap text-xs", children: [table.getFilteredSelectedRowModel().rows.length, " selected"] }), _jsx(Separator, { orientation: "vertical", className: "mr-1 ml-2 data-[orientation=vertical]:h-4" }), _jsxs(Tooltip, { children: [_jsx(TooltipTrigger, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "size-5", onClick: onClearSelection, children: _jsx(X, { className: "size-3.5" }) }) }), _jsxs(TooltipContent, { sideOffset: 10, className: "flex items-center gap-2 border bg-accent px-2 py-1 font-semibold text-foreground dark:bg-zinc-900 [&>span]:hidden", children: [_jsx("p", { children: "Clear selection" }), _jsx("kbd", { className: "select-none rounded border bg-background px-1.5 py-px font-mono font-normal text-[0.7rem] text-foreground shadow-xs", children: _jsx("abbr", { title: "Escape", className: "no-underline", children: "Esc" }) })] })] })] }));
}
export { DataTableActionBar, DataTableActionBarAction, DataTableActionBarSelection, };
//# sourceMappingURL=data-table-action-bar.js.map