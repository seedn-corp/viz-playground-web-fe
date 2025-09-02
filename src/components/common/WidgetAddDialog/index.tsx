import { Button, Text } from "@basiln/design-system";
import { Flex } from "@basiln/utils";

import { widgetAddDialogCss } from "./styles";
import type { WidgetAddDialogProps } from "./types";

export const WidgetAddDialog = ({
  isOpen,
  onClose,
  onAddWidget,
}: WidgetAddDialogProps) => {
  if (!isOpen) return null;

  const handleAddChart = () => {
    onAddWidget("chart");
    onClose();
  };

  const handleAddTable = () => {
    onAddWidget("table");
    onClose();
  };

  return (
    <div css={widgetAddDialogCss.overlay}>
      <div css={widgetAddDialogCss.dialog}>
        <div css={widgetAddDialogCss.header}>
          <Text size="sub-medium">위젯 추가</Text>
          <Button
            variant="ghost"
            size="large"
            onClick={onClose}
            css={widgetAddDialogCss.closeButton}
          >
            ✕
          </Button>
        </div>

        <div css={widgetAddDialogCss.content}>
          <div css={widgetAddDialogCss.widgetOption} onClick={handleAddChart}>
            <div css={widgetAddDialogCss.widgetIcon}>
              <div css={widgetAddDialogCss.chartIcon}>📊</div>
            </div>
            <div css={widgetAddDialogCss.widgetInfo}>
              <Text size="body-large">차트 위젯</Text>
              <Text size="body-medium" color="gray_060">
                데이터를 시각화하여 차트로 표시합니다
              </Text>
            </div>
          </div>

          <div css={widgetAddDialogCss.widgetOption} onClick={handleAddTable}>
            <div css={widgetAddDialogCss.widgetIcon}>
              <div css={widgetAddDialogCss.tableIcon}>📋</div>
            </div>
            <div css={widgetAddDialogCss.widgetInfo}>
              <Text size="body-large">테이블 위젯</Text>
              <Text size="body-medium" color="gray_060">
                데이터를 테이블 형태로 표시합니다
              </Text>
            </div>
          </div>

          <Flex justify="flex-end">
            <Button
              radius="small"
              size="regular-2"
              variant="stroke"
              display="inline"
              gutter="20px"
              onClick={onClose}
            >
              취소
            </Button>
          </Flex>
        </div>
      </div>
    </div>
  );
};
