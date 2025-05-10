import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const alertVariants: (props?: ({
    variant?: "default" | "destructive" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare function Alert({ className, variant, ...props }: React.ComponentProps<'div'> & VariantProps<typeof alertVariants>): any;
declare function AlertTitle({ className, ...props }: React.ComponentProps<'div'>): any;
declare function AlertDescription({ className, ...props }: React.ComponentProps<'div'>): any;
export { Alert, AlertTitle, AlertDescription };
//# sourceMappingURL=alert.d.ts.map