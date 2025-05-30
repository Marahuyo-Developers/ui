import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../lib/utils';
import { useFieldContext } from '.';
import { Label } from '../ui/label';
import { MultiSelect } from '../ui/multi-select';
export default function MultiSelectField({ labelProps, containerProps, placeHolder, options, multiSelectProps, }) {
    const field = useFieldContext();
    return (_jsxs("div", { className: cn('grid w-full items-center gap-2.5', containerProps?.className), ...containerProps, children: [_jsx(Label, { className: "pb-1.5", ...labelProps }), _jsx(MultiSelect, { options: options, onValueChange: field.handleChange, placeholder: placeHolder, variant: "default", ...multiSelectProps })] }));
}
//# sourceMappingURL=multi-select-field.js.map