import { headerCss } from "@/components/common/Header/styles";
import { Button, Text } from "@basiln/design-system";

import { Flex } from "@basiln/utils";

export const Header = () => {
  return (
    <Flex justify="flex-start" css={headerCss.container}>
      <Text size="title-large">대시보드</Text>
      <Flex gap={20}>
        <Button display="inline" size="regular-2" gutter="20px" radius="small">
          + 위젯 추가
        </Button>
        <Button
          variant="secondary"
          display="inline"
          size="regular-2"
          gutter="20px"
          radius="small"
        >
          로그아웃
        </Button>
      </Flex>
    </Flex>
  );
};
