import type { TableControlsProps } from './types';
import { Text } from '@basiln/design-system';
import { Spacing } from '@basiln/utils';

export const TableControls = (props: TableControlsProps) => {
  const { fileName, rowCount, colCount, groupingColumns } = props;

  return (
    <div>
      <Text as="p" color="gray_080">
        파일 이름: {fileName}
      </Text>

      <Spacing size={8} />

      <Text as="p" color="gray_080">
        행 수: {rowCount}개
      </Text>
      <Text as="p" color="gray_080">
        열 수: {colCount}개
      </Text>

      {/* {groupingColumns.length > 0 && (
        <Text as="p" color="gray_080">
          그룹핑: {groupingColumns.join(' → ')}
        </Text>
      )} */}
    </div>
  );
};
