import * as React from 'react';
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '../../components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../../components/ui/popover';
type FacetedValue<Multiple extends boolean> = Multiple extends true ? string[] : string;
interface FacetedProps<Multiple extends boolean = false> extends React.ComponentProps<typeof Popover> {
    value?: FacetedValue<Multiple>;
    onValueChange?: (value: FacetedValue<Multiple> | undefined) => void;
    children?: React.ReactNode;
    multiple?: Multiple;
}
declare function Faceted<Multiple extends boolean = false>(props: FacetedProps<Multiple>): import("react/jsx-runtime").JSX.Element;
declare function FacetedTrigger(props: React.ComponentProps<typeof PopoverTrigger>): import("react/jsx-runtime").JSX.Element;
interface FacetedBadgeListProps extends React.ComponentProps<'div'> {
    options?: {
        label: string;
        value: string;
    }[];
    max?: number;
    badgeClassName?: string;
    placeholder?: string;
}
declare function FacetedBadgeList(props: FacetedBadgeListProps): import("react/jsx-runtime").JSX.Element;
declare function FacetedContent(props: React.ComponentProps<typeof PopoverContent>): import("react/jsx-runtime").JSX.Element;
declare const FacetedInput: typeof CommandInput;
declare const FacetedList: typeof CommandList;
declare const FacetedEmpty: typeof CommandEmpty;
declare const FacetedGroup: typeof CommandGroup;
interface FacetedItemProps extends React.ComponentProps<typeof CommandItem> {
    value: string;
}
declare function FacetedItem(props: FacetedItemProps): import("react/jsx-runtime").JSX.Element;
declare const FacetedSeparator: typeof CommandSeparator;
export { Faceted, FacetedBadgeList, FacetedContent, FacetedEmpty, FacetedGroup, FacetedInput, FacetedItem, FacetedList, FacetedSeparator, FacetedTrigger, };
//# sourceMappingURL=faceted.d.ts.map