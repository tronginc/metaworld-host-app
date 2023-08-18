import Box from '@components/UI/Box';
import Image from '@components/UI/Image';
import Text from '@components/UI/Text';
import { sizeScale } from '@helpers/scale';
import { useTheme } from '@react-navigation/native';
import React, { useMemo, useEffect, useCallback } from 'react';
import { Controller, FieldValues, Path, useFormContext } from 'react-hook-form';
import {
  InteractionManager,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';

interface OTPInputProps<T> {
  name: Path<T>;
  onCodeFilled?: () => void;
}

const OTPInput = <T extends FieldValues>({
  name,
  onCodeFilled,
}: OTPInputProps<T>) => {
  const { control, watch, setFocus } = useFormContext<T>();

  const otp = watch(name) as string;

  const otpDigits = useMemo(() => {
    // split string to array
    // make sure array length is 6
    // fill empty string to array
    return otp
      .split('')
      .slice(0, 6)
      .concat(Array(6 - otp.length).fill(''));
  }, [otp]);

  const { colors } = useTheme();

  const slotStyle = useMemo(() => {
    return StyleSheet.flatten([
      styles.slot,
      {
        borderColor: colors.neutral_03,
      },
    ]);
  }, [colors]);

  const slotFocusedStyle = useMemo(() => {
    return StyleSheet.flatten([
      styles.slot,
      {
        borderColor: colors.neutral_07,
      },
    ]);
  }, [colors]);

  const slotErrorStyle = useMemo(() => {
    return StyleSheet.flatten([
      styles.slot,
      {
        borderColor: colors.error,
      },
    ]);
  }, [colors]);

  const focusInvinsibleInput = useCallback(() => {
    setFocus(name);
  }, [name, setFocus]);

  useEffect(() => {
    InteractionManager.runAfterInteractions(focusInvinsibleInput);
  }, [focusInvinsibleInput]);

  const currentSlotIndex = otpDigits.findIndex(digit => digit === '');

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => (
        <View>
          <TextInput
            ref={ref}
            style={styles.invisibleInput}
            value={value}
            onChangeText={text => {
              onChange(text);
              if (text.length === 6) {
                Keyboard.dismiss();
                onCodeFilled?.();
              }
            }}
            keyboardType="number-pad"
            maxLength={6}
          />

          <Pressable onPress={focusInvinsibleInput} style={styles.container}>
            {otpDigits.map((digit, index) => (
              <View
                key={index}
                style={
                  error
                    ? slotErrorStyle
                    : index === currentSlotIndex
                    ? slotFocusedStyle
                    : slotStyle
                }>
                <Text style={styles.slotText}>{digit}</Text>
              </View>
            ))}
          </Pressable>

          {error?.message ? (
            <Box
              marginVertical={sizeScale(10)}
              gap={sizeScale(4)}
              flexDirection="row"
              justifyContent="center"
              alignItems="center">
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
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  slot: {
    borderWidth: 1,
    fontWeight: 'bold',
    flex: 1,
    maxWidth: sizeScale(60),
    borderRadius: sizeScale(8),
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 52 / 64,
  },
  slotText: {
    fontWeight: 'bold',
    fontSize: sizeScale(36),
    textAlign: 'center',
  },
  invisibleInput: {
    top: -9999,
    left: -9999,
  },
  container: {
    flexDirection: 'row',
    gap: sizeScale(8),
    position: 'relative',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
});

export default OTPInput;
