import Text from '@components/UI/Text';
import { sizeScale } from '@helpers/scale';
import { useTheme } from '@react-navigation/native';
import React, { PropsWithChildren, useEffect, useMemo } from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  StyleSheet,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  isLoading?: boolean;
} & PressableProps;

const FormButton: React.FC<PropsWithChildren<Props>> = ({
  style: overrideStyle,
  children,
  isLoading,
  disabled,
  ...props
}) => {
  const { colors } = useTheme();
  const animatedPressValue = useSharedValue(0);
  const animatedDisabledValue = useSharedValue(0);

  const shoudDisabledButton = disabled || isLoading;

  const onPressIn = () => {
    animatedPressValue.value = withSpring(1, {
      duration: 300,
    });
  };

  const onPressOut = () => {
    animatedPressValue.value = withSpring(0, {
      duration: 300,
    });
  };

  useEffect(() => {
    animatedDisabledValue.value = withSpring(shoudDisabledButton ? 1 : 0, {
      duration: 300,
    });
  }, [animatedDisabledValue, shoudDisabledButton]);

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          scale: interpolate(animatedPressValue.value, [0, 1], [1, 0.975]),
        },
      ],
      opacity: interpolate(animatedDisabledValue.value, [0, 1], [1, 0.7]),
    }),
    [],
  );

  const style = useMemo(() => {
    return [
      {
        backgroundColor: colors.primary,
      },
      animatedStyle,
      styles.button,
      overrideStyle,
    ];
  }, [colors.primary, overrideStyle, animatedStyle]);

  return (
    <AnimatedPressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={style}
      disabled={shoudDisabledButton}
      {...props}>
      {isLoading ? <ActivityIndicator color="white" /> : null}
      <Text fontSize={16} fontWeight="bold" color="white">
        {children}
      </Text>
    </AnimatedPressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: sizeScale(48),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizeScale(8),
    flexDirection: 'row',
    gap: sizeScale(8),
  },
});

export default FormButton;
