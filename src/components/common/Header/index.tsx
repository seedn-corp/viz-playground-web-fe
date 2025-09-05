import { Button, Text } from '@basiln/design-system';
import { Flex } from '@basiln/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import logoImage from '@/assets/icons/logo.png';
import { ColorPicker } from '@/components/common/ColorPicker';
import { ConfirmDeleteDialog } from '@/components/common/ConfirmDeleteDialog';
import { headerCss } from '@/components/common/Header/styles';
import { useAuth } from '@/hooks/auth/useAuth';
import { useLogout } from '@/hooks/mutation/auth/useLogout';

export const Header = () => {
  const { user, accessToken } = useAuth();
  const logoutMutation = useLogout();
  const navigate = useNavigate();

  const [logoutOpen, setLogoutOpen] = useState(false);

  const handleLogoutConfirm = () => {
    if (accessToken) {
      logoutMutation.mutate(
        { accessToken },
        {
          onSuccess: () => {
            setLogoutOpen(false);
            navigate('/signin', { replace: true });
          },
          onError: () => {
            setLogoutOpen(false);
          },
        },
      );
    } else {
      setLogoutOpen(false);
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
          onClick={() => setLogoutOpen(true)}
          disabled={logoutMutation.isPending}
        >
          로그아웃
        </Button>
      </Flex>

      <ConfirmDeleteDialog
        isOpen={logoutOpen}
        onCancel={() => setLogoutOpen(false)}
        onConfirm={handleLogoutConfirm}
        isLoading={logoutMutation.isPending}
        titleText="로그아웃하시겠습니까?"
        descriptionText="로그인 후 이용할 수 있는 서비스 입니다."
        confirmLabel="로그아웃"
        cancelLabel="취소"
      />
    </Flex>
  );
};
