import Box from '@components/UI/Box';
import Image from '@components/UI/Image';
import Text from '@components/UI/Text';
import TextInput from '@components/UI/TextInput';
import { sizeScale } from '@helpers/scale';
import { useTheme } from '@react-navigation/native';
import React, { useMemo, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { Platform, StyleSheet, TextInputProps } from 'react-native';

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
} & TextInputProps;

const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  ...props
}: Props<T>) => {
  const styleInputInValid = useMemo(() => {
    return StyleSheet.compose(styles.input, {
      borderColor: 'red',
      borderWidth: 1,
    });
  }, []);

  const { colors } = useTheme();
  const [isFocus, setIsFocus] = useState(false);

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <Box gap={sizeScale(8)}>
          <Text fontSize={16} fontWeight="500" color={colors.neutral_09}>
            {label}
          </Text>
          <Box gap={sizeScale(4)}>
            <TextInput
              onFocus={handleFocus}
              underlineColorAndroid="transparent"
              placeholderTextColor={colors.neutral_05}
              backgroundColor={colors.card}
              borderColor={
                isFocus ? colors.neutral_05 : error ? 'red' : colors.neutral_03
              }
              onBlur={() => {
                onBlur();
                handleBlur();
              }}
              onChangeText={onChange}
              value={value}
              fontSize={16}
              style={error ? styleInputInValid : styles.input}
              {...props}
            />
            {error?.message ? (
              <Box gap={sizeScale(4)} flexDirection="row" alignItems="center">
                <Image
                  height={sizeScale(16)}
                  width={sizeScale(16)}
                  source={require('@assets/images/icons/circle-exclamation.png')}
                />
                <Text fontSize={14} color={colors.error}>
                  {error?.message}
                </Text>
              </Box>
            ) : null}
          </Box>
        </Box>
      )}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    ...Platform.select({
      ios: {
        paddingVertical: sizeScale(12),
      },
      android: {
        paddingVertical: sizeScale(10),
      },
    }),
    borderRadius: sizeScale(8),
    paddingHorizontal: sizeScale(16),
    borderWidth: sizeScale(1),
  },
});

export default FormInput;
