import type { FileUploadAreaProps } from './types';
import { fileUploadAreaCss } from './styles';

export const FileUploadArea = (props: FileUploadAreaProps) => {
  const { onFileUpload, onDrop, onDragOver } = props;
  return (
    <div css={fileUploadAreaCss.container}>
      <div
        css={fileUploadAreaCss.dropZone}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <label htmlFor="csv-upload" css={fileUploadAreaCss.label}>
          <span css={fileUploadAreaCss.title}>
            데이터 파일 업로드 CSV, Excel 파일 지원
          </span>
          <input
            id="csv-upload"
            type="file"
            accept=".csv"
            onChange={onFileUpload}
            css={fileUploadAreaCss.input}
          />
        </label>
        <p css={fileUploadAreaCss.helperText}>최대 파일 크기: 10MB</p>
      </div>
    </div>
  );
};
