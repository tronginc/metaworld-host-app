import React, { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Form from '@components/Form';
import FormButton from '@components/Form/FormButton';
import { useTranslation } from 'react-i18next';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { sizeScale } from '@helpers/scale';
import { getRequestError, isEmailValid, isPhoneValid } from '@utils/string';
import { StyleSheet } from 'react-native';
import ScreenList from '@constants/screenList';
import { RootStackParamList } from '@navigations/index.types';
import useSendCodeResetPasswordMutation from '../hooks/useSendCodeResetPasswordMutation';
import AuthLayout from '../components/AuthLayout';

type Props = {};

type RouteProps = RouteProp<RootStackParamList, ScreenList.AUTH_LOGIN>;

const ForgotPasswordScreen: React.FC<Props> = ({}) => {
  const [t] = useTranslation('auth');
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
      })
      .required();
  }, [t]);

  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: params?.email_or_phone
      ? {
          email_or_phone: params.email_or_phone,
        }
      : __DEV__
      ? {
          email_or_phone: 't.ronginc@gmail.com',
        }
      : undefined,
  });

  const { isLoading, mutate, error } = useSendCodeResetPasswordMutation();

  const handleError = useCallback(() => {
    if (!error) {
      return;
    }

    const message = getRequestError(error);
    if (message === 'Account is not verified') {
      return navigation.navigate(ScreenList.AUTH_CONFIRM_CODE, {
        email_or_phone: methods.getValues('email_or_phone'),
        password: '',
        referralCode: '',
        isLogin: true,
      });
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
          type: 'email',
          email: data.email_or_phone,
        }
      : {
          type: 'phone',
          phone: data.email_or_phone,
        };
    return mutate(payload);
  };

  return (
    <AuthLayout
      title={t('labels.forgot_password')}
      subtitle={t('labels.please_enter_your_email')}>
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

        <FormButton
          style={styles.button}
          disabled={isLoading || !methods.formState.isValid}
          onPress={methods.handleSubmit(handleSubmit)}
          isLoading={isLoading}>
          {t('forms.submit')}
        </FormButton>
      </Form>
    </AuthLayout>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: sizeScale(12),
  },
});

export default ForgotPasswordScreen;
