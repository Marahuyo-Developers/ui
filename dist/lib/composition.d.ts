import * as React from 'react';
/**
 * A utility to compose multiple event handlers into a single event handler.
 * Run originalEventHandler first, then ourEventHandler unless prevented.
 */
declare function composeEventHandlers<E>(originalEventHandler?: (event: E) => void, ourEventHandler?: (event: E) => void, { checkForDefaultPrevented }?: {
    checkForDefaultPrevented?: boolean | undefined;
}): (event: E) => void;
/**
 * @see https://github.com/radix-ui/primitives/blob/main/packages/react/compose-refs/src/compose-refs.tsx
 */
type PossibleRef<T> = React.Ref<T> | undefined;
/**
 * A utility to compose multiple refs together.
 * Accepts callback refs and RefObject(s).
 */
declare function composeRefs<T>(...refs: PossibleRef<T>[]): React.RefCallback<T>;
/**
 * A custom hook that composes multiple refs.
 * Accepts callback refs and RefObject(s).
 */
declare function useComposedRefs<T>(...refs: PossibleRef<T>[]): React.RefCallback<T>;
export { composeEventHandlers, composeRefs, useComposedRefs };
//# sourceMappingURL=composition.d.ts.map