import { cn } from '@/lib/utils';
import { useFieldContext } from '.';
import { Label } from '../ui/label';
import { MultiSelect } from '../ui/multi-select';

export default function MultiSelectField({
  labelProps,
  containerProps,
  placeHolder,
  options,
}: {
  labelProps?: React.ComponentProps<'label'>;
  containerProps?: React.ComponentProps<'div'>;
  options: { label: string; value: string }[];
  placeHolder?: string;
}) {
  const field = useFieldContext<string[]>();

  return (
    <div
      className={cn(
        'grid w-full items-center gap-2.5',
        containerProps?.className,
      )}
      {...containerProps}
    >
      <Label className="pb-1.5" {...labelProps} />
      <MultiSelect
        options={options}
        value={field.state.value}
        defaultValue={field.state.value}
        onValueChange={field.handleChange}
        placeholder={placeHolder}
        variant="default"
      />
    </div>
  );
}
