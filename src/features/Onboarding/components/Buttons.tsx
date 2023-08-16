import React, { useEffect, useMemo } from 'react';
import {
  Dimensions,
  Pressable as RNPressable,
  StyleSheet,
  // Text,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';
import Text from '@components/UI/Text';
import Image from '@components/UI/Image';
import arrow_left from '@assets/images/icons/arrow-left.png';
import arrow_right from '@assets/images/icons/arrow-right.png';
import { sizeScale } from '@helpers/scale';
import { useTheme } from '@react-navigation/native';

const Pressable = Animated.createAnimatedComponent(RNPressable);

const screenWidth = Dimensions.get('window').width;

type Props = {
  hasPrevPage: boolean;
  hasNextPage: boolean;
  onPrev: () => void;
  onNext: () => void;

  prevText?: string;
  nextText?: string;
};

const BUTTON_WIDTH = (screenWidth - 16 * 2) / 2;

const Buttons: React.FC<Props> = ({
  hasPrevPage,
  hasNextPage,
  onPrev,
  onNext,
  prevText = 'Previous',
  nextText = 'Next',
}) => {
  const animatedValue = useSharedValue(0);
  const textAnimatedValue = useSharedValue(1);
  const hasNextPageAnimatedValue = useSharedValue(hasNextPage ? 1 : 0);

  const { colors } = useTheme();

  const shouldHidePrevButton = useMemo(() => {
    // Hide prev button on first page
    // Hide prev button on last page
    // Show prev button on other pages
    return !hasPrevPage || !hasNextPage;
  }, [hasPrevPage, hasNextPage]);

  useEffect(() => {
    if (shouldHidePrevButton) {
      animatedValue.value = withTiming(0);
    } else {
      animatedValue.value = withTiming(1);
    }
  }, [animatedValue, shouldHidePrevButton]);

  useEffect(() => {
    hasNextPageAnimatedValue.value = withTiming(hasNextPage ? 1 : 0);
  }, [hasNextPage, hasNextPageAnimatedValue]);

  useEffect(() => {
    textAnimatedValue.value = withTiming(0);
    const timeout = setTimeout(() => {
      textAnimatedValue.value = withTiming(1, {
        duration: 300,
      });
    }, 300);
    return () => {
      clearTimeout(timeout);
    };
  }, [textAnimatedValue, hasPrevPage]);

  const prevButtonStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(animatedValue.value, [0, 0.5, 1], [0, 0, 1]),
      width: interpolate(animatedValue.value, [0, 1], [0, BUTTON_WIDTH]),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 12,
      height: 48,
      backgroundColor: 'transparent',
    }),
    [animatedValue],
  );

  const nextButtonStyle = useAnimatedStyle(
    () => ({
      width: interpolate(
        animatedValue.value,
        [0, 1],
        [BUTTON_WIDTH * 2, BUTTON_WIDTH],
      ),
      backgroundColor: interpolateColor(
        hasNextPageAnimatedValue.value,
        [0, 1],
        [colors.primary, colors.background],
      ),
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      height: 48,
    }),
    [animatedValue],
  );

  const _prevButtonStyle = useMemo(() => {
    return [styles.button, prevButtonStyle];
  }, [prevButtonStyle]);

  const _nextButtonStyle = useMemo(() => {
    return [styles.button, nextButtonStyle];
  }, [nextButtonStyle]);

  return (
    <View style={styles.container}>
      <Pressable
        style={_prevButtonStyle}
        onPress={onPrev}
        accessibilityRole="button">
        <Image
          tintColor={colors.text}
          source={arrow_left}
          height={16}
          width={16}
        />
        <Text
          color={colors.text}
          fontWeight="bold"
          fontFamily="OpenSans"
          fontSize={14}>
          {prevText}
        </Text>
      </Pressable>
      <Pressable
        style={_nextButtonStyle}
        onPress={onNext}
        accessibilityRole="button">
        <Text
          color={hasNextPage ? colors.primary : 'white'}
          fontWeight="bold"
          fontFamily="OpenSans"
          fontSize={14}>
          {nextText}
        </Text>
        <Image
          source={arrow_right}
          tintColor={hasNextPage ? colors.primary : 'white'}
          height={16}
          width={16}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 16,
  },
  button: {
    flexDirection: 'row',
    gap: sizeScale(8),
  },
});

export default Buttons;
