import React, { useMemo } from 'react';
import Screen from '@components/UI/Screen';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Form from '@components/Form';
import FormButton from '@components/Form/FormButton';
import { useTranslation } from 'react-i18next';
import useLoginMutation from '@hooks/auth/useLoginMutation';

type Props = {};

const LoginScreen: React.FC<Props> = ({}) => {
  const [t] = useTranslation('auth');
  const schema = useMemo(() => {
    return yup
      .object({
        email: yup
          .string()
          .email(t('errors.email_is_invalid'))
          .required(t('errors.email_is_required')),
        // phone: yup.string().required(),
        password: yup
          .string()
          .min(6, t('errors.password_at_least_n_characters', { n: 6 }))
          .required(t('errors.password_is_required')),
      })
      .required();
  }, [t]);

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const { isLoading, mutate } = useLoginMutation();

  const handleSubmit = (data: yup.InferType<typeof schema>) => {
    return mutate({
      type: 'email',
      email: data.email,
      password: data.password,
    });
  };

  return (
    <Screen
      enableScroll
      safeAreaEdge="all"
      justifyContent="center"
      padding={20}
      backgroundColor="#10151A">
      <Form gap={12} methods={methods}>
        <Form.FormInput
          name="email"
          placeholder={t('forms.email')}
          autoComplete="email"
          control={methods.control}
        />
        <Form.FormInput
          name="password"
          secureTextEntry
          placeholder={t('forms.password')}
          autoComplete="password"
          control={methods.control}
        />
        <FormButton
          disabled={isLoading}
          onPress={methods.handleSubmit(handleSubmit)}
        />
      </Form>
    </Screen>
  );
};

export default LoginScreen;
