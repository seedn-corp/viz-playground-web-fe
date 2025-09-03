import { Text } from '@basiln/design-system';
import { useTheme } from '@emotion/react';
import { CircleX, RefreshCw, Upload } from 'lucide-react';
import { useRef } from 'react';

import { fileUploadAreaCss } from './styles';
import type { FileUploadAreaProps } from './types';
import { formatFileSize } from './utils';

export const FileUploadArea = (props: FileUploadAreaProps) => {
  const theme = useTheme();

  const inputRef = useRef<HTMLInputElement | null>(null);

  const {
    type = 'compact',
    isLoading,
    onFileUpload,
    onDrop,
    onDragOver,
    onRemove,
    uploadedFileName,
    uploadedFileSize,
    ...restProps
  } = props;

  const renderContent = (() => {
    if (isLoading) {
      return (
        <div
          css={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <RefreshCw color={theme.colors.gray_060} />
          <Text size="caption-regular" color="gray_060">
            파일을 처리하고 있습니다...
          </Text>
        </div>
      );
    }

    if (uploadedFileName) {
      return (
        <div css={fileUploadAreaCss.uploadInfo}>
          <Text as="p" color="gray_080" size="caption-regular">
            {uploadedFileName}
          </Text>
          <Text as="p" color="gray_060" size="caption-regular">
            {formatFileSize(uploadedFileSize)}
          </Text>
        </div>
      );
    }

    return (
      <label htmlFor="csv-upload" css={fileUploadAreaCss.label}>
        <Upload size="14px" color={theme.colors.gray_060} />
        <Text as="p" color="gray_080" size="body-medium">
          데이터 파일 업로드
        </Text>
        <Text as="p" color="gray_080">
          CSV, Excel 파일 지원
        </Text>
        <input
          ref={inputRef}
          id="csv-upload"
          type="file"
          accept=".csv,.xls,.xlsx,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={onFileUpload}
          css={fileUploadAreaCss.input}
        />
      </label>
    );
  })();

  return (
    <div
      css={[
        !isLoading ? fileUploadAreaCss.dropZone : fileUploadAreaCss.isLoading,
        { position: 'relative' },
      ]}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onClick={() => {
        if (isLoading) {
          return;
        }
        inputRef.current?.click();
      }}
      onKeyDown={(e) => {
        if (isLoading) {
          return;
        }

        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
          e.preventDefault();
          inputRef.current?.click();
        }
      }}
      role="button"
      tabIndex={0}
      {...restProps}
      style={{
        opacity: isLoading ? 0.5 : 1,
        cursor: isLoading ? 'not-allowed' : 'pointer',
        ...(type === 'full' ? { width: '100%', height: '100%' } : {}),
      }}
      aria-disabled={isLoading}
    >
      {renderContent}

      {uploadedFileName && type === 'compact' && (
        <button onClick={onRemove} css={fileUploadAreaCss.clearButton}>
          <CircleX size={20} fill={theme.colors.승인오류} color={theme.colors.white} />
        </button>
      )}
    </div>
  );
};
