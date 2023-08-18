import React, { useEffect } from 'react';
import useResendCodeMutation from '../hooks/useResendCodeMutation';
import PressableText from '@components/UI/PressableText';
import { RouteProp, useRoute, useTheme } from '@react-navigation/native';
import { RootStackParamList } from '@navigations/index.types';
import ScreenList from '@constants/screenList';
import { sizeScale } from '@helpers/scale';
import { useTranslation } from 'react-i18next';
import Text from '@components/UI/Text';
import Box from '@components/UI/Box';

type Props = {};

type RouteProps = RouteProp<RootStackParamList, ScreenList.AUTH_CONFIRM_CODE>;

const ResendCode: React.FC<Props> = ({}) => {
  const { params } = useRoute<RouteProps>();
  const {
    countdown,
    mutate: resend,
    setLastEmailSent,
  } = useResendCodeMutation();
  const { colors } = useTheme();
  const [t] = useTranslation('auth');

  useEffect(() => {
    if (!params.isLogin) {
      setLastEmailSent(Date.now());
    }
  }, [params.isLogin, setLastEmailSent]);

  const handlePressResendCode = () => {
    const isEmail = params.email_or_phone.includes('@');
    const payload: Parameters<typeof resend>[0] = isEmail
      ? {
          email: params.email_or_phone,
          password: params.password,
          type: 'email',
          referralCode: params.referralCode,
        }
      : {
          phone: params.email_or_phone,
          password: params.password,
          type: 'phone',
          referralCode: params.referralCode,
        };
    resend(payload);
  };

  if (countdown > 0) {
    return (
      <Box padding={sizeScale(4)}>
        <Text fontSize={14} fontWeight="700" color={colors.neutral_04}>
          {t('labels.resend_after_n_seconds', {
            n: countdown.toString().padStart(2, '0'),
          })}
        </Text>
      </Box>
    );
  }

  return (
    <PressableText
      onPress={handlePressResendCode}
      padding={sizeScale(4)}
      fontSize={14}
      disabled={countdown > 0}
      color={colors.primary}
      fontWeight="700">
      {t('labels.click_to_resend')}
    </PressableText>
  );
};

export default ResendCode;
