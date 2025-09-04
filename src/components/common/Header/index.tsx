import { Button, Text } from '@basiln/design-system';
import { Flex } from '@basiln/utils';
import { useNavigate } from 'react-router';

import logoImage from '@/assets/icons/logo.png';
import { headerCss } from '@/components/common/Header/styles';
import { useAuth } from '@/hooks/auth/useAuth';
import { useLogout } from '@/hooks/mutation/auth/useLogout';

import type { HeaderProps } from './types';

export const Header = ({ onOpenDialog }: HeaderProps) => {
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
        {user && (
          <Text size="body-medium" color="gray_060">
            {user.email}
          </Text>
        )}
        <Button
          display="inline"
          size="regular-2"
          gutter="20px"
          radius="small"
          onClick={onOpenDialog}
        >
          + 위젯 추가
        </Button>
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
