import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadList,
  FileUploadTrigger,
  type FileUploadRootProps,
} from '@/components/ui/file-upload';
import { cn } from '@/lib/utils';
import { useFieldContext } from '.';
import { Label } from '../ui/label';
import { Upload, X } from 'lucide-react';
import { Button } from '../ui/button';

export default function FileUploadField({
  labelProps,
  containerProps,
  fileUploadProps,
}: {
  labelProps?: React.ComponentProps<'label'>;
  fileUploadProps?: FileUploadRootProps;
  containerProps?: React.ComponentProps<'div'>;
}) {
  const field = useFieldContext<File[]>();
  return (
    <div
      className={cn(
        'grid w-full items-center gap-2.5',
        containerProps?.className,
      )}
      {...containerProps}
    >
      <Label className="pb-1.5" {...labelProps} />
      <FileUpload
        {...fileUploadProps}
        onValueChange={field.handleChange}
        value={field.state.value}
      >
        <FileUploadDropzone>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center justify-center rounded-full border p-2.5">
              <Upload className="size-6 text-muted-foreground" />
            </div>
            <p className="font-medium text-sm">
              Drag & drop{' '}
              {(fileUploadProps?.maxFiles || 0) > 1 ? 'files' : 'file'} here
            </p>
            <p className="text-muted-foreground text-xs">
              Or click to browse{' '}
              {fileUploadProps?.maxFiles &&
                `(max ${fileUploadProps?.maxFiles} files)`}
            </p>
          </div>
          <FileUploadTrigger asChild>
            <Button variant="outline" size="sm" className="mt-2 w-fit">
              Browse files
            </Button>
          </FileUploadTrigger>
        </FileUploadDropzone>
        <FileUploadList>
          {field.state.value.map((file) => (
            <FileUploadItem key={file.name} value={file}>
              <FileUploadItemPreview />
              <FileUploadItemMetadata />
              <FileUploadItemDelete asChild>
                <Button variant="ghost" size="icon" className="size-7">
                  <X />
                </Button>
              </FileUploadItemDelete>
            </FileUploadItem>
          ))}
        </FileUploadList>
      </FileUpload>
    </div>
  );
}
