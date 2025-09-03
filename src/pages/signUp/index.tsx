import { Button, Text } from '@basiln/design-system';
import { Flex, If } from '@basiln/utils';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';

import { useSignUp } from '@/hooks/mutation/auth/useSignUp';

import { signUpCss } from './styles';

const SignUp = () => {
  const navigate = useNavigate();
  const signUpMutation = useSignUp();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');

  const handleInputChange = (field: 'email' | 'password' | 'confirmPassword', value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const validate = () => {
    const email = formData.email.trim();
    const { password, confirmPassword } = formData;

    if (!email || !password || !confirmPassword) {
      setError('모든 필드를 입력해주세요.');
      return false;
    }
    if (!/.+@.+\..+/.test(email)) {
      setError('올바른 이메일 형식을 입력해주세요.');
      return false;
    }

    if (password.length < 6) {
      setError('비밀번호는 최소 6자 이상이어야 합니다.');
      return false;
    }
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setError('');
    signUpMutation.mutate(
      { email: formData.email.trim(), password: formData.password },
      {
        onSuccess: (res) => {
          if (res.success) {
            toast.success(res.message || '회원가입이 완료되었습니다. 로그인해주세요.');
            navigate('/signin', { replace: true });
          } else {
            setError(res.message || '회원가입에 실패했습니다.');
          }
        },
        onError: (err: unknown) => {
          const msg =
            err && typeof err === 'object' && 'response' in err
              ? (err as { response?: { data?: { message?: string } } })?.response?.data?.message
              : '회원가입에 실패했습니다.';
          setError(msg || '회원가입에 실패했습니다.');
        },
      },
    );
  };

  return (
    <div css={signUpCss.container}>
      <div css={signUpCss.content}>
        <Flex direction="column" justify="flex-start" align="flex-start" gap={32}>
          <Flex direction="column" justify="flex-start" align="flex-start" gap={8}>
            <Text size="title-large">회원가입</Text>
            <Text size="body-medium" color="gray_060">
              이메일과 비밀번호를 입력해주세요
            </Text>
          </Flex>

          <form onSubmit={handleSubmit} css={signUpCss.form}>
            <Flex direction="column" justify="flex-start" align="flex-start" gap={16}>
              <Flex
                direction="column"
                justify="flex-start"
                align="flex-start"
                gap={8}
                css={signUpCss.inputWrap}
              >
                <Text size="body-medium">이메일</Text>
                <input
                  type="email"
                  placeholder="이메일을 입력해주세요"
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange('email', e.target.value)
                  }
                  autoComplete="email"
                  disabled={signUpMutation.isPending}
                  css={signUpCss.input}
                />
              </Flex>

              <Flex
                direction="column"
                justify="flex-start"
                align="flex-start"
                gap={8}
                css={signUpCss.inputWrap}
              >
                <Text size="body-medium">비밀번호</Text>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요 (최소 6자)"
                  value={formData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange('password', e.target.value)
                  }
                  autoComplete="new-password"
                  minLength={6}
                  disabled={signUpMutation.isPending}
                  css={signUpCss.input}
                />
              </Flex>

              <Flex
                direction="column"
                justify="flex-start"
                align="flex-start"
                gap={8}
                css={signUpCss.inputWrap}
              >
                <Text size="body-medium">비밀번호 확인</Text>
                <input
                  type="password"
                  placeholder="비밀번호를 다시 입력해주세요"
                  value={formData.confirmPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange('confirmPassword', e.target.value)
                  }
                  autoComplete="new-password"
                  minLength={6}
                  disabled={signUpMutation.isPending}
                  css={signUpCss.input}
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
                disabled={signUpMutation.isPending}
                isLoading={signUpMutation.isPending}
                css={signUpCss.submitButton}
              >
                회원가입
              </Button>
            </Flex>
          </form>

          <Flex gap={8} align="center" css={signUpCss.inputWrap}>
            <Text size="body-small" color="gray_060">
              이미 계정이 있으신가요?
            </Text>
            <Button
              display="inline"
              variant="ghost"
              size="small"
              onClick={() => navigate('/signin')}
            >
              로그인
            </Button>
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

export default SignUp;
