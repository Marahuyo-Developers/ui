import { createFormHookContexts, createFormHook } from '@tanstack/react-form';
import { Button, type buttonVariants } from '../ui/button';
import { lazy } from 'react';
import type { VariantProps } from 'class-variance-authority';

const TextInputField = lazy(() => import('./text-input-field'));
const TextAreaInputField = lazy(() => import('./text-area-field'));
const MultiSelectField = lazy(() => import('./multi-select-field'));
const SingleSelectField = lazy(() => import('./single-select-field'));
const SingleDateInputField = lazy(() => import('./single-date-input-field'));
const FileUploadField = lazy(() => import('./file-upload-field'));

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
