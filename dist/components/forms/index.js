import { jsx as _jsx } from "react/jsx-runtime";
import { createFormHookContexts, createFormHook } from '@tanstack/react-form';
import { Button } from '../ui/button';
import TextInputField from './text-input-field';
import TextAreaInputField from './text-area-field';
import MultiSelectField from './multi-select-field';
import SingleSelectField from './single-select-field';
import SingleDateInputField from './single-date-input-field';
import FileUploadField from './file-upload-field';
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