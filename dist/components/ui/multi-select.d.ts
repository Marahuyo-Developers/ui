import React, { type ComponentPropsWithoutRef } from 'react';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import { Primitive } from '@radix-ui/react-primitive';
import { CommandItem } from './command';
export interface MultiSelectOptionItem {
    value: string;
    label?: React.ReactNode;
}
type MultiSelectProps = React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Root> & {
    value?: string[];
    onValueChange?(value: string[], items: MultiSelectOptionItem[]): void;
    onSelect?(value: string, item: MultiSelectOptionItem): void;
    onDeselect?(value: string, item: MultiSelectOptionItem): void;
    defaultValue?: string[];
    onSearch?(keyword: string | undefined): void;
    filter?: boolean | ((keyword: string, current: string) => boolean);
    disabled?: boolean;
    maxCount?: number;
};
declare const MultiSelect: React.FC<MultiSelectProps>;
interface MultiSelectTriggerProps extends ComponentPropsWithoutRef<typeof Primitive.div> {
}
declare const MultiSelectTrigger: React.ForwardRefExoticComponent<MultiSelectTriggerProps & React.RefAttributes<HTMLDivElement>>;
interface MultiSelectValueProps extends ComponentPropsWithoutRef<typeof Primitive.div> {
    placeholder?: string;
    maxDisplay?: number;
    maxItemLength?: number;
}
declare const MultiSelectValue: React.ForwardRefExoticComponent<MultiSelectValueProps & React.RefAttributes<HTMLDivElement>>;
declare const MultiSelectSearch: React.ForwardRefExoticComponent<Omit<Omit<Pick<Pick<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, "key" | keyof React.InputHTMLAttributes<HTMLInputElement>> & {
    ref?: React.Ref<HTMLInputElement>;
} & {
    asChild?: boolean;
}, "key" | "asChild" | keyof React.InputHTMLAttributes<HTMLInputElement>>, "onChange" | "type" | "value"> & {
    value?: string;
    onValueChange?: (search: string) => void;
} & React.RefAttributes<HTMLInputElement>, "ref"> & React.RefAttributes<HTMLInputElement>>;
declare const MultiSelectList: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | keyof React.HTMLAttributes<HTMLDivElement> | "asChild"> & {
    label?: string;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
interface MultiSelectContentProps extends ComponentPropsWithoutRef<typeof PopoverPrimitive.Content> {
}
declare const MultiSelectContent: React.ForwardRefExoticComponent<MultiSelectContentProps & React.RefAttributes<HTMLDivElement>>;
type MultiSelectItemProps = ComponentPropsWithoutRef<typeof CommandItem> & Partial<MultiSelectOptionItem> & {
    onSelect?: (value: string, item: MultiSelectOptionItem) => void;
    onDeselect?: (value: string, item: MultiSelectOptionItem) => void;
};
declare const MultiSelectItem: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Omit<Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | keyof React.HTMLAttributes<HTMLDivElement> | "asChild">, "onSelect" | "value" | "disabled"> & {
    disabled?: boolean;
    onSelect?: (value: string) => void;
    value?: string;
    keywords?: string[];
    forceMount?: boolean;
} & React.RefAttributes<HTMLDivElement>, "ref"> & Partial<MultiSelectOptionItem> & {
    onSelect?: (value: string, item: MultiSelectOptionItem) => void;
    onDeselect?: (value: string, item: MultiSelectOptionItem) => void;
} & React.RefAttributes<HTMLDivElement>>;
declare const MultiSelectGroup: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Omit<Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | keyof React.HTMLAttributes<HTMLDivElement> | "asChild">, "heading" | "value"> & {
    heading?: React.ReactNode;
    value?: string;
    forceMount?: boolean;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const MultiSelectSeparator: React.ForwardRefExoticComponent<Omit<Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | keyof React.HTMLAttributes<HTMLDivElement> | "asChild"> & {
    alwaysRender?: boolean;
} & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
declare const MultiSelectEmpty: React.ForwardRefExoticComponent<Omit<{
    children?: React.ReactNode;
} & Pick<Pick<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>, "key" | keyof React.HTMLAttributes<HTMLDivElement>> & {
    ref?: React.Ref<HTMLDivElement>;
} & {
    asChild?: boolean;
}, "key" | keyof React.HTMLAttributes<HTMLDivElement> | "asChild"> & React.RefAttributes<HTMLDivElement>, "ref"> & React.RefAttributes<HTMLDivElement>>;
export interface MultiSelectOptionSeparator {
    type: 'separator';
}
export interface MultiSelectOptionGroup {
    heading?: React.ReactNode;
    value?: string;
    children: MultiSelectOption[];
}
export type MultiSelectOption = Pick<MultiSelectItemProps, 'value' | 'label' | 'disabled' | 'onSelect' | 'onDeselect'> | MultiSelectOptionSeparator | MultiSelectOptionGroup;
declare const renderMultiSelectOptions: (list: MultiSelectOption[]) => (import("react/jsx-runtime").JSX.Element | null)[];
export { MultiSelect, MultiSelectTrigger, MultiSelectValue, MultiSelectSearch, MultiSelectContent, MultiSelectList, MultiSelectItem, MultiSelectGroup, MultiSelectSeparator, MultiSelectEmpty, renderMultiSelectOptions, };
//# sourceMappingURL=multi-select.d.ts.map