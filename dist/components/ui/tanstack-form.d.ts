import type { Slot } from '@radix-ui/react-slot';
import type * as React from 'react';
import type { Label } from './label';
declare const useFormContext: () => import(
  '@tanstack/react-form',
).ReactFormExtendedApi<
  Record<string, never>,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>;
declare const useAppForm: <
    TFormData,
    TOnMount extends
      | import('@tanstack/form-core').FormValidateOrFn<TFormData>
      | undefined,
    TOnChange extends
      | import('@tanstack/form-core').FormValidateOrFn<TFormData>
      | undefined,
    TOnChangeAsync extends
      | import('@tanstack/form-core').FormAsyncValidateOrFn<TFormData>
      | undefined,
    TOnBlur extends
      | import('@tanstack/form-core').FormValidateOrFn<TFormData>
      | undefined,
    TOnBlurAsync extends
      | import('@tanstack/form-core').FormAsyncValidateOrFn<TFormData>
      | undefined,
    TOnSubmit extends
      | import('@tanstack/form-core').FormValidateOrFn<TFormData>
      | undefined,
    TOnSubmitAsync extends
      | import('@tanstack/form-core').FormAsyncValidateOrFn<TFormData>
      | undefined,
    TOnServer extends
      | import('@tanstack/form-core').FormAsyncValidateOrFn<TFormData>
      | undefined,
    TSubmitMeta,
  >(
    props: import('@tanstack/form-core').FormOptions<
      TFormData,
      TOnMount,
      TOnChange,
      TOnChangeAsync,
      TOnBlur,
      TOnBlurAsync,
      TOnSubmit,
      TOnSubmitAsync,
      TOnServer,
      TSubmitMeta
    >,
  ) => import('@tanstack/form-core').FormApi<
    TFormData,
    TOnMount,
    TOnChange,
    TOnChangeAsync,
    TOnBlur,
    TOnBlurAsync,
    TOnSubmit,
    TOnSubmitAsync,
    TOnServer,
    TSubmitMeta
  > &
    import('@tanstack/react-form').ReactFormApi<
      TFormData,
      TOnMount,
      TOnChange,
      TOnChangeAsync,
      TOnBlur,
      TOnBlurAsync,
      TOnSubmit,
      TOnSubmitAsync,
      TOnServer,
      TSubmitMeta
    > & {
      AppField: import('@tanstack/react-form').FieldComponent<
        TFormData,
        TOnMount,
        TOnChange,
        TOnChangeAsync,
        TOnBlur,
        TOnBlurAsync,
        TOnSubmit,
        TOnSubmitAsync,
        TOnServer,
        TSubmitMeta,
        NoInfer<{
          readonly FormLabel: typeof FormLabel;
          readonly FormControl: typeof FormControl;
          readonly FormDescription: typeof FormDescription;
          readonly FormMessage: typeof FormMessage;
          readonly FormItem: typeof FormItem;
        }>
      >;
      AppForm: React.ComponentType<React.PropsWithChildren>;
    },
  withForm: <
    TFormData,
    TOnMount extends
      | import('@tanstack/form-core').FormValidateOrFn<TFormData>
      | undefined,
    TOnChange extends
      | import('@tanstack/form-core').FormValidateOrFn<TFormData>
      | undefined,
    TOnChangeAsync extends
      | import('@tanstack/form-core').FormAsyncValidateOrFn<TFormData>
      | undefined,
    TOnBlur extends
      | import('@tanstack/form-core').FormValidateOrFn<TFormData>
      | undefined,
    TOnBlurAsync extends
      | import('@tanstack/form-core').FormAsyncValidateOrFn<TFormData>
      | undefined,
    TOnSubmit extends
      | import('@tanstack/form-core').FormValidateOrFn<TFormData>
      | undefined,
    TOnSubmitAsync extends
      | import('@tanstack/form-core').FormAsyncValidateOrFn<TFormData>
      | undefined,
    TOnServer extends
      | import('@tanstack/form-core').FormAsyncValidateOrFn<TFormData>
      | undefined,
    TSubmitMeta,
    TRenderProps extends Record<string, unknown> = {},
  >({
    render,
    props,
  }: import('@tanstack/react-form').WithFormProps<
    TFormData,
    TOnMount,
    TOnChange,
    TOnChangeAsync,
    TOnBlur,
    TOnBlurAsync,
    TOnSubmit,
    TOnSubmitAsync,
    TOnServer,
    TSubmitMeta,
    {
      readonly FormLabel: typeof FormLabel;
      readonly FormControl: typeof FormControl;
      readonly FormDescription: typeof FormDescription;
      readonly FormMessage: typeof FormMessage;
      readonly FormItem: typeof FormItem;
    },
    {},
    TRenderProps
  >) => (
    props: React.PropsWithChildren<
      NoInfer<[unknown] extends [TRenderProps] ? any : TRenderProps> & {
        form: import('@tanstack/form-core').FormApi<
          [unknown] extends [TFormData] ? any : TFormData,
          [
            | import('@tanstack/form-core').FormValidateOrFn<TFormData>
            | undefined,
          ] extends [TOnMount]
            ? [TOnMount] extends [
                TOnMount &
                  (
                    | import('@tanstack/form-core').FormValidateOrFn<TFormData>
                    | undefined
                  ),
              ]
              ? any
              : TOnMount
            : TOnMount,
          [
            | import('@tanstack/form-core').FormValidateOrFn<TFormData>
            | undefined,
          ] extends [TOnChange]
            ? [TOnChange] extends [
                TOnChange &
                  (
                    | import('@tanstack/form-core').FormValidateOrFn<TFormData>
                    | undefined
                  ),
              ]
              ? any
              : TOnChange
            : TOnChange,
          [
            | import('@tanstack/form-core').FormValidateOrFn<TFormData>
            | undefined,
          ] extends [TOnChangeAsync]
            ? [TOnChangeAsync] extends [
                TOnChangeAsync &
                  (
                    | import('@tanstack/form-core').FormValidateOrFn<TFormData>
                    | undefined
                  ),
              ]
              ? any
              : TOnChangeAsync
            : TOnChangeAsync,
          [
            | import('@tanstack/form-core').FormValidateOrFn<TFormData>
            | undefined,
          ] extends [TOnBlur]
            ? [TOnBlur] extends [
                TOnBlur &
                  (
                    | import('@tanstack/form-core').FormValidateOrFn<TFormData>
                    | undefined
                  ),
              ]
              ? any
              : TOnBlur
            : TOnBlur,
          [
            | import('@tanstack/form-core').FormValidateOrFn<TFormData>
            | undefined,
          ] extends [TOnBlurAsync]
            ? [TOnBlurAsync] extends [
                TOnBlurAsync &
                  (
                    | import('@tanstack/form-core').FormValidateOrFn<TFormData>
                    | undefined
                  ),
              ]
              ? any
              : TOnBlurAsync
            : TOnBlurAsync,
          [
            | import('@tanstack/form-core').FormValidateOrFn<TFormData>
            | undefined,
          ] extends [TOnSubmit]
            ? [TOnSubmit] extends [
                TOnSubmit &
                  (
                    | import('@tanstack/form-core').FormValidateOrFn<TFormData>
                    | undefined
                  ),
              ]
              ? any
              : TOnSubmit
            : TOnSubmit,
          [
            | import('@tanstack/form-core').FormValidateOrFn<TFormData>
            | undefined,
          ] extends [TOnSubmitAsync]
            ? [TOnSubmitAsync] extends [
                TOnSubmitAsync &
                  (
                    | import('@tanstack/form-core').FormValidateOrFn<TFormData>
                    | undefined
                  ),
              ]
              ? any
              : TOnSubmitAsync
            : TOnSubmitAsync,
          [
            | import('@tanstack/form-core').FormValidateOrFn<TFormData>
            | undefined,
          ] extends [TOnServer]
            ? [TOnServer] extends [
                TOnServer &
                  (
                    | import('@tanstack/form-core').FormValidateOrFn<TFormData>
                    | undefined
                  ),
              ]
              ? any
              : TOnServer
            : TOnServer,
          [unknown] extends [TSubmitMeta] ? any : TSubmitMeta
        > &
          import('@tanstack/react-form').ReactFormApi<
            [unknown] extends [TFormData] ? any : TFormData,
            [
              | import('@tanstack/form-core').FormValidateOrFn<TFormData>
              | undefined,
            ] extends [TOnMount]
              ? [TOnMount] extends [
                  TOnMount &
                    (
                      | import(
                          '@tanstack/form-core',
                        ).FormValidateOrFn<TFormData>
                      | undefined
                    ),
                ]
                ? any
                : TOnMount
              : TOnMount,
            [
              | import('@tanstack/form-core').FormValidateOrFn<TFormData>
              | undefined,
            ] extends [TOnChange]
              ? [TOnChange] extends [
                  TOnChange &
                    (
                      | import(
                          '@tanstack/form-core',
                        ).FormValidateOrFn<TFormData>
                      | undefined
                    ),
                ]
                ? any
                : TOnChange
              : TOnChange,
            [
              | import('@tanstack/form-core').FormValidateOrFn<TFormData>
              | undefined,
            ] extends [TOnChangeAsync]
              ? [TOnChangeAsync] extends [
                  TOnChangeAsync &
                    (
                      | import(
                          '@tanstack/form-core',
                        ).FormValidateOrFn<TFormData>
                      | undefined
                    ),
                ]
                ? any
                : TOnChangeAsync
              : TOnChangeAsync,
            [
              | import('@tanstack/form-core').FormValidateOrFn<TFormData>
              | undefined,
            ] extends [TOnBlur]
              ? [TOnBlur] extends [
                  TOnBlur &
                    (
                      | import(
                          '@tanstack/form-core',
                        ).FormValidateOrFn<TFormData>
                      | undefined
                    ),
                ]
                ? any
                : TOnBlur
              : TOnBlur,
            [
              | import('@tanstack/form-core').FormValidateOrFn<TFormData>
              | undefined,
            ] extends [TOnBlurAsync]
              ? [TOnBlurAsync] extends [
                  TOnBlurAsync &
                    (
                      | import(
                          '@tanstack/form-core',
                        ).FormValidateOrFn<TFormData>
                      | undefined
                    ),
                ]
                ? any
                : TOnBlurAsync
              : TOnBlurAsync,
            [
              | import('@tanstack/form-core').FormValidateOrFn<TFormData>
              | undefined,
            ] extends [TOnSubmit]
              ? [TOnSubmit] extends [
                  TOnSubmit &
                    (
                      | import(
                          '@tanstack/form-core',
                        ).FormValidateOrFn<TFormData>
                      | undefined
                    ),
                ]
                ? any
                : TOnSubmit
              : TOnSubmit,
            [
              | import('@tanstack/form-core').FormValidateOrFn<TFormData>
              | undefined,
            ] extends [TOnSubmitAsync]
              ? [TOnSubmitAsync] extends [
                  TOnSubmitAsync &
                    (
                      | import(
                          '@tanstack/form-core',
                        ).FormValidateOrFn<TFormData>
                      | undefined
                    ),
                ]
                ? any
                : TOnSubmitAsync
              : TOnSubmitAsync,
            [
              | import('@tanstack/form-core').FormValidateOrFn<TFormData>
              | undefined,
            ] extends [TOnServer]
              ? [TOnServer] extends [
                  TOnServer &
                    (
                      | import(
                          '@tanstack/form-core',
                        ).FormValidateOrFn<TFormData>
                      | undefined
                    ),
                ]
                ? any
                : TOnServer
              : TOnServer,
            [unknown] extends [TSubmitMeta] ? any : TSubmitMeta
          > & {
            AppField: import('@tanstack/react-form').FieldComponent<
              [unknown] extends [TFormData] ? any : TFormData,
              [
                | import('@tanstack/form-core').FormValidateOrFn<TFormData>
                | undefined,
              ] extends [TOnMount]
                ? [TOnMount] extends [
                    TOnMount &
                      (
                        | import(
                            '@tanstack/form-core',
                          ).FormValidateOrFn<TFormData>
                        | undefined
                      ),
                  ]
                  ? any
                  : TOnMount
                : TOnMount,
              [
                | import('@tanstack/form-core').FormValidateOrFn<TFormData>
                | undefined,
              ] extends [TOnChange]
                ? [TOnChange] extends [
                    TOnChange &
                      (
                        | import(
                            '@tanstack/form-core',
                          ).FormValidateOrFn<TFormData>
                        | undefined
                      ),
                  ]
                  ? any
                  : TOnChange
                : TOnChange,
              [
                | import('@tanstack/form-core').FormValidateOrFn<TFormData>
                | undefined,
              ] extends [TOnChangeAsync]
                ? [TOnChangeAsync] extends [
                    TOnChangeAsync &
                      (
                        | import(
                            '@tanstack/form-core',
                          ).FormValidateOrFn<TFormData>
                        | undefined
                      ),
                  ]
                  ? any
                  : TOnChangeAsync
                : TOnChangeAsync,
              [
                | import('@tanstack/form-core').FormValidateOrFn<TFormData>
                | undefined,
              ] extends [TOnBlur]
                ? [TOnBlur] extends [
                    TOnBlur &
                      (
                        | import(
                            '@tanstack/form-core',
                          ).FormValidateOrFn<TFormData>
                        | undefined
                      ),
                  ]
                  ? any
                  : TOnBlur
                : TOnBlur,
              [
                | import('@tanstack/form-core').FormValidateOrFn<TFormData>
                | undefined,
              ] extends [TOnBlurAsync]
                ? [TOnBlurAsync] extends [
                    TOnBlurAsync &
                      (
                        | import(
                            '@tanstack/form-core',
                          ).FormValidateOrFn<TFormData>
                        | undefined
                      ),
                  ]
                  ? any
                  : TOnBlurAsync
                : TOnBlurAsync,
              [
                | import('@tanstack/form-core').FormValidateOrFn<TFormData>
                | undefined,
              ] extends [TOnSubmit]
                ? [TOnSubmit] extends [
                    TOnSubmit &
                      (
                        | import(
                            '@tanstack/form-core',
                          ).FormValidateOrFn<TFormData>
                        | undefined
                      ),
                  ]
                  ? any
                  : TOnSubmit
                : TOnSubmit,
              [
                | import('@tanstack/form-core').FormValidateOrFn<TFormData>
                | undefined,
              ] extends [TOnSubmitAsync]
                ? [TOnSubmitAsync] extends [
                    TOnSubmitAsync &
                      (
                        | import(
                            '@tanstack/form-core',
                          ).FormValidateOrFn<TFormData>
                        | undefined
                      ),
                  ]
                  ? any
                  : TOnSubmitAsync
                : TOnSubmitAsync,
              [
                | import('@tanstack/form-core').FormValidateOrFn<TFormData>
                | undefined,
              ] extends [TOnServer]
                ? [TOnServer] extends [
                    TOnServer &
                      (
                        | import(
                            '@tanstack/form-core',
                          ).FormValidateOrFn<TFormData>
                        | undefined
                      ),
                  ]
                  ? any
                  : TOnServer
                : TOnServer,
              [unknown] extends [TSubmitMeta] ? any : TSubmitMeta,
              NoInfer<{
                readonly FormLabel: typeof FormLabel;
                readonly FormControl: typeof FormControl;
                readonly FormDescription: typeof FormDescription;
                readonly FormMessage: typeof FormMessage;
                readonly FormItem: typeof FormItem;
              }>
            >;
            AppForm: React.ComponentType<React.PropsWithChildren>;
          };
      }
    >,
  ) => React.JSX.Element;
