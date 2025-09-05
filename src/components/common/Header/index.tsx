import { Button, Text } from '@basiln/design-system';
import { Flex } from '@basiln/utils';
import { useNavigate } from 'react-router';

import logoImage from '@/assets/icons/logo.png';
import { ColorPicker } from '@/components/common/ColorPicker';
import { headerCss } from '@/components/common/Header/styles';
import { useAuth } from '@/hooks/auth/useAuth';
import { useLogout } from '@/hooks/mutation/auth/useLogout';

export const Header = () => {
  const { user, accessToken } = useAuth();
  const logoutMutation = useLogout();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (accessToken) {
      logoutMutation.mutate(
        { accessToken },
        {
          onSuccess: () => {
            navigate('/signin', { replace: true });
          },
        },
      );
    } else {
      navigate('/signin', { replace: true });
    }
  };

  return (
    <Flex justify="space-between" css={headerCss.container}>
      <img src={logoImage} css={{ width: 100 }} />
      <Flex gap={20} align="center">
        <ColorPicker />
        {user && (
          <Text size="body-medium" color="gray_060">
            {user.email}
          </Text>
        )}
        <Button
          variant="secondary"
          display="inline"
          size="regular-2"
          gutter="20px"
          radius="small"
          onClick={handleLogout}
        >
          로그아웃
        </Button>
      </Flex>
    </Flex>
  );
};
