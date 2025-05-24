'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { DndContext, DragOverlay, KeyboardCode, KeyboardSensor, MeasuringStrategy, MouseSensor, TouchSensor, closestCenter, closestCorners, defaultDropAnimationSideEffects, getFirstCollision, pointerWithin, rectIntersection, useSensor, useSensors, } from '@dnd-kit/core';
import { SortableContext, arrayMove, defaultAnimateLayoutChanges, horizontalListSortingStrategy, useSortable, verticalListSortingStrategy, } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { useComposedRefs } from '../../lib/composition';
import { cn } from '../../lib/utils';
const directions = [
    KeyboardCode.Down,
    KeyboardCode.Right,
    KeyboardCode.Up,
    KeyboardCode.Left,
];
const coordinateGetter = (event, { context }) => {
    const { active, droppableRects, droppableContainers, collisionRect } = context;
    if (directions.includes(event.code)) {
        event.preventDefault();
        if (!active || !collisionRect)
            return;
        const filteredContainers = [];
        for (const entry of droppableContainers.getEnabled()) {
            if (!entry || entry?.disabled)
                return;
            const rect = droppableRects.get(entry.id);
            if (!rect)
                return;
            const data = entry.data.current;
            if (data) {
                const { type, children } = data;
                if (type === 'container' && children?.length > 0) {
                    if (active.data.current?.type !== 'container') {
                        return;
                    }
                }
            }
            switch (event.code) {
                case KeyboardCode.Down:
                    if (collisionRect.top < rect.top) {
                        filteredContainers.push(entry);
                    }
                    break;
                case KeyboardCode.Up:
                    if (collisionRect.top > rect.top) {
                        filteredContainers.push(entry);
                    }
                    break;
                case KeyboardCode.Left:
                    if (collisionRect.left >= rect.left + rect.width) {
                        filteredContainers.push(entry);
                    }
                    break;
                case KeyboardCode.Right:
                    if (collisionRect.left + collisionRect.width <= rect.left) {
                        filteredContainers.push(entry);
                    }
                    break;
            }
        }
        const collisions = closestCorners({
            active,
            collisionRect: collisionRect,
            droppableRects,
            droppableContainers: filteredContainers,
            pointerCoordinates: null,
        });
        const closestId = getFirstCollision(collisions, 'id');
        if (closestId != null) {
            const newDroppable = droppableContainers.get(closestId);
            const newNode = newDroppable?.node.current;
            const newRect = newDroppable?.rect.current;
            if (newNode && newRect) {
                if (newDroppable.id === 'placeholder') {
                    return {
                        x: newRect.left + (newRect.width - collisionRect.width) / 2,
                        y: newRect.top + (newRect.height - collisionRect.height) / 2,
                    };
                }
                if (newDroppable.data.current?.type === 'container') {
                    return {
                        x: newRect.left + 20,
                        y: newRect.top + 74,
                    };
                }
                return {
                    x: newRect.left,
                    y: newRect.top,
                };
            }
        }
    }
    return undefined;
};
const ROOT_NAME = 'Kanban';
const BOARD_NAME = 'KanbanBoard';
const COLUMN_NAME = 'KanbanColumn';
const COLUMN_HANDLE_NAME = 'KanbanColumnHandle';
const ITEM_NAME = 'KanbanItem';
const ITEM_HANDLE_NAME = 'KanbanItemHandle';
const OVERLAY_NAME = 'KanbanOverlay';
const KANBAN_ERRORS = {
    [ROOT_NAME]: `\`${ROOT_NAME}\` components must be within \`${ROOT_NAME}\``,
    [BOARD_NAME]: `\`${BOARD_NAME}\` must be within \`${ROOT_NAME}\``,
    [COLUMN_NAME]: `\`${COLUMN_NAME}\` must be within \`${BOARD_NAME}\``,
    [COLUMN_HANDLE_NAME]: `\`${COLUMN_HANDLE_NAME}\` must be within \`${COLUMN_NAME}\``,
    [ITEM_NAME]: `\`${ITEM_NAME}\` must be within \`${COLUMN_NAME}\``,
    [ITEM_HANDLE_NAME]: `\`${ITEM_HANDLE_NAME}\` must be within \`${ITEM_NAME}\``,
    [OVERLAY_NAME]: `\`${OVERLAY_NAME}\` must be within \`${ROOT_NAME}\``,
};
const KanbanContext = React.createContext(null);
KanbanContext.displayName = ROOT_NAME;
function useKanbanContext(name) {
    const context = React.useContext(KanbanContext);
    if (!context) {
        throw new Error(KANBAN_ERRORS[name]);
    }
    return context;
}
function Kanban(props) {
    const { value, onValueChange, modifiers, strategy = verticalListSortingStrategy, orientation = 'horizontal', onMove, getItemValue: getItemValueProp, accessibility, flatCursor = false, ...kanbanProps } = props;
    const id = React.useId();
    const [activeId, setActiveId] = React.useState(null);
    const lastOverIdRef = React.useRef(null);
    const hasMovedRef = React.useRef(false);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor), useSensor(KeyboardSensor, {
        coordinateGetter,
    }));
    const getItemValue = React.useCallback((item) => {
        if (typeof item === 'object' && !getItemValueProp) {
            throw new Error('getItemValue is required when using array of objects');
        }
        return getItemValueProp
            ? getItemValueProp(item)
            : item;
    }, [getItemValueProp]);
    const getColumn = React.useCallback((id) => {
        if (id in value)
            return id;
        for (const [columnId, items] of Object.entries(value)) {
            if (items.some((item) => getItemValue(item) === id)) {
                return columnId;
            }
        }
        return null;
    }, [value, getItemValue]);
    const collisionDetection = React.useCallback((args) => {
        if (activeId && activeId in value) {
            return closestCenter({
                ...args,
                droppableContainers: args.droppableContainers.filter((container) => container.id in value),
            });
        }
        const pointerIntersections = pointerWithin(args);
        const intersections = pointerIntersections.length > 0
            ? pointerIntersections
            : rectIntersection(args);
        let overId = getFirstCollision(intersections, 'id');
        if (!overId) {
            if (hasMovedRef.current) {
                lastOverIdRef.current = activeId;
            }
            return lastOverIdRef.current ? [{ id: lastOverIdRef.current }] : [];
        }
        if (overId in value) {
            const containerItems = value[overId];
            if (containerItems && containerItems.length > 0) {
                const closestItem = closestCenter({
                    ...args,
                    droppableContainers: args.droppableContainers.filter((container) => container.id !== overId &&
                        containerItems.some((item) => getItemValue(item) === container.id)),
                });
                if (closestItem.length > 0) {
                    overId = closestItem[0]?.id ?? overId;
                }
            }
        }
        lastOverIdRef.current = overId;
        return [{ id: overId }];
    }, [activeId, value, getItemValue]);
    const onDragStart = React.useCallback((event) => {
        kanbanProps.onDragStart?.(event);
        if (event.activatorEvent.defaultPrevented)
            return;
        setActiveId(event.active.id);
    }, [kanbanProps.onDragStart]);
    const onDragOver = React.useCallback((event) => {
        kanbanProps.onDragOver?.(event);
        if (event.activatorEvent.defaultPrevented)
            return;
        const { active, over } = event;
        if (!over)
            return;
        const activeColumn = getColumn(active.id);
        const overColumn = getColumn(over.id);
        if (!activeColumn || !overColumn)
            return;
        if (activeColumn === overColumn) {
            const items = value[activeColumn];
            if (!items)
                return;
            const activeIndex = items.findIndex((item) => getItemValue(item) === active.id);
            const overIndex = items.findIndex((item) => getItemValue(item) === over.id);
            if (activeIndex !== overIndex) {
                const newColumns = { ...value };
                newColumns[activeColumn] = arrayMove(items, activeIndex, overIndex);
                onValueChange?.(newColumns);
            }
        }
        else {
            const activeItems = value[activeColumn];
            const overItems = value[overColumn];
            if (!activeItems || !overItems)
                return;
            const activeIndex = activeItems.findIndex((item) => getItemValue(item) === active.id);
            if (activeIndex === -1)
                return;
            const activeItem = activeItems[activeIndex];
            if (!activeItem)
                return;
            const updatedItems = {
                ...value,
                [activeColumn]: activeItems.filter((item) => getItemValue(item) !== active.id),
                [overColumn]: [...overItems, activeItem],
            };
            onValueChange?.(updatedItems);
            hasMovedRef.current = true;
        }
    }, [value, getColumn, getItemValue, onValueChange, kanbanProps.onDragOver]);
    const onDragEnd = React.useCallback((event) => {
        kanbanProps.onDragEnd?.(event);
        if (event.activatorEvent.defaultPrevented)
            return;
        const { active, over } = event;
        if (!over) {
            setActiveId(null);
            return;
        }
        if (active.id in value && over.id in value) {
            const activeIndex = Object.keys(value).indexOf(active.id);
            const overIndex = Object.keys(value).indexOf(over.id);
            if (activeIndex !== overIndex) {
                const orderedColumns = Object.keys(value);
                const newOrder = arrayMove(orderedColumns, activeIndex, overIndex);
                const newColumns = {};
                for (const key of newOrder) {
                    const items = value[key];
                    if (items) {
                        newColumns[key] = items;
                    }
                }
                if (onMove) {
                    onMove({ ...event, activeIndex, overIndex });
                }
                else {
                    onValueChange?.(newColumns);
                }
            }
        }
        else {
            const activeColumn = getColumn(active.id);
            const overColumn = getColumn(over.id);
            if (!activeColumn || !overColumn) {
                setActiveId(null);
                return;
            }
            if (activeColumn === overColumn) {
                const items = value[activeColumn];
                if (!items) {
                    setActiveId(null);
                    return;
                }
                const activeIndex = items.findIndex((item) => getItemValue(item) === active.id);
                const overIndex = items.findIndex((item) => getItemValue(item) === over.id);
                if (activeIndex !== overIndex) {
                    const newColumns = { ...value };
                    newColumns[activeColumn] = arrayMove(items, activeIndex, overIndex);
                    if (onMove) {
                        onMove({
                            ...event,
                            activeIndex,
                            overIndex,
                        });
                    }
                    else {
                        onValueChange?.(newColumns);
                    }
                }
            }
        }
        setActiveId(null);
        hasMovedRef.current = false;
    }, [
        value,
        getColumn,
        getItemValue,
        onValueChange,
        onMove,
        kanbanProps.onDragEnd,
    ]);
    const onDragCancel = React.useCallback((event) => {
        kanbanProps.onDragCancel?.(event);
        if (event.activatorEvent.defaultPrevented)
            return;
        setActiveId(null);
        hasMovedRef.current = false;
    }, [kanbanProps.onDragCancel]);
    const announcements = React.useMemo(() => ({
        onDragStart({ active }) {
            const isColumn = active.id in value;
            const itemType = isColumn ? 'column' : 'item';
            const position = isColumn
                ? Object.keys(value).indexOf(active.id) + 1
                : (() => {
                    const column = getColumn(active.id);
                    if (!column || !value[column])
                        return 1;
                    return (value[column].findIndex((item) => getItemValue(item) === active.id) + 1);
                })();
            const total = isColumn
                ? Object.keys(value).length
                : (() => {
                    const column = getColumn(active.id);
                    return column ? (value[column]?.length ?? 0) : 0;
                })();
            return `Picked up ${itemType} at position ${position} of ${total}`;
        },
        onDragOver({ active, over }) {
            if (!over)
                return;
            const isColumn = active.id in value;
            const itemType = isColumn ? 'column' : 'item';
            const position = isColumn
                ? Object.keys(value).indexOf(over.id) + 1
                : (() => {
                    const column = getColumn(over.id);
                    if (!column || !value[column])
                        return 1;
                    return (value[column].findIndex((item) => getItemValue(item) === over.id) + 1);
                })();
            const total = isColumn
                ? Object.keys(value).length
                : (() => {
                    const column = getColumn(over.id);
                    return column ? (value[column]?.length ?? 0) : 0;
                })();
            const overColumn = getColumn(over.id);
            const activeColumn = getColumn(active.id);
            if (isColumn) {
                return `${itemType} is now at position ${position} of ${total}`;
            }
            if (activeColumn !== overColumn) {
                return `${itemType} is now at position ${position} of ${total} in ${overColumn}`;
            }
            return `${itemType} is now at position ${position} of ${total}`;
        },
        onDragEnd({ active, over }) {
            if (!over)
                return;
            const isColumn = active.id in value;
            const itemType = isColumn ? 'column' : 'item';
            const position = isColumn
                ? Object.keys(value).indexOf(over.id) + 1
                : (() => {
                    const column = getColumn(over.id);
                    if (!column || !value[column])
                        return 1;
                    return (value[column].findIndex((item) => getItemValue(item) === over.id) + 1);
                })();
            const total = isColumn
                ? Object.keys(value).length
                : (() => {
                    const column = getColumn(over.id);
                    return column ? (value[column]?.length ?? 0) : 0;
                })();
            const overColumn = getColumn(over.id);
            const activeColumn = getColumn(active.id);
            if (isColumn) {
                return `${itemType} was dropped at position ${position} of ${total}`;
            }
            if (activeColumn !== overColumn) {
                return `${itemType} was dropped at position ${position} of ${total} in ${overColumn}`;
            }
            return `${itemType} was dropped at position ${position} of ${total}`;
        },
        onDragCancel({ active }) {
            const isColumn = active.id in value;
            const itemType = isColumn ? 'column' : 'item';
            return `Dragging was cancelled. ${itemType} was dropped.`;
        },
    }), [value, getColumn, getItemValue]);
    const contextValue = React.useMemo(() => ({
        id,
        items: value,
        modifiers,
        strategy,
        orientation,
        activeId,
        setActiveId,
        getItemValue,
        flatCursor,
    }), [
        id,
        value,
        activeId,
        modifiers,
        strategy,
        orientation,
        getItemValue,
        flatCursor,
    ]);
    return (_jsx(KanbanContext.Provider, { value: contextValue, children: _jsx(DndContext, { collisionDetection: collisionDetection, modifiers: modifiers, sensors: sensors, ...kanbanProps, id: id, measuring: {
                droppable: {
                    strategy: MeasuringStrategy.Always,
                },
            }, onDragStart: onDragStart, onDragOver: onDragOver, onDragEnd: onDragEnd, onDragCancel: onDragCancel, accessibility: {
                announcements,
                screenReaderInstructions: {
                    draggable: `
            To pick up a kanban item or column, press space or enter.
            While dragging, use the arrow keys to move the item.
            Press space or enter again to drop the item in its new position, or press escape to cancel.
          `,
                },
                ...accessibility,
            } }) }));
}
const KanbanBoardContext = React.createContext(false);
KanbanBoardContext.displayName = BOARD_NAME;
const KanbanBoard = React.forwardRef((props, forwardedRef) => {
    const { asChild, className, ...boardProps } = props;
    const context = useKanbanContext(BOARD_NAME);
    const columns = React.useMemo(() => {
        return Object.keys(context.items);
    }, [context.items]);
    const BoardPrimitive = asChild ? Slot : 'div';
    return (_jsx(KanbanBoardContext.Provider, { value: true, children: _jsx(SortableContext, { items: columns, strategy: context.orientation === 'horizontal'
                ? horizontalListSortingStrategy
                : verticalListSortingStrategy, children: _jsx(BoardPrimitive, { "aria-orientation": context.orientation, "data-orientation": context.orientation, "data-slot": "kanban-board", ...boardProps, ref: forwardedRef, className: cn('flex size-full gap-4', context.orientation === 'horizontal' ? 'flex-row' : 'flex-col', className) }) }) }));
});
KanbanBoard.displayName = BOARD_NAME;
const KanbanColumnContext = React.createContext(null);
KanbanColumnContext.displayName = COLUMN_NAME;
const animateLayoutChanges = (args) => defaultAnimateLayoutChanges({ ...args, wasDragging: true });
const KanbanColumn = React.forwardRef((props, forwardedRef) => {
    const { value, asChild, asHandle, disabled, className, style, ...columnProps } = props;
    const id = React.useId();
    const context = useKanbanContext(COLUMN_NAME);
    const inBoard = React.useContext(KanbanBoardContext);
    const inOverlay = React.useContext(KanbanOverlayContext);
    if (!inBoard && !inOverlay) {
        throw new Error(KANBAN_ERRORS[COLUMN_NAME]);
    }
    if (value === '') {
        throw new Error(`\`${COLUMN_NAME}\` value cannot be an empty string`);
    }
    const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging, } = useSortable({
        id: value,
        disabled,
        animateLayoutChanges,
    });
    const composedRef = useComposedRefs(forwardedRef, (node) => {
        if (disabled)
            return;
        setNodeRef(node);
    });
    const composedStyle = React.useMemo(() => {
        return {
            transform: CSS.Transform.toString(transform),
            transition,
            ...style,
        };
    }, [transform, transition, style]);
    const items = React.useMemo(() => {
        const items = context.items[value] ?? [];
        return items.map((item) => context.getItemValue(item));
    }, [context.items, value, context.getItemValue]);
    const columnContext = React.useMemo(() => ({
        id,
        attributes,
        listeners,
        setActivatorNodeRef,
        isDragging,
        disabled,
    }), [id, attributes, listeners, setActivatorNodeRef, isDragging, disabled]);
    const ColumnPrimitive = asChild ? Slot : 'div';
    return (_jsx(KanbanColumnContext.Provider, { value: columnContext, children: _jsx(SortableContext, { items: items, strategy: context.orientation === 'horizontal'
                ? horizontalListSortingStrategy
                : verticalListSortingStrategy, children: _jsx(ColumnPrimitive, { id: id, "data-disabled": disabled, "data-dragging": isDragging ? '' : undefined, "data-slot": "kanban-column", ...columnProps, ...(asHandle && !disabled ? attributes : {}), ...(asHandle && !disabled ? listeners : {}), ref: composedRef, style: composedStyle, className: cn('flex size-full flex-col gap-2 rounded-lg border bg-zinc-100 p-2.5 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:bg-zinc-900', {
                    'touch-none select-none': asHandle,
                    'cursor-default': context.flatCursor,
                    'data-dragging:cursor-grabbing': !context.flatCursor,
                    'cursor-grab': !isDragging && asHandle && !context.flatCursor,
                    'opacity-50': isDragging,
                    'pointer-events-none opacity-50': disabled,
                }, className) }) }) }));
});
KanbanColumn.displayName = COLUMN_NAME;
const KanbanColumnHandle = React.forwardRef((props, forwardedRef) => {
    const { asChild, disabled, className, ...columnHandleProps } = props;
    const context = useKanbanContext(COLUMN_NAME);
    const columnContext = React.useContext(KanbanColumnContext);
    if (!columnContext) {
        throw new Error(KANBAN_ERRORS[COLUMN_HANDLE_NAME]);
    }
    const isDisabled = disabled ?? columnContext.disabled;
    const composedRef = useComposedRefs(forwardedRef, (node) => {
        if (isDisabled)
            return;
        columnContext.setActivatorNodeRef(node);
    });
    const HandlePrimitive = asChild ? Slot : 'button';
    return (_jsx(HandlePrimitive, { type: "button", "aria-controls": columnContext.id, "data-disabled": isDisabled, "data-dragging": columnContext.isDragging ? '' : undefined, "data-slot": "kanban-column-handle", ...columnHandleProps, ...(isDisabled ? {} : columnContext.attributes), ...(isDisabled ? {} : columnContext.listeners), ref: composedRef, className: cn('select-none disabled:pointer-events-none disabled:opacity-50', context.flatCursor
            ? 'cursor-default'
            : 'cursor-grab data-dragging:cursor-grabbing', className), disabled: isDisabled }));
});
KanbanColumnHandle.displayName = COLUMN_HANDLE_NAME;
const KanbanItemContext = React.createContext(null);
KanbanItemContext.displayName = ITEM_NAME;
const KanbanItem = React.forwardRef((props, forwardedRef) => {
    const { value, style, asHandle, asChild, disabled, className, ...itemProps } = props;
    const id = React.useId();
    const context = useKanbanContext(ITEM_NAME);
    const inBoard = React.useContext(KanbanBoardContext);
    const inOverlay = React.useContext(KanbanOverlayContext);
    if (!inBoard && !inOverlay) {
        throw new Error(KANBAN_ERRORS[ITEM_NAME]);
    }
    const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging, } = useSortable({ id: value, disabled });
    if (value === '') {
        throw new Error(`\`${ITEM_NAME}\` value cannot be an empty string`);
    }
    const composedRef = useComposedRefs(forwardedRef, (node) => {
        if (disabled)
            return;
        setNodeRef(node);
    });
    const composedStyle = React.useMemo(() => {
        return {
            transform: CSS.Transform.toString(transform),
            transition,
            ...style,
        };
    }, [transform, transition, style]);
    const itemContext = React.useMemo(() => ({
        id,
        attributes,
        listeners,
        setActivatorNodeRef,
        isDragging,
        disabled,
    }), [id, attributes, listeners, setActivatorNodeRef, isDragging, disabled]);
    const ItemPrimitive = asChild ? Slot : 'div';
    return (_jsx(KanbanItemContext.Provider, { value: itemContext, children: _jsx(ItemPrimitive, { id: id, "data-disabled": disabled, "data-dragging": isDragging ? '' : undefined, "data-slot": "kanban-item", ...itemProps, ...(asHandle && !disabled ? attributes : {}), ...(asHandle && !disabled ? listeners : {}), ref: composedRef, style: composedStyle, className: cn('focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1', {
                'touch-none select-none': asHandle,
                'cursor-default': context.flatCursor,
                'data-dragging:cursor-grabbing': !context.flatCursor,
                'cursor-grab': !isDragging && asHandle && !context.flatCursor,
                'opacity-50': isDragging,
                'pointer-events-none opacity-50': disabled,
            }, className) }) }));
});
KanbanItem.displayName = ITEM_NAME;
const KanbanItemHandle = React.forwardRef((props, forwardedRef) => {
    const { asChild, disabled, className, ...itemHandleProps } = props;
    const itemContext = React.useContext(KanbanItemContext);
    if (!itemContext) {
        throw new Error(KANBAN_ERRORS[ITEM_HANDLE_NAME]);
    }
    const context = useKanbanContext(ITEM_HANDLE_NAME);
    const isDisabled = disabled ?? itemContext.disabled;
    const composedRef = useComposedRefs(forwardedRef, (node) => {
        if (isDisabled)
            return;
        itemContext.setActivatorNodeRef(node);
    });
    const HandlePrimitive = asChild ? Slot : 'button';
    return (_jsx(HandlePrimitive, { type: "button", "aria-controls": itemContext.id, "data-disabled": isDisabled, "data-dragging": itemContext.isDragging ? '' : undefined, "data-slot": "kanban-item-handle", ...itemHandleProps, ...(isDisabled ? {} : itemContext.attributes), ...(isDisabled ? {} : itemContext.listeners), ref: composedRef, className: cn('select-none disabled:pointer-events-none disabled:opacity-50', context.flatCursor
            ? 'cursor-default'
            : 'cursor-grab data-dragging:cursor-grabbing', className), disabled: isDisabled }));
});
KanbanItemHandle.displayName = ITEM_HANDLE_NAME;
const KanbanOverlayContext = React.createContext(false);
KanbanOverlayContext.displayName = OVERLAY_NAME;
const dropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
        styles: {
            active: {
                opacity: '0.4',
            },
        },
    }),
};
function KanbanOverlay(props) {
    const { container: containerProp, children, ...overlayProps } = props;
    const context = useKanbanContext(OVERLAY_NAME);
    const [mounted, setMounted] = React.useState(false);
    React.useLayoutEffect(() => setMounted(true), []);
    const container = containerProp ?? (mounted ? globalThis.document?.body : null);
    if (!container)
        return null;
    const variant = context.activeId && context.activeId in context.items ? 'column' : 'item';
    return ReactDOM.createPortal(_jsx(DragOverlay, { dropAnimation: dropAnimation, modifiers: context.modifiers, className: cn(!context.flatCursor && 'cursor-grabbing'), ...overlayProps, children: _jsx(KanbanOverlayContext.Provider, { value: true, children: context.activeId && children
                ? typeof children === 'function'
                    ? children({
                        value: context.activeId,
                        variant,
                    })
                    : children
                : null }) }), container);
}
const Root = Kanban;
const Board = KanbanBoard;
const Column = KanbanColumn;
const ColumnHandle = KanbanColumnHandle;
const Item = KanbanItem;
const ItemHandle = KanbanItemHandle;
const Overlay = KanbanOverlay;
export { Kanban, KanbanBoard, KanbanColumn, KanbanColumnHandle, KanbanItem, KanbanItemHandle, KanbanOverlay, 
//
Root, Board, Column, ColumnHandle, Item, ItemHandle, Overlay, };
//# sourceMappingURL=kanban.js.map