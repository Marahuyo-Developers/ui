import { jsx as _jsx, jsxs as _jsxs } from 'react/jsx-runtime';
import { cn } from '../../lib/utils';
import { useFieldContext } from '.';
import { Label } from '../ui/label';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';
export default function SingleDateInputField({
  labelProps,
  containerProps,
  calendarProps,
}) {
  const field = useFieldContext();
  return _jsxs('div', {
    className: cn(
      'grid w-full items-center gap-2.5',
      containerProps?.className,
    ),
    ...containerProps,
    children: [
      _jsx(Label, { className: 'pb-1.5', ...labelProps }),
      _jsxs(Popover, {
        children: [
          _jsx(PopoverTrigger, {
            asChild: true,
            className: 'w-full',
            children: _jsxs(Button, {
              variant: 'outline',
              className: cn(
                'w-full pl-3 text-left font-normal',
                !field.state.value && 'text-muted-foreground',
              ),
              children: [
                field.state.value
                  ? format(field.state.value, 'PPP')
                  : _jsx('span', { children: 'Pick a date' }),
                _jsx(CalendarIcon, { className: 'ml-auto h-4 w-4 opacity-50' }),
              ],
            }),
          }),
          _jsx(PopoverContent, {
            className: 'w-auto p-0',
            align: 'start',
            children: _jsx(Calendar, {
              mode: 'single',
              selected: field.state.value,
              //@ts-ignore
              onSelect: (e) => e && field.handleChange(e),
              ...calendarProps,
            }),
          }),
        ],
      }),
    ],
  });
}
//# sourceMappingURL=single-date-input-field.js.map
