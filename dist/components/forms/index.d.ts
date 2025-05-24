import type { buttonVariants } from '../ui/button';
import type { VariantProps } from 'class-variance-authority';
export declare function SubscribeButton({
  buttonProps,
}: {
  buttonProps?: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
      isLoading?: boolean;
      loadingIcon?: React.ReactElement;
      block?: boolean;
      iconPosition?: 'start' | 'end';
    };
}): import('react/jsx-runtime').JSX.Element;
export declare const fieldContext: import('react').Context<
    import('@tanstack/form-core').AnyFieldApi
  >,
  formContext: import('react').Context<
    import('@tanstack/form-core').AnyFormApi
  >,
  useFieldContext: <TData>() => import('@tanstack/form-core').FieldApi<
    any,
    string,
    TData,
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
  useFormContext: () => import('@tanstack/react-form').ReactFormExtendedApi<
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
export declare const useAppForm: <
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
  > &
  NoInfer<{
    readonly SubscribeButton: typeof SubscribeButton;
  }> & {
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
        readonly TextInputField: import('react').LazyExoticComponent<
          typeof import('./text-input-field').default
        >;
        readonly SingleSelectField: import('react').LazyExoticComponent<
          typeof import('./single-select-field').default
        >;
        readonly TextAreaInputField: import('react').LazyExoticComponent<
          typeof import('./text-area-field').default
        >;
        readonly MultiSelectField: import('react').LazyExoticComponent<
          typeof import('./multi-select-field').default
        >;
        readonly SingleDateInputField: import('react').LazyExoticComponent<
          typeof import('./single-date-input-field').default
        >;
        readonly FileUploadField: import('react').LazyExoticComponent<
          typeof import('./file-upload-field').default
        >;
      }>
    >;
    AppForm: import('react').ComponentType<import('react').PropsWithChildren>;
  };
//# sourceMappingURL=index.d.ts.map
