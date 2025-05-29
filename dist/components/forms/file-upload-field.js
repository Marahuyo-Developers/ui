import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { FileUpload, FileUploadDropzone, FileUploadItem, FileUploadItemDelete, FileUploadItemMetadata, FileUploadItemPreview, FileUploadList, FileUploadTrigger, } from '../../components/ui/file-upload';
import { cn } from '../../lib/utils';
import { useFieldContext } from '.';
import { Label } from '../ui/label';
import { Upload, X } from 'lucide-react';
import { Button } from '../ui/button';
export default function FileUploadField({ labelProps, containerProps, fileUploadProps, }) {
    const field = useFieldContext();
    return (_jsxs("div", { className: cn('grid w-full items-center gap-2.5', containerProps?.className), ...containerProps, children: [_jsx(Label, { className: "pb-1.5", ...labelProps }), _jsxs(FileUpload, { ...fileUploadProps, onValueChange: field.handleChange, value: field.state.value, children: [_jsxs(FileUploadDropzone, { children: [_jsxs("div", { className: "flex flex-col items-center gap-1", children: [_jsx("div", { className: "flex items-center justify-center rounded-full border p-2.5", children: _jsx(Upload, { className: "size-6 text-muted-foreground" }) }), _jsxs("p", { className: "font-medium text-sm", children: ["Drag & drop", ' ', (fileUploadProps?.maxFiles || 0) > 1 ? 'files' : 'file', " here"] }), _jsxs("p", { className: "text-muted-foreground text-xs", children: ["Or click to browse", ' ', fileUploadProps?.maxFiles &&
                                                `(max ${fileUploadProps?.maxFiles} files)`] })] }), _jsx(FileUploadTrigger, { asChild: true, children: _jsx(Button, { variant: "outline", size: "sm", className: "mt-2 w-fit", children: "Browse files" }) })] }), _jsx(FileUploadList, { children: field.state.value.map((file) => (_jsxs(FileUploadItem, { value: file, children: [_jsx(FileUploadItemPreview, {}), _jsx(FileUploadItemMetadata, {}), !fileUploadProps?.disabled && (_jsx(FileUploadItemDelete, { asChild: true, children: _jsx(Button, { variant: "ghost", size: "icon", className: "size-7", children: _jsx(X, {}) }) }))] }, file.name))) })] })] }));
}
//# sourceMappingURL=file-upload-field.js.map