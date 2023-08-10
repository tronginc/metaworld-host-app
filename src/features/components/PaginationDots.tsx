import React, { useEffect, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import Animated, {
  useSharedValue,
  interpolateColor,
  useAnimatedStyle,
  interpolate,
  withTiming,
} from 'react-native-reanimated';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  paginationColor: string;
  paginationSelectedColor: string;
};

const PaginationDots: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  paginationColor,
  paginationSelectedColor,
}) => {
  console.log('PaginationComponent.tsx: currentPage: ', currentPage);
  console.log('PaginationComponent.tsx: totalPages: ', totalPages);

  const dots = useMemo(() => {
    return Array.from({ length: totalPages });
  }, [totalPages]);

  return (
    <View style={styles.container}>
      {dots.map((_, index) => {
        return (
          <Item
            key={index}
            isCurrentPage={currentPage === index}
            paginationColor={paginationColor}
            paginationSelectedColor={paginationSelectedColor}
          />
        );
      })}
    </View>
  );
};

type ItemProps = {
  isCurrentPage: boolean;
} & Pick<PaginationProps, 'paginationColor' | 'paginationSelectedColor'>;

const DOT_HEIGHT = 4;
const DOT_WIDTH = 12;
const ACTIVE_DOT_WIDTH = 32;

const Item: React.FC<ItemProps> = ({
  isCurrentPage,
  paginationColor,
  paginationSelectedColor,
}) => {
  const animatedValue = useSharedValue(isCurrentPage ? 1 : 0);

  useEffect(() => {
    'worklet';
    animatedValue.value = withTiming(isCurrentPage ? 1 : 0, {
      duration: 300,
    });
  }, [animatedValue, isCurrentPage]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      backgroundColor:
        paginationColor && paginationSelectedColor
          ? interpolateColor(
              animatedValue.value,
              [0, 1],
              [paginationColor, paginationSelectedColor],
            )
          : undefined,
      width: interpolate(
        animatedValue.value,
        [0, 1],
        [DOT_WIDTH, ACTIVE_DOT_WIDTH],
      ),
      height: DOT_HEIGHT,
      borderRadius: DOT_HEIGHT / 2,
    };
  }, [paginationColor, paginationSelectedColor]);

  return <Animated.View style={animatedStyle} />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    justifyContent: 'center',
  },
});

export default PaginationDots;
