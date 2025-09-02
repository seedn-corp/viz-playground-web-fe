import type { ChangeEvent, DragEvent } from 'react';

export type FileUploadAreaProps = {
  onFileUpload: (
    event: ChangeEvent<HTMLInputElement> | { target: { files: File[] } }
  ) => void;
  onDrop: (event: DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: DragEvent<HTMLDivElement>) => void;
};
