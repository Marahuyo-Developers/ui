import { cn } from '@/lib/utils';
import { useFieldContext } from '.';
import { Label } from '../ui/label';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { Button } from '../ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';
import type { DayPicker } from 'react-day-picker';
import type { DayPickerSingleProps } from 'react-day-picker';

export default function SingleDateInputField({
  labelProps,
  containerProps,
  calendarProps,
}: {
  labelProps?: React.ComponentProps<'label'>;
  containerProps?: React.ComponentProps<'div'>;
  calendarProps?: React.ComponentProps<typeof DayPicker & DayPickerSingleProps>;
}) {
  const field = useFieldContext<Date>();
  return (
    <div
      className={cn(
        'grid w-full items-center gap-2.5',
        containerProps?.className,
      )}
      {...containerProps}
    >
      <Label className="pb-1.5" {...labelProps} />
      <Popover>
        <PopoverTrigger asChild className="w-full">
          <Button
            variant={'outline'}
            className={cn(
              'w-full pl-3 text-left font-normal',
              !field.state.value && 'text-muted-foreground',
            )}
          >
            {field.state.value ? (
              format(field.state.value, 'PPP')
            ) : (
              <span>Pick a date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={field.state.value}
            //@ts-ignore
            onSelect={(e: Date | undefined) => e && field.handleChange(e)}
            {...calendarProps}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
