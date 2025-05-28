import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useFieldContext } from '.';
import { Label } from '../ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import type { DayPicker } from 'react-day-picker';
import type { DayPickerSingleProps } from 'react-day-picker';
import type React from 'react';

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

  const hours = Array.from({ length: 12 }, (_, i) => i + 1);
  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      field.handleChange(selectedDate);
    }
  };

  const handleTimeChange = (
    type: 'hour' | 'minute' | 'ampm',
    value: string,
  ) => {
    if (field.state.value) {
      const newDate = new Date(field.state.value);
      if (type === 'hour') {
        newDate.setHours(
          (Number.parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0),
        );
      } else if (type === 'minute') {
        newDate.setMinutes(Number.parseInt(value));
      } else if (type === 'ampm') {
        const currentHours = newDate.getHours();
        newDate.setHours(
          value === 'PM' ? currentHours + 12 : currentHours - 12,
        );
      }
      field.handleChange(newDate);
    }
  };

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
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !field.state.value && 'text-muted-foreground',
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {field.state.value ? (
              format(field.state.value, 'MM/dd/yyyy hh:mm aa')
            ) : (
              <span>MM/DD/YYYY hh:mm aa</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <div className="sm:flex">
            <Calendar
              mode="single"
              selected={field.state.value}
              //@ts-ignore
              onSelect={handleDateSelect}
              initialFocus
              {...calendarProps}
            />
            <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex sm:flex-col p-2">
                  {hours.reverse().map((hour) => (
                    <Button
                      key={hour}
                      size="icon"
                      variant={
                        field.state.value &&
                        field.state.value.getHours() % 12 === hour % 12
                          ? 'default'
                          : 'ghost'
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() => handleTimeChange('hour', hour.toString())}
                    >
                      {hour}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>
              <ScrollArea className="w-64 sm:w-auto">
                <div className="flex sm:flex-col p-2">
                  {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                    <Button
                      key={minute}
                      size="icon"
                      variant={
                        field.state.value &&
                        field.state.value.getMinutes() === minute
                          ? 'default'
                          : 'ghost'
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() =>
                        handleTimeChange('minute', minute.toString())
                      }
                    >
                      {minute}
                    </Button>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" className="sm:hidden" />
              </ScrollArea>
              <ScrollArea className="">
                <div className="flex sm:flex-col p-2">
                  {['AM', 'PM'].map((ampm) => (
                    <Button
                      key={ampm}
                      size="icon"
                      variant={
                        field.state.value &&
                        ((ampm === 'AM' && field.state.value.getHours() < 12) ||
                          (ampm === 'PM' && field.state.value.getHours() >= 12))
                          ? 'default'
                          : 'ghost'
                      }
                      className="sm:w-full shrink-0 aspect-square"
                      onClick={() => handleTimeChange('ampm', ampm)}
                    >
                      {ampm}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
