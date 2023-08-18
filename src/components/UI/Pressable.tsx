import React, { PropsWithChildren, useMemo } from 'react';
import { StyleSheet, ViewStyle, Pressable as RNPressable } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

type Props = ViewStyle & {
  onPress?: () => void;
  scaleTo?: number;
};

const AnimatedPressable = Animated.createAnimatedComponent(RNPressable);

const Pressable: React.FC<PropsWithChildren<Props>> = ({
  children,
  onPress,
  scaleTo = 1.05,
  ...styleProps
}) => {
  const animatedValue = useSharedValue(0);

  const handlePressIn = () => {
    animatedValue.value = withSpring(1);
  };

  const handlePressOut = () => {
    animatedValue.value = withSpring(0);
  };

  const style = useMemo(() => {
    return StyleSheet.flatten(styleProps);
  }, [styleProps]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: interpolate(animatedValue.value, [0, 1], [1, scaleTo]) },
      ],
    };
  }, []);

  const pressableStyle = useMemo(() => {
    return [style, animatedStyle];
  }, [style, animatedStyle]);

  return (
    <AnimatedPressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={pressableStyle}>
      {children}
    </AnimatedPressable>
  );
};

export default Pressable;
