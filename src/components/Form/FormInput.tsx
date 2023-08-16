import { sizeScale } from '@helpers/scale';
import React, { useMemo } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Platform, StyleSheet, TextInput, TextInputProps } from 'react-native';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
} & TextInputProps;

const FormInput = <T extends FieldValues>({
  control,
  name,
  ...props
}: Props<T>) => {
  const styleInputInValid = useMemo(() => {
    return StyleSheet.compose(styles.input, {
      borderColor: 'red',
      borderWidth: 1,
    });
  }, []);

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <TextInput
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          style={error ? styleInputInValid : styles.input}
          {...props}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#fffffaaa',
    ...Platform.select({
      ios: {
        padding: 10,
        borderRadius: 10,
      },
      android: {
        padding: 5,
        borderRadius: 5,
      },
    }),
    fontSize: sizeScale(16),
  },
});

export default FormInput;
