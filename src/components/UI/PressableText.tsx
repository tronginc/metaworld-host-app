import React, { PropsWithChildren, useMemo } from 'react';
import { Pressable, StyleSheet, TextStyle } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type Props = {
  onPress?: () => void;
  style?: TextStyle;
} & TextStyle;

const PressableText: React.FC<PropsWithChildren<Props>> = ({
  children,
  onPress,
  style: overrideStyle,
  ...textStyles
}) => {
  const animatedPressValue = useSharedValue(0);

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

  const animatedStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          scale: interpolate(animatedPressValue.value, [0, 1], [1, 1.05]),
        },
      ],
      opacity: interpolate(animatedPressValue.value, [0, 1], [1, 0.85]),
    }),
    [],
  );

  const style = useMemo(() => {
    return StyleSheet.flatten([textStyles, overrideStyle]);
  }, [textStyles, overrideStyle]);

  const textStyle = useMemo(
    () => [style, animatedStyle],
    [style, animatedStyle],
  );

  return (
    <Pressable onPressIn={onPressIn} onPressOut={onPressOut} onPress={onPress}>
      <Animated.Text style={textStyle}>{children}</Animated.Text>
    </Pressable>
  );
};

export default PressableText;
