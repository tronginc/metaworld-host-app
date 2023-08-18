import React, { useEffect, useMemo } from 'react';
import Screen from '@components/UI/Screen';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Form from '@components/Form';
import FormButton from '@components/Form/FormButton';
import { useTranslation } from 'react-i18next';
import { useNavigation, useTheme } from '@react-navigation/native';
import { sizeScale } from '@helpers/scale';
import Box from '@components/UI/Box';
import Image from '@components/UI/Image';
import Text from '@components/UI/Text';
import { getRequestError, isEmailValid, isPhoneValid } from '@utils/string';
import { StyleSheet } from 'react-native';
import PressableText from '@components/UI/PressableText';
import ScreenList from '@constants/screenList';
import useRegisterMutation from '../hooks/useRegisterMutation';

type Props = {};

const SignUpScreen: React.FC<Props> = ({}) => {
  const [t] = useTranslation('auth');
  const { colors } = useTheme();
  const navigation = useNavigation();
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

        confirm_password: yup
          .string()
          .min(6, t('errors.password_at_least_n_characters', { n: 6 }))
          .required(t('errors.password_is_required'))
          .test(
            'passwords-match',
            t('errors.the_password_confirmation_does_not_match'),
            function (value) {
              return this.parent.password === value;
            },
          ),
      })
      .required();
  }, [t]);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: __DEV__
      ? {
          email_or_phone: 'tronginc@gmail.com',
          password: '123456',
          confirm_password: '123456',
        }
      : undefined,
  });

  const { isLoading, mutate, error } = useRegisterMutation();

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
          referralCode: '',
        }
      : {
          phone: data.email_or_phone,
          password: data.password,
          type: 'phone',
          referralCode: '',
        };
    return mutate(payload);
  };

  const handlePressLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: ScreenList.AUTH_LOGIN }],
    });
  };

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
              {t('labels.create_an_account')}
            </Text>
            <Text textAlign="center" fontSize={16} color="#8D9BB9">
              {t('labels.please_enter_your_details')}
            </Text>
          </Box>
        </Box>
        <Form
          paddingHorizontal={sizeScale(20)}
          paddingVertical={sizeScale(32)}
          gap={sizeScale(20)}
          methods={methods}>
          <Form.FormInput
            editable={!isLoading}
            name="email_or_phone"
            label={t('forms.email_phone')}
            placeholder={t('forms.input_email_phone')}
            autoComplete="email"
            control={methods.control}
            autoCorrect={false}
            autoCapitalize="none"
          />
          <Form.FormInput
            editable={!isLoading}
            name="password"
            label={t('forms.password')}
            placeholder={t('forms.input_password')}
            control={methods.control}
            secureTextEntry
            autoComplete="new-password"
            textContentType="newPassword"
            autoCapitalize="none"
          />
          <Form.FormInput
            editable={!isLoading}
            name="confirm_password"
            label={t('forms.confirm_password')}
            placeholder={t('forms.input_password')}
            control={methods.control}
            onEndEditing={methods.handleSubmit(handleSubmit)}
            secureTextEntry
            autoComplete="new-password"
            textContentType="newPassword"
            autoCapitalize="none"
            enablesReturnKeyAutomatically
          />

          <FormButton
            style={styles.button}
            disabled={isLoading || !methods.formState.isValid}
            onPress={methods.handleSubmit(handleSubmit)}
            isLoading={isLoading}>
            {t('forms.sign_up')}
          </FormButton>

          <Box flexDirection="row" alignItems="center" justifyContent="center">
            <Text color={colors.text} fontWeight="400">
              {t('labels.already_have_an_account')}
            </Text>
            <PressableText
              onPress={handlePressLogin}
              padding={sizeScale(4)}
              fontSize={14}
              color={colors.primary}
              fontWeight="700">
              {t('labels.log_in')}
            </PressableText>
          </Box>
        </Form>
      </Box>
    </Screen>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: sizeScale(12),
  },
});

export default SignUpScreen;
