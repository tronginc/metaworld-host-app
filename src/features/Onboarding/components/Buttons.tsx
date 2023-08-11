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
} from 'react-native-reanimated';
import Text from '@components/UI/Text';
import Image from '@components/UI/Image';
import arrow_left from '@assets/images/icons/arrow-left.png';
import arrow_right from '@assets/images/icons/arrow-right.png';
import { sizeScale } from '@helpers/scale';

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
  onPrev,
  onNext,
  prevText = 'Previous',
  nextText = 'Next',
}) => {
  const animatedValue = useSharedValue(0);
  const textAnimatedValue = useSharedValue(1);

  useEffect(() => {
    animatedValue.value = withTiming(hasPrevPage ? 1 : 0);
  }, [animatedValue, hasPrevPage]);

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
      backgroundColor: '#161C37',
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
      <Pressable style={_prevButtonStyle} onPress={onPrev}>
        <Image
          source={arrow_left}
          height={sizeScale(16)}
          width={sizeScale(16)}
        />
        <Text
          color="white"
          fontWeight="bold"
          fontFamily="OpenSans"
          fontSize={14}>
          {prevText}
        </Text>
      </Pressable>
      <Pressable style={_nextButtonStyle} onPress={onNext}>
        <Text
          color="#C57BEA"
          fontWeight="bold"
          fontFamily="OpenSans"
          fontSize={14}>
          {nextText}
        </Text>
        <Image
          source={arrow_right}
          height={sizeScale(16)}
          width={sizeScale(16)}
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
