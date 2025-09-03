import { Button, Text } from '@basiln/design-system';
import { Flex, If } from '@basiln/utils';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useLogin } from '@/hooks/mutation/auth/useLogin';

import { signInCss } from './styles';

const SignIn = () => {
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError('이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setError('');

    loginMutation.mutate(formData, {
      onSuccess: () => {
        navigate('/dashboard');
      },
      onError: (err: unknown) => {
        const errorMessage =
          err && typeof err === 'object' && 'response' in err
            ? (err as { response?: { data?: { message?: string } } })?.response?.data?.message
            : '로그인에 실패했습니다.';
        setError(errorMessage || '로그인에 실패했습니다.');
      },
    });
  };

  return (
    <div css={signInCss.container}>
      <div css={signInCss.content}>
        <Flex direction="column" justify="flex-start" align="flex-start" gap={32}>
          <Flex direction="column" justify="flex-start" align="flex-start" gap={8}>
            <Text size="title-large">로그인</Text>
            <Text size="body-medium" color="gray_060">
              이메일과 비밀번호를 입력해주세요
            </Text>
          </Flex>

          <form onSubmit={handleSubmit} css={signInCss.form}>
            <Flex direction="column" justify="flex-start" align="flex-start" gap={16}>
              <Flex
                direction="column"
                justify="flex-start"
                align="flex-start"
                gap={8}
                css={signInCss.inputWrap}
              >
                <Text size="body-medium">이메일</Text>
                <input
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange('email', e.target.value)
                  }
                  disabled={loginMutation.isPending}
                  css={signInCss.input}
                />
              </Flex>

              <Flex
                direction="column"
                justify="flex-start"
                align="flex-start"
                gap={8}
                css={signInCss.inputWrap}
              >
                <Text size="body-medium">비밀번호</Text>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요"
                  value={formData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange('password', e.target.value)
                  }
                  disabled={loginMutation.isPending}
                  css={signInCss.input}
                />
              </Flex>

              <If condition={!!error}>
                <Text size="body-small" color="seedn_key">
                  {error}
                </Text>
              </If>

              <Button
                type="submit"
                radius="small"
                disabled={loginMutation.isPending}
                isLoading={loginMutation.isPending}
                css={signInCss.submitButton}
              >
                로그인
              </Button>
            </Flex>
          </form>

          <Flex gap={8} align="center" css={signInCss.inputWrap}>
            <Text size="body-small" color="gray_060">
              계정이 없으신가요?
            </Text>
            <Button
              display="inline"
              variant="ghost"
              size="small"
              onClick={() => navigate('/signup')}
            >
              회원가입
            </Button>
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

export default SignIn;
