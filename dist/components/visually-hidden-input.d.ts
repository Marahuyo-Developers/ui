import * as React from 'react';
type InputValue = string[] | string;
interface VisuallyHiddenInputProps<T = InputValue> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'checked' | 'onReset'> {
    value?: T;
    checked?: boolean;
    control: HTMLElement | null;
    bubbles?: boolean;
}
declare function VisuallyHiddenInput<T = InputValue>(props: VisuallyHiddenInputProps<T>): import("react/jsx-runtime").JSX.Element;
export { VisuallyHiddenInput };
//# sourceMappingURL=visually-hidden-input.d.ts.map