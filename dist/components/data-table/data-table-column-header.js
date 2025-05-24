'use client';
import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from 'react/jsx-runtime';
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  EyeOff,
  X,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
import { cn } from '../../lib/utils';
export function DataTableColumnHeader({ column, title, className, ...props }) {
  if (!column.getCanSort() && !column.getCanHide()) {
    return _jsx('div', { className: cn(className), children: title });
  }
  return _jsxs(DropdownMenu, {
    children: [
      _jsxs(DropdownMenuTrigger, {
        className: cn(
          '-ml-1.5 flex h-8 items-center gap-1.5 rounded-md px-2 py-1.5 hover:bg-accent focus:outline-none focus:ring-1 focus:ring-ring data-[state=open]:bg-accent [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground',
          className,
        ),
        ...props,
        children: [
          title,
          column.getCanSort() &&
            (column.getIsSorted() === 'desc'
              ? _jsx(ChevronDown, {})
              : column.getIsSorted() === 'asc'
                ? _jsx(ChevronUp, {})
                : _jsx(ChevronsUpDown, {})),
        ],
      }),
      _jsxs(DropdownMenuContent, {
        align: 'start',
        className: 'w-28',
        children: [
          column.getCanSort() &&
            _jsxs(_Fragment, {
              children: [
                _jsxs(DropdownMenuCheckboxItem, {
                  className:
                    'relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground',
                  checked: column.getIsSorted() === 'asc',
                  onClick: () => column.toggleSorting(false),
                  children: [_jsx(ChevronUp, {}), 'Asc'],
                }),
                _jsxs(DropdownMenuCheckboxItem, {
                  className:
                    'relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground',
                  checked: column.getIsSorted() === 'desc',
                  onClick: () => column.toggleSorting(true),
                  children: [_jsx(ChevronDown, {}), 'Desc'],
                }),
                column.getIsSorted() &&
                  _jsxs(DropdownMenuItem, {
                    className: 'pl-2 [&_svg]:text-muted-foreground',
                    onClick: () => column.clearSorting(),
                    children: [_jsx(X, {}), 'Reset'],
                  }),
              ],
            }),
          column.getCanHide() &&
            _jsxs(DropdownMenuCheckboxItem, {
              className:
                'relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground',
              checked: !column.getIsVisible(),
              onClick: () => column.toggleVisibility(false),
              children: [_jsx(EyeOff, {}), 'Hide'],
            }),
        ],
      }),
    ],
  });
}
//# sourceMappingURL=data-table-column-header.js.map
