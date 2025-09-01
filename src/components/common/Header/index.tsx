import { headerCss } from '@/components/common/Header/styles';
import { Text } from '@basiln/design-system';

import { Flex } from '@basiln/utils';

export const Header = () => {
  return (
    <Flex justify="flex-start" css={headerCss.container}>
      <Text size="body-large">SeedN FE Playground</Text>
    </Flex>
  );
};
