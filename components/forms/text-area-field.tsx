import { cn } from '@/lib/utils';
import { useFieldContext } from '.';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

export default function TextAreaInputField({
  labelProps,
  containerProps,
  textAreaProps,
}: {
  labelProps?: React.ComponentProps<'label'>;
  textAreaProps?: React.ComponentProps<'textarea'>;
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
      <Textarea
        {...textAreaProps}
        defaultValue={field.state.value}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
    </div>
  );
}
