'use client';
import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from 'react/jsx-runtime';
import { cn } from '../../lib/utils';
import { Slot } from '@radix-ui/react-slot';
import {
  FileArchiveIcon,
  FileAudioIcon,
  FileCodeIcon,
  FileCogIcon,
  FileIcon,
  FileTextIcon,
  FileVideoIcon,
} from 'lucide-react';
import * as React from 'react';
const ROOT_NAME = 'FileUpload';
const DROPZONE_NAME = 'FileUploadDropzone';
const TRIGGER_NAME = 'FileUploadTrigger';
const LIST_NAME = 'FileUploadList';
const ITEM_NAME = 'FileUploadItem';
const ITEM_PREVIEW_NAME = 'FileUploadItemPreview';
const ITEM_METADATA_NAME = 'FileUploadItemMetadata';
const ITEM_PROGRESS_NAME = 'FileUploadItemProgress';
const ITEM_DELETE_NAME = 'FileUploadItemDelete';
const CLEAR_NAME = 'FileUploadClear';
const FILE_UPLOAD_ERRORS = {
  [ROOT_NAME]: `\`${ROOT_NAME}\` must be used as root component`,
  [DROPZONE_NAME]: `\`${DROPZONE_NAME}\` must be within \`${ROOT_NAME}\``,
  [TRIGGER_NAME]: `\`${TRIGGER_NAME}\` must be within \`${ROOT_NAME}\``,
  [LIST_NAME]: `\`${LIST_NAME}\` must be within \`${ROOT_NAME}\``,
  [ITEM_NAME]: `\`${ITEM_NAME}\` must be within \`${ROOT_NAME}\``,
  [ITEM_PREVIEW_NAME]: `\`${ITEM_PREVIEW_NAME}\` must be within \`${ITEM_NAME}\``,
  [ITEM_METADATA_NAME]: `\`${ITEM_METADATA_NAME}\` must be within \`${ITEM_NAME}\``,
  [ITEM_PROGRESS_NAME]: `\`${ITEM_PROGRESS_NAME}\` must be within \`${ITEM_NAME}\``,
  [ITEM_DELETE_NAME]: `\`${ITEM_DELETE_NAME}\` must be within \`${ITEM_NAME}\``,
  [CLEAR_NAME]: `\`${CLEAR_NAME}\` must be within \`${ROOT_NAME}\``,
};
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;
function useAsRef(data) {
  const ref = React.useRef(data);
  useIsomorphicLayoutEffect(() => {
    ref.current = data;
  });
  return ref;
}
function useLazyRef(fn) {
  const ref = React.useRef(null);
  if (ref.current === null) {
    ref.current = fn();
  }
  return ref;
}
const DirectionContext = React.createContext(undefined);
function useDirection(dirProp) {
  const contextDir = React.useContext(DirectionContext);
  return dirProp ?? contextDir ?? 'ltr';
}
function createStore(listeners, files, onValueChange, invalid) {
  const initialState = {
    files,
    dragOver: false,
    invalid: invalid ?? false,
  };
  let state = initialState;
  function reducer(state, action) {
    switch (action.variant) {
      case 'ADD_FILES': {
        for (const file of action.files) {
          files.set(file, {
            file,
            progress: 0,
            status: 'idle',
          });
        }
        if (onValueChange) {
          const fileList = Array.from(files.values()).map(
            (fileState) => fileState.file,
          );
          onValueChange(fileList);
        }
        return { ...state, files };
      }
      case 'SET_FILES': {
        const newFileSet = new Set(action.files);
        for (const existingFile of files.keys()) {
          if (!newFileSet.has(existingFile)) {
            files.delete(existingFile);
          }
        }
        for (const file of action.files) {
          const existingState = files.get(file);
          if (!existingState) {
            files.set(file, {
              file,
              progress: 0,
              status: 'idle',
            });
          }
        }
        return { ...state, files };
      }
      case 'SET_PROGRESS': {
        const fileState = files.get(action.file);
        if (fileState) {
          files.set(action.file, {
            ...fileState,
            progress: action.progress,
            status: 'uploading',
          });
        }
        return { ...state, files };
      }
      case 'SET_SUCCESS': {
        const fileState = files.get(action.file);
        if (fileState) {
          files.set(action.file, {
            ...fileState,
            progress: 100,
            status: 'success',
          });
        }
        return { ...state, files };
      }
      case 'SET_ERROR': {
        const fileState = files.get(action.file);
        if (fileState) {
          files.set(action.file, {
            ...fileState,
            error: action.error,
            status: 'error',
          });
        }
        return { ...state, files };
      }
      case 'REMOVE_FILE': {
        files.delete(action.file);
        if (onValueChange) {
          const fileList = Array.from(files.values()).map(
            (fileState) => fileState.file,
          );
          onValueChange(fileList);
        }
        return { ...state, files };
      }
      case 'SET_DRAG_OVER': {
        return { ...state, dragOver: action.dragOver };
      }
      case 'SET_INVALID': {
        return { ...state, invalid: action.invalid };
      }
      case 'CLEAR': {
        files.clear();
        if (onValueChange) {
          onValueChange([]);
        }
        return { ...state, files, invalid: false };
      }
      default:
        return state;
    }
  }
  function getState() {
    return state;
  }
  function dispatch(action) {
    state = reducer(state, action);
    for (const listener of listeners) {
      listener();
    }
  }
  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }
  return { getState, dispatch, subscribe };
}
const StoreContext = React.createContext(null);
StoreContext.displayName = ROOT_NAME;
function useStoreContext(name) {
  const context = React.useContext(StoreContext);
  if (!context) {
    throw new Error(FILE_UPLOAD_ERRORS[name]);
  }
  return context;
}
function useStore(selector) {
  const store = useStoreContext(ROOT_NAME);
  const lastValueRef = useLazyRef(() => null);
  const getSnapshot = React.useCallback(() => {
    const state = store.getState();
    const prevValue = lastValueRef.current;
    if (prevValue && prevValue.state === state) {
      return prevValue.value;
    }
    const nextValue = selector(state);
    lastValueRef.current = { value: nextValue, state };
    return nextValue;
  }, [store, selector, lastValueRef]);
  return React.useSyncExternalStore(store.subscribe, getSnapshot, getSnapshot);
}
const FileUploadContext = React.createContext(null);
function useFileUploadContext(name) {
  const context = React.useContext(FileUploadContext);
  if (!context) {
    throw new Error(FILE_UPLOAD_ERRORS[name]);
  }
  return context;
}
const FileUploadRoot = React.forwardRef((props, forwardedRef) => {
  const {
    value,
    defaultValue,
    onValueChange,
    onAccept,
    onFileAccept,
    onFileReject,
    onFileValidate,
    onUpload,
    accept,
    maxFiles,
    maxSize,
    dir: dirProp,
    label,
    name,
    asChild,
    disabled = false,
    invalid = false,
    multiple = false,
    required = false,
    children,
    className,
    ...rootProps
  } = props;
  const inputId = React.useId();
  const dropzoneId = React.useId();
  const listId = React.useId();
  const labelId = React.useId();
  const dir = useDirection(dirProp);
  const propsRef = useAsRef(props);
  const listeners = useLazyRef(() => new Set()).current;
  const files = useLazyRef(() => new Map()).current;
  const inputRef = React.useRef(null);
  const isControlled = value !== undefined;
  const store = React.useMemo(
    () => createStore(listeners, files, onValueChange, invalid),
    [listeners, files, onValueChange, invalid],
  );
  const contextValue = React.useMemo(
    () => ({
      dropzoneId,
      inputId,
      listId,
      labelId,
      dir,
      disabled,
      inputRef,
    }),
    [dropzoneId, inputId, listId, labelId, dir, disabled],
  );
  React.useEffect(() => {
    if (isControlled) {
      store.dispatch({ variant: 'SET_FILES', files: value });
    } else if (
      defaultValue &&
      defaultValue.length > 0 &&
      !store.getState().files.size
    ) {
      store.dispatch({ variant: 'SET_FILES', files: defaultValue });
    }
  }, [value, defaultValue, isControlled, store]);
  const onFilesChange = React.useCallback(
    (originalFiles) => {
      if (propsRef.current.disabled) return;
      let filesToProcess = [...originalFiles];
      let invalid = false;
      if (propsRef.current.maxFiles) {
        const currentCount = store.getState().files.size;
        const remainingSlotCount = Math.max(
          0,
          propsRef.current.maxFiles - currentCount,
        );
        if (remainingSlotCount < filesToProcess.length) {
          const rejectedFiles = filesToProcess.slice(remainingSlotCount);
          invalid = true;
          filesToProcess = filesToProcess.slice(0, remainingSlotCount);
          for (const file of rejectedFiles) {
            let rejectionMessage = `Maximum ${propsRef.current.maxFiles} files allowed`;
            if (propsRef.current.onFileValidate) {
              const validationMessage = propsRef.current.onFileValidate(file);
              if (validationMessage) {
                rejectionMessage = validationMessage;
              }
            }
            propsRef.current.onFileReject?.(file, rejectionMessage);
          }
        }
      }
      const acceptedFiles = [];
      const rejectedFiles = [];
      for (const file of filesToProcess) {
        let rejected = false;
        let rejectionMessage = '';
        if (propsRef.current.onFileValidate) {
          const validationMessage = propsRef.current.onFileValidate(file);
          if (validationMessage) {
            rejectionMessage = validationMessage;
            propsRef.current.onFileReject?.(file, rejectionMessage);
            rejected = true;
            invalid = true;
            continue;
          }
        }
        if (propsRef.current.accept) {
          const acceptTypes = propsRef.current.accept
            .split(',')
            .map((t) => t.trim());
          const fileType = file.type;
          const fileExtension = `.${file.name.split('.').pop()}`;
          if (
            !acceptTypes.some(
              (type) =>
                type === fileType ||
                type === fileExtension ||
                (type.includes('/*') &&
                  fileType.startsWith(type.replace('/*', '/'))),
            )
          ) {
            rejectionMessage = 'File type not accepted';
            propsRef.current.onFileReject?.(file, rejectionMessage);
            rejected = true;
            invalid = true;
          }
        }
        if (propsRef.current.maxSize && file.size > propsRef.current.maxSize) {
          rejectionMessage = 'File too large';
          propsRef.current.onFileReject?.(file, rejectionMessage);
          rejected = true;
          invalid = true;
        }
        if (!rejected) {
          acceptedFiles.push(file);
        } else {
          rejectedFiles.push({ file, message: rejectionMessage });
        }
      }
      if (invalid) {
        store.dispatch({ variant: 'SET_INVALID', invalid });
        setTimeout(() => {
          store.dispatch({ variant: 'SET_INVALID', invalid: false });
        }, 2000);
      }
      if (acceptedFiles.length > 0) {
        store.dispatch({ variant: 'ADD_FILES', files: acceptedFiles });
        if (isControlled && propsRef.current.onValueChange) {
          const currentFiles = Array.from(store.getState().files.values()).map(
            (f) => f.file,
          );
          propsRef.current.onValueChange([...currentFiles]);
        }
        if (propsRef.current.onAccept) {
          propsRef.current.onAccept(acceptedFiles);
        }
        for (const file of acceptedFiles) {
          propsRef.current.onFileAccept?.(file);
        }
        if (propsRef.current.onUpload) {
          requestAnimationFrame(() => {
            onFilesUpload(acceptedFiles);
          });
        }
      }
    },
    [store, isControlled, propsRef],
  );
  const onFilesUpload = React.useCallback(
    async (files) => {
      try {
        for (const file of files) {
          store.dispatch({ variant: 'SET_PROGRESS', file, progress: 0 });
        }
        if (propsRef.current.onUpload) {
          await propsRef.current.onUpload(files, {
            onProgress: (file, progress) => {
              store.dispatch({
                variant: 'SET_PROGRESS',
                file,
                progress: Math.min(Math.max(0, progress), 100),
              });
            },
            onSuccess: (file) => {
              store.dispatch({ variant: 'SET_SUCCESS', file });
            },
            onError: (file, error) => {
              store.dispatch({
                variant: 'SET_ERROR',
                file,
                error: error.message ?? 'Upload failed',
              });
            },
          });
        } else {
          for (const file of files) {
            store.dispatch({ variant: 'SET_SUCCESS', file });
          }
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Upload failed';
        for (const file of files) {
          store.dispatch({
            variant: 'SET_ERROR',
            file,
            error: errorMessage,
          });
        }
      }
    },
    [store, propsRef.current.onUpload],
  );
  const onInputChange = React.useCallback(
    (event) => {
      const files = Array.from(event.target.files ?? []);
      onFilesChange(files);
      event.target.value = '';
    },
    [onFilesChange],
  );
  const RootPrimitive = asChild ? Slot : 'div';
  return _jsx(DirectionContext.Provider, {
    value: dir,
    children: _jsx(StoreContext.Provider, {
      value: store,
      children: _jsx(FileUploadContext.Provider, {
        value: contextValue,
        children: _jsxs(RootPrimitive, {
          'data-disabled': disabled ? '' : undefined,
          'data-slot': 'file-upload',
          dir: dir,
          ...rootProps,
          ref: forwardedRef,
          className: cn('relative flex flex-col gap-2', className),
          children: [
            children,
            _jsx('input', {
              type: 'file',
              id: inputId,
              'aria-labelledby': labelId,
              'aria-describedby': dropzoneId,
              ref: inputRef,
              tabIndex: -1,
              accept: accept,
              name: name,
              disabled: disabled,
              multiple: multiple,
              required: required,
              className: 'sr-only',
              onChange: onInputChange,
            }),
            _jsx('span', {
              id: labelId,
              className: 'sr-only',
              children: label ?? 'File upload',
            }),
          ],
        }),
      }),
    }),
  });
});
FileUploadRoot.displayName = ROOT_NAME;
const FileUploadDropzone = React.forwardRef((props, forwardedRef) => {
  const { asChild, className, ...dropzoneProps } = props;
  const context = useFileUploadContext(DROPZONE_NAME);
  const store = useStoreContext(DROPZONE_NAME);
  const dragOver = useStore((state) => state.dragOver);
  const invalid = useStore((state) => state.invalid);
  const propsRef = useAsRef(dropzoneProps);
  const onClick = React.useCallback(
    (event) => {
      propsRef.current?.onClick?.(event);
      if (event.defaultPrevented) return;
      const target = event.target;
      const isFromTrigger =
        target instanceof HTMLElement &&
        target.closest('[data-slot="file-upload-trigger"]');
      if (!isFromTrigger) {
        context.inputRef.current?.click();
      }
    },
    [context.inputRef, propsRef],
  );
  const onDragOver = React.useCallback(
    (event) => {
      propsRef.current?.onDragOver?.(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      store.dispatch({ variant: 'SET_DRAG_OVER', dragOver: true });
    },
    [store, propsRef.current.onDragOver],
  );
  const onDragEnter = React.useCallback(
    (event) => {
      propsRef.current?.onDragEnter?.(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      store.dispatch({ variant: 'SET_DRAG_OVER', dragOver: true });
    },
    [store, propsRef.current.onDragEnter],
  );
  const onDragLeave = React.useCallback(
    (event) => {
      propsRef.current?.onDragLeave?.(event);
      if (event.defaultPrevented) return;
      const relatedTarget = event.relatedTarget;
      if (
        relatedTarget &&
        relatedTarget instanceof Node &&
        event.currentTarget.contains(relatedTarget)
      ) {
        return;
      }
      event.preventDefault();
      store.dispatch({ variant: 'SET_DRAG_OVER', dragOver: false });
    },
    [store, propsRef.current.onDragLeave],
  );
  const onDrop = React.useCallback(
    (event) => {
      propsRef.current?.onDrop?.(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      store.dispatch({ variant: 'SET_DRAG_OVER', dragOver: false });
      const files = Array.from(event.dataTransfer.files);
      const inputElement = context.inputRef.current;
      if (!inputElement) return;
      const dataTransfer = new DataTransfer();
      for (const file of files) {
        dataTransfer.items.add(file);
      }
      inputElement.files = dataTransfer.files;
      inputElement.dispatchEvent(new Event('change', { bubbles: true }));
    },
    [store, context.inputRef, propsRef.current.onDrop],
  );
  const onPaste = React.useCallback(
    (event) => {
      propsRef.current?.onPaste?.(event);
      if (event.defaultPrevented) return;
      event.preventDefault();
      store.dispatch({ variant: 'SET_DRAG_OVER', dragOver: false });
      const items = event.clipboardData?.items;
      if (!items) return;
      const files = [];
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item?.kind === 'file') {
          const file = item.getAsFile();
          if (file) {
            files.push(file);
          }
        }
      }
      if (files.length === 0) return;
      const inputElement = context.inputRef.current;
      if (!inputElement) return;
      const dataTransfer = new DataTransfer();
      for (const file of files) {
        dataTransfer.items.add(file);
      }
      inputElement.files = dataTransfer.files;
      inputElement.dispatchEvent(new Event('change', { bubbles: true }));
    },
    [store, context.inputRef, propsRef],
  );
  const onKeyDown = React.useCallback(
    (event) => {
      propsRef.current?.onKeyDown?.(event);
      if (
        !event.defaultPrevented &&
        (event.key === 'Enter' || event.key === ' ')
      ) {
        event.preventDefault();
        context.inputRef.current?.click();
      }
    },
    [context.inputRef, propsRef.current.onKeyDown],
  );
  const DropzonePrimitive = asChild ? Slot : 'div';
  return _jsx(DropzonePrimitive, {
    role: 'region',
    id: context.dropzoneId,
    'aria-controls': `${context.inputId} ${context.listId}`,
    'aria-disabled': context.disabled,
    'aria-invalid': invalid,
    'data-disabled': context.disabled ? '' : undefined,
    'data-dragging': dragOver ? '' : undefined,
    'data-invalid': invalid ? '' : undefined,
    'data-slot': 'file-upload-dropzone',
    dir: context.dir,
    tabIndex: context.disabled ? undefined : 0,
    ...dropzoneProps,
    ref: forwardedRef,
    className: cn(
      'relative flex select-none flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 outline-none transition-colors hover:bg-accent/30 focus-visible:border-ring/50 data-[disabled]:pointer-events-none data-[dragging]:border-primary data-[invalid]:border-destructive data-[invalid]:ring-destructive/20',
      className,
    ),
    onClick: onClick,
    onDragEnter: onDragEnter,
    onDragLeave: onDragLeave,
    onDragOver: onDragOver,
    onDrop: onDrop,
    onKeyDown: onKeyDown,
    onPaste: onPaste,
  });
});
FileUploadDropzone.displayName = DROPZONE_NAME;
const FileUploadTrigger = React.forwardRef((props, forwardedRef) => {
  const { asChild, ...triggerProps } = props;
  const context = useFileUploadContext(TRIGGER_NAME);
  const propsRef = useAsRef(triggerProps);
  const onClick = React.useCallback(
    (event) => {
      propsRef.current?.onClick?.(event);
      if (event.defaultPrevented) return;
      context.inputRef.current?.click();
    },
    [context.inputRef, propsRef.current],
  );
  const TriggerPrimitive = asChild ? Slot : 'button';
  return _jsx(TriggerPrimitive, {
    type: 'button',
    'aria-controls': context.inputId,
    'data-disabled': context.disabled ? '' : undefined,
    'data-slot': 'file-upload-trigger',
    ...triggerProps,
    ref: forwardedRef,
    disabled: context.disabled,
    onClick: onClick,
  });
});
FileUploadTrigger.displayName = TRIGGER_NAME;
const FileUploadList = React.forwardRef((props, forwardedRef) => {
  const {
    className,
    orientation = 'vertical',
    asChild,
    forceMount,
    ...listProps
  } = props;
  const context = useFileUploadContext(LIST_NAME);
  const shouldRender = forceMount || useStore((state) => state.files.size > 0);
  if (!shouldRender) return null;
  const ListPrimitive = asChild ? Slot : 'div';
  return _jsx(ListPrimitive, {
    role: 'list',
    id: context.listId,
    'aria-orientation': orientation,
    'data-orientation': orientation,
    'data-slot': 'file-upload-list',
    'data-state': shouldRender ? 'active' : 'inactive',
    dir: context.dir,
    ...listProps,
    ref: forwardedRef,
    className: cn(
      'data-[state=inactive]:fade-out-0 data-[state=active]:fade-in-0 data-[state=inactive]:slide-out-to-top-2 data-[state=active]:slide-in-from-top-2 flex flex-col gap-2 data-[state=active]:animate-in data-[state=inactive]:animate-out',
      orientation === 'horizontal' && 'flex-row overflow-x-auto p-1.5',
      className,
    ),
  });
});
FileUploadList.displayName = LIST_NAME;
const FileUploadItemContext = React.createContext(null);
function useFileUploadItemContext(name) {
  const context = React.useContext(FileUploadItemContext);
  if (!context) {
    throw new Error(FILE_UPLOAD_ERRORS[name]);
  }
  return context;
}
const FileUploadItem = React.forwardRef((props, forwardedRef) => {
  const { value, asChild, className, ...itemProps } = props;
  const id = React.useId();
  const statusId = `${id}-status`;
  const nameId = `${id}-name`;
  const sizeId = `${id}-size`;
  const messageId = `${id}-message`;
  const context = useFileUploadContext(ITEM_NAME);
  const fileState = useStore((state) => state.files.get(value));
  const fileCount = useStore((state) => state.files.size);
  const fileIndex = useStore((state) => {
    const files = Array.from(state.files.keys());
    return files.indexOf(value) + 1;
  });
  const itemContext = React.useMemo(
    () => ({
      id,
      fileState,
      nameId,
      sizeId,
      statusId,
      messageId,
    }),
    [id, fileState, statusId, nameId, sizeId, messageId],
  );
  if (!fileState) return null;
  const statusText = fileState.error
    ? `Error: ${fileState.error}`
    : fileState.status === 'uploading'
      ? `Uploading: ${fileState.progress}% complete`
      : fileState.status === 'success'
        ? 'Upload complete'
        : 'Ready to upload';
  const ItemPrimitive = asChild ? Slot : 'div';
  return _jsx(FileUploadItemContext.Provider, {
    value: itemContext,
    children: _jsxs(ItemPrimitive, {
      role: 'listitem',
      id: id,
      'aria-setsize': fileCount,
      'aria-posinset': fileIndex,
      'aria-describedby': `${nameId} ${sizeId} ${statusId} ${fileState.error ? messageId : ''}`,
      'aria-labelledby': nameId,
      'data-slot': 'file-upload-item',
      dir: context.dir,
      ...itemProps,
      ref: forwardedRef,
      className: cn(
        'relative flex items-center gap-2.5 rounded-md border p-3',
        className,
      ),
      children: [
        props.children,
        _jsx('span', {
          id: statusId,
          className: 'sr-only',
          children: statusText,
        }),
      ],
    }),
  });
});
FileUploadItem.displayName = ITEM_NAME;
function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(i ? 1 : 0)} ${sizes[i]}`;
}
function getFileIcon(file) {
  const type = file.type;
  const extension = file.name.split('.').pop()?.toLowerCase() ?? '';
  if (type.startsWith('video/')) {
    return _jsx(FileVideoIcon, {});
  }
  if (type.startsWith('audio/')) {
    return _jsx(FileAudioIcon, {});
  }
  if (
    type.startsWith('text/') ||
    ['txt', 'md', 'rtf', 'pdf'].includes(extension)
  ) {
    return _jsx(FileTextIcon, {});
  }
  if (
    [
      'html',
      'css',
      'js',
      'jsx',
      'ts',
      'tsx',
      'json',
      'xml',
      'php',
      'py',
      'rb',
      'java',
      'c',
      'cpp',
      'cs',
    ].includes(extension)
  ) {
    return _jsx(FileCodeIcon, {});
  }
  if (['zip', 'rar', '7z', 'tar', 'gz', 'bz2'].includes(extension)) {
    return _jsx(FileArchiveIcon, {});
  }
  if (
    ['exe', 'msi', 'app', 'apk', 'deb', 'rpm'].includes(extension) ||
    type.startsWith('application/')
  ) {
    return _jsx(FileCogIcon, {});
  }
  return _jsx(FileIcon, {});
}
const FileUploadItemPreview = React.forwardRef((props, forwardedRef) => {
  const { render, asChild, children, className, ...previewProps } = props;
  const itemContext = useFileUploadItemContext(ITEM_PREVIEW_NAME);
  const onPreviewRender = React.useCallback(
    (file) => {
      if (render) return render(file);
      if (itemContext.fileState?.file.type.startsWith('image/')) {
        return _jsx('img', {
          src: URL.createObjectURL(file),
          alt: file.name,
          className: 'size-full object-cover',
          onLoad: (event) => {
            if (!(event.target instanceof HTMLImageElement)) return;
            URL.revokeObjectURL(event.target.src);
          },
        });
      }
      return getFileIcon(file);
    },
    [render, itemContext.fileState?.file.type],
  );
  if (!itemContext.fileState) return null;
  const ItemPreviewPrimitive = asChild ? Slot : 'div';
  return _jsxs(ItemPreviewPrimitive, {
    'aria-labelledby': itemContext.nameId,
    'data-slot': 'file-upload-preview',
    ...previewProps,
    ref: forwardedRef,
    className: cn(
      'relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded border bg-accent/50 [&>svg]:size-5',
      className,
    ),
    children: [onPreviewRender(itemContext.fileState.file), children],
  });
});
FileUploadItemPreview.displayName = ITEM_PREVIEW_NAME;
const FileUploadItemMetadata = React.forwardRef((props, forwardedRef) => {
  const {
    asChild,
    size = 'default',
    children,
    className,
    ...metadataProps
  } = props;
  const context = useFileUploadContext(ITEM_METADATA_NAME);
  const itemContext = useFileUploadItemContext(ITEM_METADATA_NAME);
  if (!itemContext.fileState) return null;
  const ItemMetadataPrimitive = asChild ? Slot : 'div';
  return _jsx(ItemMetadataPrimitive, {
    'data-slot': 'file-upload-metadata',
    dir: context.dir,
    ...metadataProps,
    ref: forwardedRef,
    className: cn('flex min-w-0 flex-1 flex-col', className),
    children:
      children ??
      _jsxs(_Fragment, {
        children: [
          _jsx('span', {
            id: itemContext.nameId,
            className: cn(
              'truncate font-medium text-sm',
              size === 'sm' && 'font-normal text-[13px] leading-snug',
            ),
            children: itemContext.fileState.file.name,
          }),
          _jsx('span', {
            id: itemContext.sizeId,
            className: cn(
              'truncate text-muted-foreground text-xs',
              size === 'sm' && 'text-[11px]',
            ),
            children: formatBytes(itemContext.fileState.file.size),
          }),
          itemContext.fileState.error &&
            _jsx('span', {
              id: itemContext.messageId,
              className: 'text-destructive text-xs',
              children: itemContext.fileState.error,
            }),
        ],
      }),
  });
});
FileUploadItemMetadata.displayName = ITEM_METADATA_NAME;
const FileUploadItemProgress = React.forwardRef((props, forwardedRef) => {
  const {
    variant = 'linear',
    size = 40,
    asChild,
    forceMount,
    className,
    ...progressProps
  } = props;
  const itemContext = useFileUploadItemContext(ITEM_PROGRESS_NAME);
  if (!itemContext.fileState) return null;
  const shouldRender = forceMount || itemContext.fileState.progress !== 100;
  if (!shouldRender) return null;
  const ItemProgressPrimitive = asChild ? Slot : 'div';
  switch (variant) {
    case 'circular': {
      const circumference = 2 * Math.PI * ((size - 4) / 2);
      const strokeDashoffset =
        circumference - (itemContext.fileState.progress / 100) * circumference;
      return _jsx(ItemProgressPrimitive, {
        role: 'progressbar',
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'aria-valuenow': itemContext.fileState.progress,
        'aria-valuetext': `${itemContext.fileState.progress}%`,
        'aria-labelledby': itemContext.nameId,
        'data-slot': 'file-upload-progress',
        ...progressProps,
        ref: forwardedRef,
        className: cn(
          '-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2',
          className,
        ),
        children: _jsxs('svg', {
          className: 'rotate-[-90deg] transform',
          width: size,
          height: size,
          viewBox: `0 0 ${size} ${size}`,
          fill: 'none',
          stroke: 'currentColor',
          children: [
            _jsx('circle', {
              className: 'text-primary/20',
              strokeWidth: '2',
              cx: size / 2,
              cy: size / 2,
              r: (size - 4) / 2,
            }),
            _jsx('circle', {
              className:
                'text-primary transition-[stroke-dashoffset] duration-300 ease-linear',
              strokeWidth: '2',
              strokeLinecap: 'round',
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
              cx: size / 2,
              cy: size / 2,
              r: (size - 4) / 2,
            }),
          ],
        }),
      });
    }
    case 'fill': {
      const progressPercentage = itemContext.fileState.progress;
      const topInset = 100 - progressPercentage;
      return _jsx(ItemProgressPrimitive, {
        role: 'progressbar',
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'aria-valuenow': progressPercentage,
        'aria-valuetext': `${progressPercentage}%`,
        'aria-labelledby': itemContext.nameId,
        'data-slot': 'file-upload-progress',
        ...progressProps,
        ref: forwardedRef,
        className: cn(
          'absolute inset-0 bg-primary/50 transition-[clip-path] duration-300 ease-linear',
          className,
        ),
        style: {
          clipPath: `inset(${topInset}% 0% 0% 0%)`,
        },
      });
    }
    default:
      return _jsx(ItemProgressPrimitive, {
        role: 'progressbar',
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'aria-valuenow': itemContext.fileState.progress,
        'aria-valuetext': `${itemContext.fileState.progress}%`,
        'aria-labelledby': itemContext.nameId,
        'data-slot': 'file-upload-progress',
        ...progressProps,
        ref: forwardedRef,
        className: cn(
          'relative h-1.5 w-full overflow-hidden rounded-full bg-primary/20',
          className,
        ),
        children: _jsx('div', {
          className:
            'h-full w-full flex-1 bg-primary transition-transform duration-300 ease-linear',
          style: {
            transform: `translateX(-${100 - itemContext.fileState.progress}%)`,
          },
        }),
      });
  }
});
FileUploadItemProgress.displayName = ITEM_PROGRESS_NAME;
const FileUploadItemDelete = React.forwardRef((props, forwardedRef) => {
  const { asChild, ...deleteProps } = props;
  const store = useStoreContext(ITEM_DELETE_NAME);
  const itemContext = useFileUploadItemContext(ITEM_DELETE_NAME);
  const propsRef = useAsRef(deleteProps);
  const onClick = React.useCallback(
    (event) => {
      propsRef.current?.onClick?.(event);
      if (!itemContext.fileState || event.defaultPrevented) return;
      store.dispatch({
        variant: 'REMOVE_FILE',
        file: itemContext.fileState.file,
      });
    },
    [store, itemContext.fileState, propsRef.current?.onClick],
  );
  if (!itemContext.fileState) return null;
  const ItemDeletePrimitive = asChild ? Slot : 'button';
  return _jsx(ItemDeletePrimitive, {
    type: 'button',
    'aria-controls': itemContext.id,
    'aria-describedby': itemContext.nameId,
    'data-slot': 'file-upload-item-delete',
    ...deleteProps,
    ref: forwardedRef,
    onClick: onClick,
  });
});
FileUploadItemDelete.displayName = ITEM_DELETE_NAME;
const FileUploadClear = React.forwardRef((props, forwardedRef) => {
  const { asChild, forceMount, disabled, ...clearProps } = props;
  const context = useFileUploadContext(CLEAR_NAME);
  const store = useStoreContext(CLEAR_NAME);
  const propsRef = useAsRef(clearProps);
  const isDisabled = disabled || context.disabled;
  const onClick = React.useCallback(
    (event) => {
      propsRef.current?.onClick?.(event);
      if (event.defaultPrevented) return;
      store.dispatch({ variant: 'CLEAR' });
    },
    [store, propsRef],
  );
  const shouldRender = forceMount || useStore((state) => state.files.size > 0);
  if (!shouldRender) return null;
  const ClearPrimitive = asChild ? Slot : 'button';
  return _jsx(ClearPrimitive, {
    type: 'button',
    'aria-controls': context.listId,
    'data-slot': 'file-upload-clear',
    'data-disabled': isDisabled ? '' : undefined,
    ...clearProps,
    ref: forwardedRef,
    disabled: isDisabled,
    onClick: onClick,
  });
});
FileUploadClear.displayName = CLEAR_NAME;
const FileUpload = FileUploadRoot;
const Root = FileUploadRoot;
const Trigger = FileUploadTrigger;
const Dropzone = FileUploadDropzone;
const List = FileUploadList;
const Item = FileUploadItem;
const ItemPreview = FileUploadItemPreview;
const ItemMetadata = FileUploadItemMetadata;
const ItemProgress = FileUploadItemProgress;
const ItemDelete = FileUploadItemDelete;
const Clear = FileUploadClear;
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
  //
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
  //
  useStore as useFileUpload,
};
//# sourceMappingURL=file-upload.js.map
