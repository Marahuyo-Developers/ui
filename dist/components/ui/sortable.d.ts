import { type DndContextProps, type DragEndEvent, DragOverlay, type UniqueIdentifier } from "@dnd-kit/core";
import { type SortableContextProps } from "@dnd-kit/sortable";
import * as React from "react";
interface GetItemValue<T> {
    /**
     * Callback that returns a unique identifier for each sortable item. Required for array of objects.
     * @example getItemValue={(item) => item.id}
     */
    getItemValue: (item: T) => UniqueIdentifier;
}
type SortableProps<T> = DndContextProps & {
    value: T[];
    onValueChange?: (items: T[]) => void;
    onMove?: (event: DragEndEvent & {
        activeIndex: number;
        overIndex: number;
    }) => void;
    strategy?: SortableContextProps["strategy"];
    orientation?: "vertical" | "horizontal" | "mixed";
    flatCursor?: boolean;
} & (T extends object ? GetItemValue<T> : Partial<GetItemValue<T>>);
declare function Sortable<T>(props: SortableProps<T>): import("react/jsx-runtime").JSX.Element;
interface SortableContentProps extends React.ComponentPropsWithoutRef<"div"> {
    strategy?: SortableContextProps["strategy"];
    children: React.ReactNode;
    asChild?: boolean;
    withoutSlot?: boolean;
}
declare const SortableContent: React.ForwardRefExoticComponent<SortableContentProps & React.RefAttributes<HTMLDivElement>>;
interface SortableItemProps extends React.ComponentPropsWithoutRef<"div"> {
    value: UniqueIdentifier;
    asHandle?: boolean;
    asChild?: boolean;
    disabled?: boolean;
}
declare const SortableItem: React.ForwardRefExoticComponent<SortableItemProps & React.RefAttributes<HTMLDivElement>>;
interface SortableItemHandleProps extends React.ComponentPropsWithoutRef<"button"> {
    asChild?: boolean;
}
declare const SortableItemHandle: React.ForwardRefExoticComponent<SortableItemHandleProps & React.RefAttributes<HTMLButtonElement>>;
interface SortableOverlayProps extends Omit<React.ComponentPropsWithoutRef<typeof DragOverlay>, "children"> {
    container?: Element | DocumentFragment | null;
    children?: ((params: {
        value: UniqueIdentifier;
    }) => React.ReactNode) | React.ReactNode;
}
declare function SortableOverlay(props: SortableOverlayProps): React.ReactPortal | null;
declare const Root: typeof Sortable;
declare const Content: React.ForwardRefExoticComponent<SortableContentProps & React.RefAttributes<HTMLDivElement>>;
declare const Item: React.ForwardRefExoticComponent<SortableItemProps & React.RefAttributes<HTMLDivElement>>;
declare const ItemHandle: React.ForwardRefExoticComponent<SortableItemHandleProps & React.RefAttributes<HTMLButtonElement>>;
declare const Overlay: typeof SortableOverlay;
export { Root, Content, Item, ItemHandle, Overlay, Sortable, SortableContent, SortableItem, SortableItemHandle, SortableOverlay, };
//# sourceMappingURL=sortable.d.ts.map