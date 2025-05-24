import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../lib/utils';
import { useFieldContext } from '.';
import { Label } from '../ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, } from '../ui/select';
export default function SingleSelectField({ labelProps, containerProps, placeHolder, options, }) {
    const field = useFieldContext();
    return (_jsxs("div", { className: cn('grid w-full items-center gap-2.5', containerProps?.className), ...containerProps, children: [_jsx(Label, { className: "pb-1.5", ...labelProps }), _jsxs(Select, { onValueChange: field.handleChange, defaultValue: field.state.value, children: [_jsx(SelectTrigger, { className: "w-full", children: _jsx(SelectValue, { placeholder: placeHolder }) }), _jsx(SelectContent, { children: _jsx(SelectGroup, { children: options.map((option) => (_jsx(SelectItem, { value: option.value, children: option.label }, option.label))) }) })] })] }));
}
//# sourceMappingURL=single-select-field.js.map