'use client';
import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { X } from 'lucide-react';
import * as React from 'react';
import { DataTableDateFilter } from '../../components/data-table/data-table-date-filter';
import { DataTableFacetedFilter } from '../../components/data-table/data-table-faceted-filter';
import { DataTableSliderFilter } from '../../components/data-table/data-table-slider-filter';
import { DataTableViewOptions } from '../../components/data-table/data-table-view-options';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { cn } from '../../lib/utils';
export function DataTableToolbar({ table, children, className, ...props }) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const columns = React.useMemo(
    () => table.getAllColumns().filter((column) => column.getCanFilter()),
    [table],
  );
  const onReset = React.useCallback(() => {
    table.resetColumnFilters();
  }, [table]);
  return _jsxs('div', {
    role: 'toolbar',
    'aria-orientation': 'horizontal',
    className: cn(
      'flex w-full items-start justify-between gap-2 p-1',
      className,
    ),
    ...props,
    children: [
      _jsxs('div', {
        className: 'flex flex-1 flex-wrap items-center gap-2',
        children: [
          columns.map((column) =>
            _jsx(DataTableToolbarFilter, { column: column }, column.id),
          ),
          isFiltered &&
            _jsxs(Button, {
              'aria-label': 'Reset filters',
              variant: 'outline',
              size: 'sm',
              className: 'border-dashed',
              onClick: onReset,
              children: [_jsx(X, {}), 'Reset'],
            }),
        ],
      }),
      _jsxs('div', {
        className: 'flex items-center gap-2',
        children: [children, _jsx(DataTableViewOptions, { table: table })],
      }),
    ],
  });
}
function DataTableToolbarFilter({ column }) {
  {
    const columnMeta = column.columnDef.meta;
    const onFilterRender = React.useCallback(() => {
      if (!columnMeta?.variant) return null;
      switch (columnMeta.variant) {
        case 'text':
          return _jsx(Input, {
            placeholder: columnMeta.placeholder ?? columnMeta.label,
            value: column.getFilterValue() ?? '',
            onChange: (event) => column.setFilterValue(event.target.value),
            className: 'h-8 w-40 lg:w-56',
          });
        case 'number':
          return _jsxs('div', {
            className: 'relative',
            children: [
              _jsx(Input, {
                type: 'number',
                inputMode: 'numeric',
                placeholder: columnMeta.placeholder ?? columnMeta.label,
                value: column.getFilterValue() ?? '',
                onChange: (event) => column.setFilterValue(event.target.value),
                className: cn('h-8 w-[120px]', columnMeta.unit && 'pr-8'),
              }),
              columnMeta.unit &&
                _jsx('span', {
                  className:
                    'absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm',
                  children: columnMeta.unit,
                }),
            ],
          });
        case 'range':
          return _jsx(DataTableSliderFilter, {
            column: column,
            title: columnMeta.label ?? column.id,
          });
        case 'date':
        case 'dateRange':
          return _jsx(DataTableDateFilter, {
            column: column,
            title: columnMeta.label ?? column.id,
            multiple: columnMeta.variant === 'dateRange',
          });
        case 'select':
        case 'multiSelect':
          return _jsx(DataTableFacetedFilter, {
            column: column,
            title: columnMeta.label ?? column.id,
            options: columnMeta.options ?? [],
            multiple: columnMeta.variant === 'multiSelect',
          });
        default:
          return null;
      }
    }, [column, columnMeta]);
    return onFilterRender();
  }
}
//# sourceMappingURL=data-table-toolbar.js.map
