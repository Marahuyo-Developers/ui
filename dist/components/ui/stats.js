import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Store } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';
export const StatsWithIcon = (props) => {
    return (_jsxs(Card, { children: [_jsxs(CardContent, { children: [_jsxs("div", { className: 'flex items-center justify-between', children: [_jsx(CardDescription, { children: props.labelDescription }), _jsx(props.icon, { className: 'text-muted-foreground' })] }), _jsx(CardTitle, { className: 'text-3xl pt-2', children: props.title })] }), _jsx(CardFooter, { className: 'text-muted-foreground', children: props.footer })] }));
};
//# sourceMappingURL=stats.js.map