declare function FormItem({
  className,
  ...props
}: React.ComponentProps<'div'>): import('react/jsx-runtime').JSX.Element;
declare const useFieldContext: () => {
  form: import('@tanstack/form-core').FormApi<
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
  >;
  options: import('@tanstack/form-core').FieldApiOptions<
    any,
    string,
    unknown,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
  >;
  timeoutIds: {
    validations: Record<
      import('@tanstack/form-core').ValidationCause,
      ReturnType<typeof setTimeout> | null
    >;
    listeners: Record<
      import('@tanstack/form-core').ListenerCause,
      ReturnType<typeof setTimeout> | null
    >;
    formListeners: Record<
      import('@tanstack/form-core').ListenerCause,
      ReturnType<typeof setTimeout> | null
    >;
  };
  mount: () => () => void;
  update: (
    opts: import('@tanstack/form-core').FieldApiOptions<
      any,
      string,
      unknown,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any
    >,
  ) => void;
  getValue: () => unknown;
  setValue: (
    updater: unknown,
    options?: import('@tanstack/form-core').UpdateMetaOptions,
  ) => void;
  getMeta: () => import('@tanstack/form-core').FieldMeta<
    any,
    string,
    unknown,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any,
    any
  >;
  setMeta: (
    updater: import('@tanstack/form-core').Updater<
      import('@tanstack/form-core').FieldMetaBase<
        any,
        string,
        unknown,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any,
        any
      >
    >,
  ) => void;
  getInfo: () => import('@tanstack/form-core').FieldInfo<any>;
  pushValue: (
    value: never,
    opts?: import('@tanstack/form-core').UpdateMetaOptions,
  ) => void;
  insertValue: (
    index: number,
    value: never,
    opts?: import('@tanstack/form-core').UpdateMetaOptions,
  ) => void;
  replaceValue: (
    index: number,
    value: never,
    opts?: import('@tanstack/form-core').UpdateMetaOptions,
  ) => void;
  removeValue: (
    index: number,
    opts?: import('@tanstack/form-core').UpdateMetaOptions,
  ) => void;
  swapValues: (
    aIndex: number,
    bIndex: number,
    opts?: import('@tanstack/form-core').UpdateMetaOptions,
  ) => void;
  moveValue: (
    aIndex: number,
    bIndex: number,
    opts?: import('@tanstack/form-core').UpdateMetaOptions,
  ) => void;
  getLinkedFields: (
    cause: import('@tanstack/form-core').ValidationCause,
  ) => import('@tanstack/form-core').AnyFieldApi[];
  validateSync: (
    cause: import('@tanstack/form-core').ValidationCause,
    errorFromForm: import('@tanstack/form-core').ValidationErrorMap,
  ) => {
    hasErrored: boolean;
  };
  validateAsync: (
    cause: import('@tanstack/form-core').ValidationCause,
    formValidationResultPromise: Promise<
      Partial<
        Record<
          string,
          import('@tanstack/form-core').ValidationErrorMap<
            any,
            any,
            any,
            any,
            any,
            any,
            any
          >
        >
      >
    >,
  ) => Promise<unknown[]>;
  validate: (
    cause: import('@tanstack/form-core').ValidationCause,
    opts?: {
      skipFormValidation?: boolean;
    },
  ) =>
    | import('@tanstack/form-core').ValidationError[]
    | Promise<import('@tanstack/form-core').ValidationError[]>;
  handleChange: (updater: unknown) => void;
  handleBlur: () => void;
  parseValueWithSchema: (
    schema: import('@tanstack/form-core').StandardSchemaV1<unknown, unknown>,
  ) => import('@tanstack/form-core').StandardSchemaV1Issue[] | undefined;
  parseValueWithSchemaAsync: (
    schema: import('@tanstack/form-core').StandardSchemaV1<unknown, unknown>,
  ) => Promise<
    import('@tanstack/form-core').StandardSchemaV1Issue[] | undefined
  >;
  id: string;
  name: string;
  formItemId: string;
  formDescriptionId: string;
  formMessageId: string;
  errors: any[];
  store: import('@tanstack/store').Derived<
    import('@tanstack/form-core').FieldState<
      any,
      string,
      unknown,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any,
      any
    >,
    readonly any[]
  >;
};
declare function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>): import('react/jsx-runtime').JSX.Element;
declare function FormControl({
  ...props
}: React.ComponentProps<typeof Slot>): import('react/jsx-runtime').JSX.Element;
declare function FormDescription({
  className,
  ...props
}: React.ComponentProps<'p'>): import('react/jsx-runtime').JSX.Element;
declare function FormMessage({
  className,
  ...props
}: React.ComponentProps<'p'>): import('react/jsx-runtime').JSX.Element | null;
export { useAppForm, useFormContext, useFieldContext, withForm };
//# sourceMappingURL=tanstack-form.d.ts.map
