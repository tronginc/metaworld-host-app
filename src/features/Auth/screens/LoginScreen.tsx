import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Form from '@components/Form';
import FormButton from '@components/Form/FormButton';
import { useTranslation } from 'react-i18next';
import useLoginMutation from '@features/Auth/hooks/useLoginMutation';
import {
  RouteProp,
  useNavigation,
  useRoute,
  useTheme,
} from '@react-navigation/native';
import { sizeScale } from '@helpers/scale';
import Box from '@components/UI/Box';
import Text from '@components/UI/Text';
import { getRequestError, isEmailValid, isPhoneValid } from '@utils/string';
import { StyleSheet } from 'react-native';
import PressableText from '@components/UI/PressableText';
import ScreenList from '@constants/screenList';
import { RootStackParamList } from '@navigations/index.types';
import AuthLayout from '../components/AuthLayout';
import Checkbox from '@components/Form/Checkbox';

type Props = {};

type RouteProps = RouteProp<RootStackParamList, ScreenList.AUTH_LOGIN>;

const LoginScreen: React.FC<Props> = ({}) => {
  const [t] = useTranslation('auth');
  const { colors } = useTheme();
  const navigation = useNavigation();
  const { params } = useRoute<RouteProps>();

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
    defaultValues: params?.email_or_phone
      ? {
          email_or_phone: params.email_or_phone,
          password: '',
        }
      : __DEV__
      ? {
          email_or_phone: 't.ronginc@gmail.com',
          password: '123456',
        }
      : undefined,
  });

  const { isLoading, mutate, error } = useLoginMutation();

  const handleError = useCallback(() => {
    if (!error) {
      return;
    }

    const message = getRequestError(error);
    if (message === 'Account is not verified') {
      return navigation.navigate(ScreenList.AUTH_CONFIRM_CODE, {
        email_or_phone: methods.getValues('email_or_phone'),
        password: methods.getValues('password'),
        referralCode: '',
        isLogin: true,
      });
    }
    if (message.toLowerCase().includes('password')) {
      methods.setError('password', {
        message,
      });
      return;
    }
    methods.setError('email_or_phone', {
      message: getRequestError(error),
    });
  }, [error, methods, navigation]);

  useEffect(() => {
    handleError();
  }, [handleError]);

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

  const hanlePressSignUp = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: ScreenList.AUTH_SIGN_UP }],
    });
  };

  const hanlePressForgotPassword = () => {
    navigation.navigate(ScreenList.AUTH_FORGOT_PASSWORD);
  };

  return (
    <AuthLayout title={t('labels.log_in')} subtitle={t('labels.welcome_back')}>
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
          autoComplete="password"
          textContentType="newPassword"
          autoCapitalize="none"
          enablesReturnKeyAutomatically
        />
        <Box
          marginRight={-sizeScale(4)} // - Pading right for padding of PressableText to increase touchable area
          marginVertical={-sizeScale(4)} // - Pading top and bottom for padding of PressableText to increase touchable area
          flexDirection="row"
          alignItems="center"
          // No gap because we have padding in PressableText to increase touchable area
          justifyContent="space-between">
          <Box flexDirection="row" alignItems="center">
            <Checkbox checked onChange={console.log}>
              <Text fontWeight="400" color={colors.text}>
                {t('forms.remember_me_for_n_days', { n: 30 })}
              </Text>
            </Checkbox>
          </Box>
          <PressableText
            onPress={hanlePressForgotPassword}
            fontSize={14}
            color={colors.primary}
            padding={sizeScale(4)}
            fontWeight="bold">
            {t('forms.forgot_password')}
          </PressableText>
        </Box>
        <FormButton
          style={styles.loginButton}
          disabled={isLoading || !methods.formState.isValid}
          onPress={methods.handleSubmit(handleSubmit)}
          isLoading={isLoading}>
          {t('forms.sign_in')}
        </FormButton>

        <Box flexDirection="row" alignItems="center" justifyContent="center">
          <Text color={colors.text} fontWeight="400">
            {t('labels.dont_have_an_account')}
          </Text>
          <PressableText
            onPress={hanlePressSignUp}
            padding={sizeScale(4)}
            fontSize={14}
            color={colors.primary}
            fontWeight="700">
            {t('forms.sign_up')}
          </PressableText>
        </Box>
      </Form>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    marginTop: sizeScale(12),
  },
});

export default LoginScreen;
