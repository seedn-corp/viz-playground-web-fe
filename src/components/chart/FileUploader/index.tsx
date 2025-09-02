import { isCSV, parseCsvFileToJson } from '@/pages/chart/utils';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { Text, theme } from '@basiln/design-system';
import { fileUploaderCss } from './styles';

const FileUploader = ({
  onChangeChartData,
}: {
  onChangeChartData: (data: Record<string, string>[]) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFile = async (file: File) => {
    try {
      if (!isCSV(file)) {
        toast.error('CSV 파일만 업로드 가능합니다.');
        return;
      }
      const data = await parseCsvFileToJson(file);
      onChangeChartData(data);
    } catch {
      toast.error('파일 처리 중 오류가 발생했습니다.');
    }
  };

  const handleFileInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) await handleFile(file);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    try {
      await handleFile(file);
    } finally {
      e.dataTransfer.clearData(); // 항상 클리어
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      css={{ width: '100%' }}
    >
      <button
        css={[
          fileUploaderCss.fileUploadButton,
          isDragging && { backgroundColor: theme.colors.gray_040 },
        ]}
      >
        <Upload css={[fileUploaderCss.uploadIcon, { marginBottom: 8 }]} />
        <Text>데이터 파일 업로드</Text>
        <Text size="caption-regular" color="gray_080">
          CSV 파일 지원
        </Text>
        <input
          css={fileUploaderCss.fileInput}
          type="file"
          accept=".csv"
          onChange={handleFileInputChange}
        />
      </button>
    </div>
  );
};

export default FileUploader;
