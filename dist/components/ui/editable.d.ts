import * as React from "react";
type Direction = "ltr" | "rtl";
interface EditableContextValue {
    id: string;
    inputId: string;
    labelId: string;
    defaultValue: string;
    value: string;
    onValueChange: (value: string) => void;
    editing: boolean;
    onCancel: () => void;
    onEdit: () => void;
    onSubmit: (value: string) => void;
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    dir?: Direction;
    maxLength?: number;
    placeholder?: string;
    triggerMode: "click" | "dblclick" | "focus";
    autosize: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    invalid?: boolean;
}
interface EditableRootProps extends Omit<React.ComponentPropsWithoutRef<"div">, "onSubmit"> {
    id?: string;
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
    defaultEditing?: boolean;
    editing?: boolean;
    onEditingChange?: (editing: boolean) => void;
    onCancel?: () => void;
    onEdit?: () => void;
    onSubmit?: (value: string) => void;
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    dir?: Direction;
    maxLength?: number;
    name?: string;
    placeholder?: string;
    triggerMode?: EditableContextValue["triggerMode"];
    asChild?: boolean;
    autosize?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    invalid?: boolean;
}
interface EditableLabelProps extends React.ComponentPropsWithoutRef<"label"> {
    asChild?: boolean;
}
declare const EditableLabel: React.ForwardRefExoticComponent<EditableLabelProps & React.RefAttributes<HTMLLabelElement>>;
interface EditableAreaProps extends React.ComponentPropsWithoutRef<"div"> {
    asChild?: boolean;
}
declare const EditableArea: React.ForwardRefExoticComponent<EditableAreaProps & React.RefAttributes<HTMLDivElement>>;
interface EditablePreviewProps extends React.ComponentPropsWithoutRef<"div"> {
    asChild?: boolean;
}
declare const EditablePreview: React.ForwardRefExoticComponent<EditablePreviewProps & React.RefAttributes<HTMLDivElement>>;
interface EditableInputProps extends React.ComponentPropsWithoutRef<"input"> {
    asChild?: boolean;
    maxLength?: number;
}
declare const EditableInput: React.ForwardRefExoticComponent<EditableInputProps & React.RefAttributes<HTMLInputElement>>;
interface EditableTriggerProps extends React.ComponentPropsWithoutRef<"button"> {
    asChild?: boolean;
    forceMount?: boolean;
}
declare const EditableTrigger: React.ForwardRefExoticComponent<EditableTriggerProps & React.RefAttributes<HTMLButtonElement>>;
interface EditableToolbarProps extends React.ComponentPropsWithoutRef<"div"> {
    asChild?: boolean;
    orientation?: "horizontal" | "vertical";
}
declare const EditableToolbar: React.ForwardRefExoticComponent<EditableToolbarProps & React.RefAttributes<HTMLDivElement>>;
interface EditableCancelProps extends React.ComponentPropsWithoutRef<"button"> {
    asChild?: boolean;
}
declare const EditableCancel: React.ForwardRefExoticComponent<EditableCancelProps & React.RefAttributes<HTMLButtonElement>>;
interface EditableSubmitProps extends React.ComponentPropsWithoutRef<"button"> {
    asChild?: boolean;
}
declare const EditableSubmit: React.ForwardRefExoticComponent<EditableSubmitProps & React.RefAttributes<HTMLButtonElement>>;
declare const Editable: React.ForwardRefExoticComponent<EditableRootProps & React.RefAttributes<HTMLDivElement>>;
declare const Root: React.ForwardRefExoticComponent<EditableRootProps & React.RefAttributes<HTMLDivElement>>;
declare const Label: React.ForwardRefExoticComponent<EditableLabelProps & React.RefAttributes<HTMLLabelElement>>;
declare const Area: React.ForwardRefExoticComponent<EditableAreaProps & React.RefAttributes<HTMLDivElement>>;
declare const Preview: React.ForwardRefExoticComponent<EditablePreviewProps & React.RefAttributes<HTMLDivElement>>;
declare const Input: React.ForwardRefExoticComponent<EditableInputProps & React.RefAttributes<HTMLInputElement>>;
declare const Trigger: React.ForwardRefExoticComponent<EditableTriggerProps & React.RefAttributes<HTMLButtonElement>>;
declare const Toolbar: React.ForwardRefExoticComponent<EditableToolbarProps & React.RefAttributes<HTMLDivElement>>;
declare const Cancel: React.ForwardRefExoticComponent<EditableCancelProps & React.RefAttributes<HTMLButtonElement>>;
declare const Submit: React.ForwardRefExoticComponent<EditableSubmitProps & React.RefAttributes<HTMLButtonElement>>;
export { Editable, EditableLabel, EditableArea, EditablePreview, EditableInput, EditableToolbar, EditableCancel, EditableSubmit, EditableTrigger, Root, Label, Area, Preview, Input, Toolbar, Cancel, Submit, Trigger, };
//# sourceMappingURL=editable.d.ts.map