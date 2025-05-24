import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../lib/utils';
import { useFieldContext } from '.';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
export default function TextInputField({ labelProps, containerProps, inputProps, }) {
    const field = useFieldContext();
    return (_jsxs("div", { className: cn('grid w-full items-center gap-2.5', containerProps?.className), ...containerProps, children: [_jsx(Label, { className: "pb-1.5", ...labelProps }), _jsx(Input, { ...inputProps, value: field.state.value, onChange: (e) => field.handleChange(e.target.value), onBlur: field.handleBlur })] }));
}
//# sourceMappingURL=text-input-field.js.map