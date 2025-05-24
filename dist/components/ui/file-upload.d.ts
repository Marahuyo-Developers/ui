import type * as React from 'react';
type Direction = 'ltr' | 'rtl';
interface FileState {
  file: File;
  progress: number;
  error?: string;
  status: 'idle' | 'uploading' | 'error' | 'success';
}
interface StoreState {
  files: Map<File, FileState>;
  dragOver: boolean;
  invalid: boolean;
}
declare function useStore<T>(selector: (state: StoreState) => T): T;
export interface FileUploadRootProps
  extends Omit<
    React.ComponentPropsWithoutRef<'div'>,
    'defaultValue' | 'onChange'
  > {
  value?: File[];
  defaultValue?: File[];
  onValueChange?: (files: File[]) => void;
  onAccept?: (files: File[]) => void;
  onFileAccept?: (file: File) => void;
  onFileReject?: (file: File, message: string) => void;
  onFileValidate?: (file: File) => string | null | undefined;
  onUpload?: (
    files: File[],
    options: {
      onProgress: (file: File, progress: number) => void;
      onSuccess: (file: File) => void;
      onError: (file: File, error: Error) => void;
    },
  ) => Promise<void> | void;
  accept?: string;
  maxFiles?: number;
  maxSize?: number;
  dir?: Direction;
  label?: string;
  name?: string;
  asChild?: boolean;
  disabled?: boolean;
  invalid?: boolean;
  multiple?: boolean;
  required?: boolean;
}
interface FileUploadDropzoneProps
  extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
}
declare const FileUploadDropzone: React.ForwardRefExoticComponent<
  FileUploadDropzoneProps & React.RefAttributes<HTMLDivElement>
>;
interface FileUploadTriggerProps
  extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}
declare const FileUploadTrigger: React.ForwardRefExoticComponent<
  FileUploadTriggerProps & React.RefAttributes<HTMLButtonElement>
>;
interface FileUploadListProps extends React.ComponentPropsWithoutRef<'div'> {
  orientation?: 'horizontal' | 'vertical';
  asChild?: boolean;
  forceMount?: boolean;
}
declare const FileUploadList: React.ForwardRefExoticComponent<
  FileUploadListProps & React.RefAttributes<HTMLDivElement>
>;
interface FileUploadItemProps extends React.ComponentPropsWithoutRef<'div'> {
  value: File;
  asChild?: boolean;
}
declare const FileUploadItem: React.ForwardRefExoticComponent<
  FileUploadItemProps & React.RefAttributes<HTMLDivElement>
>;
interface FileUploadItemPreviewProps
  extends React.ComponentPropsWithoutRef<'div'> {
  render?: (file: File) => React.ReactNode;
  asChild?: boolean;
}
declare const FileUploadItemPreview: React.ForwardRefExoticComponent<
  FileUploadItemPreviewProps & React.RefAttributes<HTMLDivElement>
>;
interface FileUploadItemMetadataProps
  extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  size?: 'default' | 'sm';
}
declare const FileUploadItemMetadata: React.ForwardRefExoticComponent<
  FileUploadItemMetadataProps & React.RefAttributes<HTMLDivElement>
>;
interface FileUploadItemProgressProps
  extends React.ComponentPropsWithoutRef<'div'> {
  asChild?: boolean;
  variant?: 'linear' | 'circular' | 'fill';
  size?: number;
  forceMount?: boolean;
}
declare const FileUploadItemProgress: React.ForwardRefExoticComponent<
  FileUploadItemProgressProps & React.RefAttributes<HTMLDivElement>
>;
interface FileUploadItemDeleteProps
  extends React.ComponentPropsWithoutRef<'button'> {
  asChild?: boolean;
}
declare const FileUploadItemDelete: React.ForwardRefExoticComponent<
  FileUploadItemDeleteProps & React.RefAttributes<HTMLButtonElement>
>;
interface FileUploadClearProps
  extends React.ComponentPropsWithoutRef<'button'> {
  forceMount?: boolean;
  asChild?: boolean;
}
declare const FileUploadClear: React.ForwardRefExoticComponent<
  FileUploadClearProps & React.RefAttributes<HTMLButtonElement>
>;
declare const FileUpload: React.ForwardRefExoticComponent<
  FileUploadRootProps & React.RefAttributes<HTMLDivElement>
>;
declare const Root: React.ForwardRefExoticComponent<
  FileUploadRootProps & React.RefAttributes<HTMLDivElement>
>;
declare const Trigger: React.ForwardRefExoticComponent<
  FileUploadTriggerProps & React.RefAttributes<HTMLButtonElement>
>;
declare const Dropzone: React.ForwardRefExoticComponent<
  FileUploadDropzoneProps & React.RefAttributes<HTMLDivElement>
>;
declare const List: React.ForwardRefExoticComponent<
  FileUploadListProps & React.RefAttributes<HTMLDivElement>
>;
declare const Item: React.ForwardRefExoticComponent<
  FileUploadItemProps & React.RefAttributes<HTMLDivElement>
>;
declare const ItemPreview: React.ForwardRefExoticComponent<
  FileUploadItemPreviewProps & React.RefAttributes<HTMLDivElement>
>;
declare const ItemMetadata: React.ForwardRefExoticComponent<
  FileUploadItemMetadataProps & React.RefAttributes<HTMLDivElement>
>;
declare const ItemProgress: React.ForwardRefExoticComponent<
  FileUploadItemProgressProps & React.RefAttributes<HTMLDivElement>
>;
declare const ItemDelete: React.ForwardRefExoticComponent<
  FileUploadItemDeleteProps & React.RefAttributes<HTMLButtonElement>
>;
declare const Clear: React.ForwardRefExoticComponent<
  FileUploadClearProps & React.RefAttributes<HTMLButtonElement>
>;
export {
  FileUpload,
  FileUploadDropzone,
  FileUploadTrigger,
  FileUploadList,
  FileUploadItem,
  FileUploadItemPreview,
  FileUploadItemMetadata,
  FileUploadItemProgress,
  FileUploadItemDelete,
  FileUploadClear,
  Root,
  Dropzone,
  Trigger,
  List,
  Item,
  ItemPreview,
  ItemMetadata,
  ItemProgress,
  ItemDelete,
  Clear,
  useStore as useFileUpload,
};
//# sourceMappingURL=file-upload.d.ts.map
