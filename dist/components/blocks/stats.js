import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Store } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '../ui/card';
export const StatsWithIcon = (props) => {
    return (_jsxs(Card, { children: [_jsxs(CardContent, { children: [_jsxs("div", { className: "flex items-center justify-between", children: [props.labelDescription && (_jsx(CardDescription, { children: props.labelDescription })), props.icon && (_jsx(props.icon, { className: `text-muted-foreground ${!props.labelDescription ? 'ml-auto' : ''}` }))] }), _jsx(CardTitle, { className: "text-3xl pt-2", children: props.title })] }), props.footer && (_jsx(CardFooter, { className: "text-muted-foreground", children: props.footer }))] }));
};
//# sourceMappingURL=stats.js.map