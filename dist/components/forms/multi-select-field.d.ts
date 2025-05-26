import { type MultiSelectProps } from '../ui/multi-select';
import type React from 'react';
export default function MultiSelectField({ labelProps, containerProps, placeHolder, options, multiSelectProps, }: {
    labelProps?: React.ComponentProps<'label'>;
    containerProps?: React.ComponentProps<'div'>;
    options: {
        label: string;
        value: string;
    }[];
    placeHolder?: string;
    multiSelectProps?: Partial<MultiSelectProps> & React.RefAttributes<HTMLButtonElement>;
}): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=multi-select-field.d.ts.map