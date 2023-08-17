import Text from '@components/UI/Text';
import { sizeScale } from '@helpers/scale';
import { useTheme } from '@react-navigation/native';
import React, { useState, useRef, useMemo, useEffect } from 'react';
import { Keyboard, Pressable, StyleSheet, TextInput, View } from 'react-native';

interface OTPInputProps {
  onSubmit: (otp: string) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ onSubmit }) => {
  const [otp, setOTP] = useState<string>('');

  const otpDigits = useMemo(() => {
    // split string to array
    // make sure array length is 6
    // fill empty string to array
    return otp
      .split('')
      .slice(0, 6)
      .concat(Array(6 - otp.length).fill(''));
  }, [otp]);

  const inputRef = useRef<TextInput>(null);

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

  const focusInvinsibleInput = () => {
    inputRef.current?.focus();
  };

  const currentSlotIndex = otpDigits.findIndex(digit => digit === '');

  useEffect(() => {
    if (otp.length === 6) {
      Keyboard.dismiss();
      onSubmit(otp);
    }
  }, [currentSlotIndex, onSubmit, otp]);

  return (
    <View>
      <TextInput
        ref={inputRef}
        style={styles.invisibleInput}
        value={otp}
        onChangeText={setOTP}
        keyboardType="number-pad"
        maxLength={6}
        onSubmitEditing={() => onSubmit(otp)}
      />
      <Pressable onPress={focusInvinsibleInput} style={styles.container}>
        {otpDigits.map((digit, index) => (
          <Text
            key={index}
            style={index === currentSlotIndex ? slotFocusedStyle : slotStyle}>
            {digit}
          </Text>
        ))}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  slot: {
    borderWidth: 1,
    fontWeight: 'bold',
    fontSize: sizeScale(36),
    paddingHorizontal: sizeScale(8),
    paddingVertical: sizeScale(12),
    flex: 1,
    maxWidth: sizeScale(60),
    borderRadius: sizeScale(8),
    alignItems: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    aspectRatio: 52 / 64,
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
