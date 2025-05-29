import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../lib/utils';
import { Button } from '../../components/ui/button';
import { Calendar } from '../../components/ui/calendar';
import { useFieldContext } from '.';
import { Label } from '../ui/label';
import { Popover, PopoverContent, PopoverTrigger, } from '../../components/ui/popover';
import { ScrollArea, ScrollBar } from '../../components/ui/scroll-area';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
export default function SingleDateInputField({ labelProps, containerProps, calendarProps, }) {
    const field = useFieldContext();
    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const handleDateSelect = (selectedDate) => {
        if (selectedDate) {
            field.handleChange(selectedDate);
        }
    };
    const handleTimeChange = (type, value) => {
        if (field.state.value) {
            const newDate = new Date(field.state.value);
            if (type === 'hour') {
                newDate.setHours((Number.parseInt(value) % 12) + (newDate.getHours() >= 12 ? 12 : 0));
            }
            else if (type === 'minute') {
                newDate.setMinutes(Number.parseInt(value));
            }
            else if (type === 'ampm') {
                const currentHours = newDate.getHours();
                newDate.setHours(value === 'PM' ? currentHours + 12 : currentHours - 12);
            }
            field.handleChange(newDate);
        }
    };
    return (_jsxs("div", { className: cn('grid w-full items-center gap-2.5', containerProps?.className), ...containerProps, children: [_jsx(Label, { className: "pb-1.5", ...labelProps }), _jsxs(Popover, { children: [_jsx(PopoverTrigger, { asChild: true, children: _jsxs(Button, { variant: "outline", className: cn('w-full justify-start text-left font-normal', !field.state.value && 'text-muted-foreground'), disabled: !!calendarProps?.disabled, children: [_jsx(CalendarIcon, { className: "mr-2 h-4 w-4" }), field.state.value ? (format(field.state.value, 'MM/dd/yyyy hh:mm aa')) : (_jsx("span", { children: "MM/DD/YYYY hh:mm aa" }))] }) }), _jsx(PopoverContent, { className: "w-auto p-0", children: _jsxs("div", { className: "sm:flex", children: [_jsx(Calendar, { mode: "single", selected: field.state.value, 
                                    //@ts-ignore
                                    onSelect: handleDateSelect, initialFocus: true, ...calendarProps }), _jsxs("div", { className: cn(!!calendarProps?.disabled && 'hidden', 'flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x'), children: [_jsxs(ScrollArea, { className: "w-64 sm:w-auto", children: [_jsx("div", { className: "flex sm:flex-col p-2", children: hours.reverse().map((hour) => (_jsx(Button, { size: "icon", variant: field.state.value &&
                                                            field.state.value.getHours() % 12 === hour % 12
                                                            ? 'default'
                                                            : 'ghost', className: "sm:w-full shrink-0 aspect-square", onClick: () => handleTimeChange('hour', hour.toString()), children: hour }, hour))) }), _jsx(ScrollBar, { orientation: "horizontal", className: "sm:hidden" })] }), _jsxs(ScrollArea, { className: "w-64 sm:w-auto", children: [_jsx("div", { className: "flex sm:flex-col p-2", children: Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (_jsx(Button, { size: "icon", variant: field.state.value &&
                                                            field.state.value.getMinutes() === minute
                                                            ? 'default'
                                                            : 'ghost', className: "sm:w-full shrink-0 aspect-square", onClick: () => handleTimeChange('minute', minute.toString()), children: minute }, minute))) }), _jsx(ScrollBar, { orientation: "horizontal", className: "sm:hidden" })] }), _jsx(ScrollArea, { className: "", children: _jsx("div", { className: "flex sm:flex-col p-2", children: ['AM', 'PM'].map((ampm) => (_jsx(Button, { size: "icon", variant: field.state.value &&
                                                        ((ampm === 'AM' && field.state.value.getHours() < 12) ||
                                                            (ampm === 'PM' && field.state.value.getHours() >= 12))
                                                        ? 'default'
                                                        : 'ghost', className: "sm:w-full shrink-0 aspect-square", onClick: () => handleTimeChange('ampm', ampm), children: ampm }, ampm))) }) })] })] }) })] })] }));
}
//# sourceMappingURL=single-date-input-field.js.map