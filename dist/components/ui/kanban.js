import { jsx as _jsx } from "react/jsx-runtime";
import { Card, CardContent } from './card';
import { Button } from './button';
export const KanbanBoard = (props) => {
    return (_jsx("div", { className: 'flex flex-row items-start gap-10', children: props.children }));
};
export const KanbanGroup = (props) => {
    return (_jsx("div", { className: 'min-w-96', children: _jsx("div", { className: 'flex flex-col gap-2.5', children: props.children }) }));
};
export const KanbanContent = (props) => {
    return (_jsx("div", { className: 'flex flex-col gap-2.5', children: props.children }));
};
export const KanbanItem = (props) => {
    return (_jsx(Card, { className: 'bg-accent py-2', children: _jsx(CardContent, { children: props.children }) }));
};
export const KanbanItemTitle = (props) => {
    return (_jsx("div", { className: 'text-lg font-semibold', children: props.children }));
};
export const KanbanItemLabel = (props) => {
    return _jsx("div", { className: 'text-muted-foreground text-xs', children: props.children });
};
export const KanbanHeader = (props) => {
    return (_jsx("div", { className: 'flex justify-between items-center', children: props.children }));
};
export const KanbanAddButton = (props) => {
    return (_jsx(Button, { variant: 'ghost', className: 'justify-start text-muted-foreground', children: props.children }));
};
//# sourceMappingURL=kanban.js.map