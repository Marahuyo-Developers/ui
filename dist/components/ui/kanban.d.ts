import type {
  DndContextProps,
  DragEndEvent,
  DragOverlay,
  UniqueIdentifier,
} from '@dnd-kit/core';
import type { SortableContextProps } from '@dnd-kit/sortable';
import type * as React from 'react';
interface GetItemValue<T> {
  /**
   * Callback that returns a unique identifier for each kanban item. Required for array of objects.
   * @example getItemValue={(item) => item.id}
   */
  getItemValue: (item: T) => UniqueIdentifier;
}
type KanbanProps<T> = Omit<DndContextProps, 'collisionDetection'> &
  GetItemValue<T> & {
    value: Record<UniqueIdentifier, T[]>;
    onValueChange?: (columns: Record<UniqueIdentifier, T[]>) => void;
    onMove?: (
      event: DragEndEvent & {
        activeIndex: number;
        overIndex: number;
      },
    ) => void;
    strategy?: SortableContextProps['strategy'];
    orientation?: 'horizontal' | 'vertical';
    flatCursor?: boolean;
  } & (T extends object ? GetItemValue<T> : Partial<GetItemValue<T>>);
declare function Kanban<T>(
  props: KanbanProps<T>,
): import('react/jsx-runtime').JSX.Element;
interface KanbanBoardProps extends React.ComponentPropsWithoutRef<'div'> {
  children: React.ReactNode;
  asChild?: boolean;
}
declare const KanbanBoard: React.ForwardRefExoticComponent<
  KanbanBoardProps & React.RefAttributes<HTMLDivElement>
>;
interface KanbanColumnProps extends React.ComponentPropsWithoutRef<'div'> {
  value: UniqueIdentifier;
  children: React.ReactNode;
  asChild?: boolean;
  asHandle?: boolean;
  disabled?: boolean;
}
declare const KanbanColumn: React.ForwardRefExoticComponent<
  KanbanColumnProps & React.RefAttributes<HTMLDivElement>
>;
interface KanbanColumnHandleProps
  extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}
declare const KanbanColumnHandle: React.ForwardRefExoticComponent<
  KanbanColumnHandleProps & React.RefAttributes<HTMLButtonElement>
>;
interface KanbanItemProps extends React.ComponentPropsWithoutRef<'div'> {
  value: UniqueIdentifier;
  asHandle?: boolean;
  asChild?: boolean;
  disabled?: boolean;
}
declare const KanbanItem: React.ForwardRefExoticComponent<
  KanbanItemProps & React.RefAttributes<HTMLDivElement>
>;
interface KanbanItemHandleProps
  extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}
declare const KanbanItemHandle: React.ForwardRefExoticComponent<
  KanbanItemHandleProps & React.RefAttributes<HTMLButtonElement>
>;
interface KanbanOverlayProps
  extends Omit<React.ComponentPropsWithoutRef<typeof DragOverlay>, 'children'> {
  container?: Element | DocumentFragment | null;
  children?:
    | ((params: {
        value: UniqueIdentifier;
        variant: 'column' | 'item';
      }) => React.ReactNode)
    | React.ReactNode;
}
declare function KanbanOverlay(
  props: KanbanOverlayProps,
): React.ReactPortal | null;
declare const Root: typeof Kanban;
declare const Board: React.ForwardRefExoticComponent<
  KanbanBoardProps & React.RefAttributes<HTMLDivElement>
>;
declare const Column: React.ForwardRefExoticComponent<
  KanbanColumnProps & React.RefAttributes<HTMLDivElement>
>;
declare const ColumnHandle: React.ForwardRefExoticComponent<
  KanbanColumnHandleProps & React.RefAttributes<HTMLButtonElement>
>;
declare const Item: React.ForwardRefExoticComponent<
  KanbanItemProps & React.RefAttributes<HTMLDivElement>
>;
declare const ItemHandle: React.ForwardRefExoticComponent<
  KanbanItemHandleProps & React.RefAttributes<HTMLButtonElement>
>;
declare const Overlay: typeof KanbanOverlay;
export {
  Kanban,
  KanbanBoard,
  KanbanColumn,
  KanbanColumnHandle,
  KanbanItem,
  KanbanItemHandle,
  KanbanOverlay,
  Root,
  Board,
  Column,
  ColumnHandle,
  Item,
  ItemHandle,
  Overlay,
};
//# sourceMappingURL=kanban.d.ts.map
