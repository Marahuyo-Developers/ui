import { cn } from '@/lib/utils';
import { useFieldContext } from '.';
import { Label } from '../ui/label';
import { Input } from '../ui/input';

export default function TextInputField({
  labelProps,
  containerProps,
  inputProps,
}: {
  labelProps?: React.ComponentProps<'label'>;
  inputProps?: React.ComponentProps<'input'>;
  containerProps?: React.ComponentProps<'div'>;
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
      <Input
        {...inputProps}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
    </div>
  );
}
