import React, { useEffect, useMemo } from 'react';
import Screen from '@components/UI/Screen';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Form from '@components/Form';
import FormButton from '@components/Form/FormButton';
import { useTranslation } from 'react-i18next';
import useLoginMutation from '@features/Auth/hooks/useLoginMutation';
import { useTheme } from '@react-navigation/native';
import { sizeScale } from '@helpers/scale';
import Box from '@components/UI/Box';
import Image from '@components/UI/Image';
import Text from '@components/UI/Text';
import { getRequestError, isEmailValid, isPhoneValid } from '@utils/string';
import { StyleSheet } from 'react-native';
import PressableText from '@components/UI/PressableText';
import OTPInput from '@components/Form/OTPInput';

type Props = {};

const ConfirmCodeScreen: React.FC<Props> = ({}) => {
  const [t] = useTranslation('auth');
  const { colors } = useTheme();

  const schema = useMemo(() => {
    return yup
      .object({
        // Check if email is email or phone using only yup
        email_or_phone: yup
          .string()
          .required(t('errors.email_or_phone_is_required'))
          .test(
            'is-email-or-phone',
            t('errors.email_or_phone_is_invalid'),
            value => {
              if (!value) {
                return false;
              }
              return isEmailValid(value) || isPhoneValid(value);
            },
          ),

        password: yup
          .string()
          .min(6, t('errors.password_at_least_n_characters', { n: 6 }))
          .required(t('errors.password_is_required')),
      })
      .required();
  }, [t]);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: __DEV__
      ? {
          email_or_phone: 'tronginc@yopmail.com',
          password: '123456',
        }
      : undefined,
  });

  const { isLoading, mutate, error } = useLoginMutation();

  useEffect(() => {
    if (error) {
      const message = getRequestError(error);
      if (message.toLowerCase().includes('password')) {
        methods.setError('password', {
          message,
        });
        return;
      }
      methods.setError('email_or_phone', {
        message: getRequestError(error),
      });
    }
  }, [error, methods]);

  const handleSubmit = (data: yup.InferType<typeof schema>) => {
    // Form is valid, so we just need check if email is phone or email
    // Just check field have @ is email, else is phone
    const isEmail = data.email_or_phone.includes('@');
    const payload: Parameters<typeof mutate>[0] = isEmail
      ? {
          email: data.email_or_phone,
          password: data.password,
          type: 'email',
        }
      : {
          phone: data.email_or_phone,
          password: data.password,
          type: 'phone',
        };
    return mutate(payload);
  };

  const handlePressResendCode = () => {};

  return (
    <Screen enableScroll safeAreaEdge="all" backgroundColor={colors.background}>
      <Box paddingVertical={sizeScale(36)}>
        <Box alignItems="center" gap={sizeScale(24)}>
          <Image
            source={require('@assets/images/logo.png')}
            height={48}
            width={48}
          />
          <Box alignItems="center" gap={sizeScale(8)}>
            <Text fontWeight="bold" fontSize={28} color={colors.text}>
              {t('labels.confirmation_code')}
            </Text>
            <Text textAlign="center" fontSize={16} color="#8D9BB9">
              {t('labels.confirmation_code_sent_description', {
                email: '',
              })}
              <Text fontSize={16} fontWeight="bold">
                tronginc@gmail.com
              </Text>
            </Text>
          </Box>
        </Box>
        <Form
          paddingHorizontal={sizeScale(20)}
          paddingVertical={sizeScale(32)}
          gap={sizeScale(20)}
          methods={methods}>
          <OTPInput onSubmit={console.log} />

          <Box
            flexDirection="row"
            marginTop={-sizeScale(8)}
            alignItems="center"
            justifyContent="center">
            <Text color={colors.text} fontWeight="400">
              {t('labels.dont_get_a_code')}
            </Text>
            <PressableText
              onPress={handlePressResendCode}
              padding={sizeScale(4)}
              fontSize={14}
              color={colors.primary}
              fontWeight="700">
              {t('labels.click_to_resend')}
            </PressableText>
          </Box>

          <FormButton
            style={styles.loginButton}
            disabled={isLoading || !methods.formState.isValid}
            onPress={methods.handleSubmit(handleSubmit)}
            isLoading={isLoading}>
            {t('forms.continue')}
          </FormButton>
        </Form>
      </Box>
    </Screen>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    marginTop: sizeScale(12),
  },
});

export default ConfirmCodeScreen;
