import type { SelectProps } from '@radix-ui/react-select';
export default function SingleSelectField({ labelProps, containerProps, placeHolder, options, selectProps, }: {
    labelProps?: React.ComponentProps<'label'>;
    containerProps?: React.ComponentProps<'div'>;
    options: {
        label: string;
        value: string;
    }[];
    placeHolder?: string;
    selectProps?: React.ComponentProps<React.FC<SelectProps>>;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=single-select-field.d.ts.map