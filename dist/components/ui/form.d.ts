import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import { type ControllerProps, type FieldPath, type FieldValues } from 'react-hook-form';
declare const Form: <TFieldValues extends FieldValues, TContext = any, TTransformedValues = TFieldValues>(props: import("react-hook-form").FormProviderProps<TFieldValues, TContext, TTransformedValues>) => React.JSX.Element;
declare const FormField: <TFieldValues extends FieldValues = FieldValues, TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>>({ ...props }: ControllerProps<TFieldValues, TName>) => any;
declare const useFormField: () => {
    invalid: boolean;
    isDirty: boolean;
    isTouched: boolean;
    isValidating: boolean;
    error?: import("react-hook-form").FieldError;
    id: any;
    name: any;
    formItemId: string;
    formDescriptionId: string;
    formMessageId: string;
};
declare function FormItem({ className, ...props }: React.ComponentProps<'div'>): any;
declare function FormLabel({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>): any;
declare function FormControl({ ...props }: React.ComponentProps<typeof Slot>): any;
declare function FormDescription({ className, ...props }: React.ComponentProps<'p'>): any;
declare function FormMessage({ className, ...props }: React.ComponentProps<'p'>): any;
export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField, };
//# sourceMappingURL=form.d.ts.map