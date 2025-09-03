import { Text } from '@basiln/design-system';
import { useTheme } from '@emotion/react';
import { RefreshCw, Upload } from 'lucide-react';

import { fileUploadAreaCss } from './styles';
import type { FileUploadAreaProps } from './types';

export const FileUploadArea = (props: FileUploadAreaProps) => {
  const theme = useTheme();

  const { isLoading, onFileUpload, onDrop, onDragOver } = props;

  return (
    <div
      css={[!isLoading ? fileUploadAreaCss.dropZone : fileUploadAreaCss.isLoading]}
      onDrop={onDrop}
      onDragOver={onDragOver}
      style={{
        opacity: isLoading ? 0.5 : 1,
        cursor: isLoading ? 'not-allowed' : 'pointer',
      }}
      aria-disabled={isLoading}
    >
      {isLoading ? (
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
      ) : (
        <label htmlFor="csv-upload" css={fileUploadAreaCss.label}>
          <Upload size="14px" color={theme.colors.gray_060} />
          <Text as="p" color="gray_080" size="body-medium">
            데이터 파일 업로드
          </Text>
          <Text as="p" color="gray_080">
            CSV, Excel 파일 지원
          </Text>
          <input
            id="csv-upload"
            type="file"
            accept=".csv,.xls,.xlsx,text/csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={onFileUpload}
            css={fileUploadAreaCss.input}
          />
        </label>
      )}
    </div>
  );
};
