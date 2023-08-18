import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Form from '@components/Form';
import FormButton from '@components/Form/FormButton';
import { useTranslation } from 'react-i18next';
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
import OTPInput from '@components/Form/OTPInput';
import { RootStackParamList } from '@navigations/index.types';
import ScreenList from '@constants/screenList';
import useVerifyRegisterMutation from '../hooks/useVerifyRegisterMutation';
import ResendCode from '../components/ResendCode';
import AuthLayout from '../components/AuthLayout';

type Props = {};

type RouteProps = RouteProp<RootStackParamList, ScreenList.AUTH_CONFIRM_CODE>;

const ConfirmCodeScreen: React.FC<Props> = ({}) => {
  const [t] = useTranslation('auth');
  const { colors } = useTheme();
  const { params } = useRoute<RouteProps>();
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
        verifyCode: yup.string().length(6, '').required(''),
      })
      .required();
  }, [t]);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email_or_phone: params.email_or_phone, verifyCode: '' },
  });

  const { isLoading, mutate, error } = useVerifyRegisterMutation();

  useEffect(() => {
    if (error) {
      const message = getRequestError(error);
      methods.setError('verifyCode', {
        message,
      });
    }
  }, [error, methods]);

  const handleSubmit = (data: yup.InferType<typeof schema>) => {
    // This code is for forgot password
    if (params.isForgotPassword) {
      return navigation.navigate(ScreenList.AUTH_SET_NEW_PASSWORD, {
        email_or_phone: params.email_or_phone,
        code: data.verifyCode,
      });
    }

    // Form is valid, so we just need check if email is phone or email
    // Just check field have @ is email, else is phone
    const isEmail = data.email_or_phone.includes('@');
    const payload: Parameters<typeof mutate>[0] = isEmail
      ? {
          email: data.email_or_phone,
          verifyCode: data.verifyCode,
          type: 'email',
        }
      : {
          phone: data.email_or_phone,
          verifyCode: data.verifyCode,
          type: 'phone',
        };

    return mutate(payload);
  };

  return (
    <AuthLayout
      title={t('labels.confirmation_code')}
      subtitle={t('labels.confirmation_code_sent_description', {
        email: params.email_or_phone,
      })}>
      <Form
        paddingHorizontal={sizeScale(20)}
        paddingVertical={sizeScale(32)}
        gap={sizeScale(20)}
        methods={methods}>
        <OTPInput<yup.InferType<typeof schema>>
          name="verifyCode"
          onCodeFilled={methods.handleSubmit(handleSubmit)}
        />

        <Box
          flexDirection="row"
          marginTop={-sizeScale(8)}
          alignItems="center"
          justifyContent="center">
          <Text color={colors.text} fontWeight="400">
            {t('labels.dont_get_a_code')}
          </Text>
          <ResendCode />
        </Box>

        <FormButton
          style={styles.loginButton}
          disabled={isLoading || !methods.formState.isValid}
          onPress={methods.handleSubmit(handleSubmit)}
          isLoading={isLoading}>
          {t('forms.continue')}
        </FormButton>
      </Form>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    marginTop: sizeScale(12),
  },
});

export default ConfirmCodeScreen;
