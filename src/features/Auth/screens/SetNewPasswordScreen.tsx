import React, { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Form from '@components/Form';
import FormButton from '@components/Form/FormButton';
import { useTranslation } from 'react-i18next';
import { RouteProp, useRoute } from '@react-navigation/native';
import { sizeScale } from '@helpers/scale';
import { getRequestError, isEmailValid, isPhoneValid } from '@utils/string';
import { StyleSheet } from 'react-native';
import ScreenList from '@constants/screenList';
import useSetNewPasswordMutation from '../hooks/useSetNewPasswordMutation';
import { RootStackParamList } from '@navigations/index.types';
import AuthLayout from '../components/AuthLayout';

type Props = {};

type RouteProps = RouteProp<
  RootStackParamList,
  ScreenList.AUTH_SET_NEW_PASSWORD
>;

const SetNewPasswordScreen: React.FC<Props> = ({}) => {
  const [t] = useTranslation('auth');
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

  const { isLoading, mutate, error } = useSetNewPasswordMutation();

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
          newPassword: data.password,
          type: 'email',
          otpCode: params.code,
        }
      : {
          phone: data.email_or_phone,
          newPassword: data.password,
          type: 'phone',
          otpCode: params.code,
        };
    return mutate(payload);
  };

  return (
    <AuthLayout
      title={t('labels.new_password')}
      subtitle={t('labels.please_enter_your_new_password')}>
      <Form
        paddingHorizontal={sizeScale(20)}
        paddingVertical={sizeScale(32)}
        gap={sizeScale(20)}
        methods={methods}>
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

export default SetNewPasswordScreen;
