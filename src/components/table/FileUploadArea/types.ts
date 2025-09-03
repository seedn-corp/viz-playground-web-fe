import type { ChangeEvent, DragEvent, HTMLAttributes } from 'react';

export type FileUploadAreaProps = HTMLAttributes<HTMLDivElement> & {
  type?: 'full' | 'compact';
  uploadedFileName?: string | null;
  uploadedFileSize?: number | null;
  isLoading?: boolean;
  onFileUpload: (event: ChangeEvent<HTMLInputElement> | { target: { files: File[] } }) => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
  onRemove?: () => void;
};
