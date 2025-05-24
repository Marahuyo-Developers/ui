'use client';
import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from 'react/jsx-runtime';
import { Check, PlusCircle, XCircle } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../../components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../../components/ui/popover';
import { Separator } from '../../components/ui/separator';
import { cn } from '../../lib/utils';
import * as React from 'react';
export function DataTableFacetedFilter({ column, title, options, multiple }) {
  const [open, setOpen] = React.useState(false);
  const columnFilterValue = column?.getFilterValue();
  const selectedValues = new Set(
    Array.isArray(columnFilterValue) ? columnFilterValue : [],
  );
  const onItemSelect = React.useCallback(
    (option, isSelected) => {
      if (!column) return;
      if (multiple) {
        const newSelectedValues = new Set(selectedValues);
        if (isSelected) {
          newSelectedValues.delete(option.value);
        } else {
          newSelectedValues.add(option.value);
        }
        const filterValues = Array.from(newSelectedValues);
        column.setFilterValue(filterValues.length ? filterValues : undefined);
      } else {
        column.setFilterValue(isSelected ? undefined : [option.value]);
        setOpen(false);
      }
    },
    [column, multiple, selectedValues],
  );
  const onReset = React.useCallback(
    (event) => {
      event?.stopPropagation();
      column?.setFilterValue(undefined);
    },
    [column],
  );
  return _jsxs(Popover, {
    open: open,
    onOpenChange: setOpen,
    children: [
      _jsx(PopoverTrigger, {
        asChild: true,
        children: _jsxs(Button, {
          variant: 'outline',
          size: 'sm',
          className: 'border-dashed',
          children: [
            selectedValues?.size > 0
              ? _jsx('div', {
                  role: 'button',
                  'aria-label': `Clear ${title} filter`,
                  tabIndex: 0,
                  onClick: onReset,
                  className:
                    'rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
                  children: _jsx(XCircle, {}),
                })
              : _jsx(PlusCircle, {}),
            title,
            selectedValues?.size > 0 &&
              _jsxs(_Fragment, {
                children: [
                  _jsx(Separator, {
                    orientation: 'vertical',
                    className: 'mx-0.5 data-[orientation=vertical]:h-4',
                  }),
                  _jsx(Badge, {
                    variant: 'secondary',
                    className: 'rounded-sm px-1 font-normal lg:hidden',
                    children: selectedValues.size,
                  }),
                  _jsx('div', {
                    className: 'hidden items-center gap-1 lg:flex',
                    children:
                      selectedValues.size > 2
                        ? _jsxs(Badge, {
                            variant: 'secondary',
                            className: 'rounded-sm px-1 font-normal',
                            children: [selectedValues.size, ' selected'],
                          })
                        : options
                            .filter((option) =>
                              selectedValues.has(option.value),
                            )
                            .map((option) =>
                              _jsx(
                                Badge,
                                {
                                  variant: 'secondary',
                                  className: 'rounded-sm px-1 font-normal',
                                  children: option.label,
                                },
                                option.value,
                              ),
                            ),
                  }),
                ],
              }),
          ],
        }),
      }),
      _jsx(PopoverContent, {
        className: 'w-[12.5rem] p-0',
        align: 'start',
        children: _jsxs(Command, {
          children: [
            _jsx(CommandInput, { placeholder: title }),
            _jsxs(CommandList, {
              className: 'max-h-full',
              children: [
                _jsx(CommandEmpty, { children: 'No results found.' }),
                _jsx(CommandGroup, {
                  className:
                    'max-h-[18.75rem] overflow-y-auto overflow-x-hidden',
                  children: options.map((option) => {
                    const isSelected = selectedValues.has(option.value);
                    return _jsxs(
                      CommandItem,
                      {
                        onSelect: () => onItemSelect(option, isSelected),
                        children: [
                          _jsx('div', {
                            className: cn(
                              'flex size-4 items-center justify-center rounded-sm border border-primary',
                              isSelected
                                ? 'bg-primary'
                                : 'opacity-50 [&_svg]:invisible',
                            ),
                            children: _jsx(Check, {}),
                          }),
                          option.icon && _jsx(option.icon, {}),
                          _jsx('span', {
                            className: 'truncate',
                            children: option.label,
                          }),
                          option.count &&
                            _jsx('span', {
                              className: 'ml-auto font-mono text-xs',
                              children: option.count,
                            }),
                        ],
                      },
                      option.value,
                    );
                  }),
                }),
                selectedValues.size > 0 &&
                  _jsxs(_Fragment, {
                    children: [
                      _jsx(CommandSeparator, {}),
                      _jsx(CommandGroup, {
                        children: _jsx(CommandItem, {
                          onSelect: () => onReset(),
                          className: 'justify-center text-center',
                          children: 'Clear filters',
                        }),
                      }),
                    ],
                  }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
//# sourceMappingURL=data-table-faceted-filter.js.map
