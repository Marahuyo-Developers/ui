import { jsx as _jsx } from "react/jsx-runtime";
import { createFormHookContexts, createFormHook } from '@tanstack/react-form';
import { Button } from '../ui/button';
import { lazy } from 'react';
const TextInputField = lazy(() => import('./text-input-field'));
const TextAreaInputField = lazy(() => import('./text-area-field'));
const MultiSelectField = lazy(() => import('./multi-select-field'));
const SingleSelectField = lazy(() => import('./single-select-field'));
const SingleDateInputField = lazy(() => import('./single-date-input-field'));
const FileUploadField = lazy(() => import('./file-upload-field'));
export function SubscribeButton({ buttonProps, }) {
    const form = useFormContext();
    return (_jsx(form.Subscribe, { selector: (state) => state.isSubmitting, children: (isSubmitting) => (_jsx(Button, { disabled: isSubmitting, isLoading: isSubmitting, ...buttonProps })) }));
}
// export useFieldContext for use in your custom components
export const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts();
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
//# sourceMappingURL=index.js.map