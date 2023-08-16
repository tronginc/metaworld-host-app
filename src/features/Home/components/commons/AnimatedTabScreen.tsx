import ScreenList from '@constants/screenList';
import { useIsFocused, useRoute } from '@react-navigation/native';
import React, { PropsWithChildren, useEffect, useLayoutEffect } from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const sharedValue = {
  prevTabIndex: 0,
};

const tabIndexes = {
  [ScreenList.HOME]: 0,
  [ScreenList.EXPLORE]: 1,
  [ScreenList.SCAN]: 2,
  [ScreenList.TICKETS]: 3,
  [ScreenList.ACCOUNT]: 4,
} as const;

const AnimatedTabScreen: React.FC<PropsWithChildren> = ({ children }) => {
  const animatedValue = useSharedValue(0);
  const { name } = useRoute();

  const thisTabIndex = tabIndexes[name as keyof typeof tabIndexes];

  const isFocused = useIsFocused();

  useLayoutEffect(() => {
    if (isFocused) {
      sharedValue.prevTabIndex = thisTabIndex;
    }
  }, [isFocused, thisTabIndex]);

  useEffect(() => {
    const value = sharedValue.prevTabIndex < thisTabIndex ? -1 : 1;
    animatedValue.value = withTiming(isFocused ? 0 : value, {
      duration: 150,
    });
  }, [animatedValue, isFocused, thisTabIndex]);

  const animatedStyle = useAnimatedStyle(() => {
    // Translate Y from 0 to 10
    return {
      flex: 1,
      opacity: interpolate(animatedValue.value, [-1, 0, 1], [0, 1, 0]),
      transform: [
        {
          translateX: interpolate(
            animatedValue.value,
            [-1, -0.5, 0, 0.5, 1],
            [20, 0, 0, 0, -20],
          ),
        },
      ],
    };
  }, []);

  return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

export default AnimatedTabScreen;
