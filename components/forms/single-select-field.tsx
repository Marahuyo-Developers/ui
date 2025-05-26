import { cn } from '@/lib/utils';
import { useFieldContext } from '.';
import { Label } from '../ui/label';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
} from '../ui/select';
import type { SelectProps } from '@radix-ui/react-select';

export default function SingleSelectField({
  labelProps,
  containerProps,
  placeHolder,
  options,
  selectProps,
}: {
  labelProps?: React.ComponentProps<'label'>;
  containerProps?: React.ComponentProps<'div'>;
  options: { label: string; value: string }[];
  placeHolder?: string;
  selectProps?: React.ComponentProps<React.FC<SelectProps>>;
}) {
  const field = useFieldContext<string>();

  return (
    <div
      className={cn(
        'grid w-full items-center gap-2.5',
        containerProps?.className,
      )}
      {...containerProps}
    >
      <Label className="pb-1.5" {...labelProps} />
      <Select
        onValueChange={field.handleChange}
        defaultValue={field.state.value}
        {...selectProps}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={placeHolder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((option) => (
              <SelectItem key={option.label} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
