import React, { ComponentProps, PropsWithChildren } from 'react';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';
import FormInput from './FormInput';
import FormButton from './FormButton';
import Box from '@components/UI/Box';

type Props<T extends FieldValues> = {
  methods: UseFormReturn<T>;
} & ComponentProps<typeof Box>;

const Form = <T extends FieldValues>({
  children,
  methods,
  ...props
}: PropsWithChildren<Props<T>>) => {
  return (
    <FormProvider {...methods}>
      <Box {...props}>{children}</Box>
    </FormProvider>
  );
};

Form.FormInput = FormInput;
Form.FormButton = FormButton;

export default Form;
