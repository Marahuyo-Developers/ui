import { createFormHookContexts, createFormHook } from '@tanstack/react-form';
import { Button, type buttonVariants } from '../ui/button';
import type { VariantProps } from 'class-variance-authority';
import TextInputField from './text-input-field';
import TextAreaInputField from './text-area-field';
import MultiSelectField from './multi-select-field';
import SingleSelectField from './single-select-field';
import SingleDateInputField from './single-date-input-field';
import FileUploadField from './file-upload-field';

export function SubscribeButton({
  buttonProps,
}: {
  buttonProps?: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
      isLoading?: boolean;
      loadingIcon?: React.ReactElement;
      block?: boolean;
      iconPosition?: 'start' | 'end';
    };
}) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => (
        <Button
          disabled={isSubmitting}
          isLoading={isSubmitting}
          {...buttonProps}
        />
      )}
    </form.Subscribe>
  );
}

// export useFieldContext for use in your custom components
export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextInputField,
    SingleSelectField,
    TextAreaInputField,
    MultiSelectField,
    SingleDateInputField,
    FileUploadField,
  },
  formComponents: { SubscribeButton },
});
