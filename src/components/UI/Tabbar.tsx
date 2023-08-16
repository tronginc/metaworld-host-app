import React, { useCallback } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { sizeScale } from '@helpers/scale';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { LabelPosition } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import Box from './Box';
import Text from './Text';
import { useTheme } from '@react-navigation/native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const TAB_BAR_HEIGHT = 66;

const Tabbar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const { colors } = useTheme();
  return (
    <Box position="relative">
      <Box
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        zIndex={1}
        top={sizeScale(TAB_BAR_HEIGHT + 1)}
        backgroundColor={colors.card}
      />
      <Box backgroundColor={colors.card} style={styles.tabbarContainer}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          return (
            <TabbarItem
              navigation={navigation}
              key={route.key}
              isFocused={state.index === index}
              route={route}
              label={label}
              tabBarIcon={options.tabBarIcon}
            />
          );
        })}
      </Box>
    </Box>
  );
};

type Item = {
  label:
    | string
    | ((props: {
        focused: boolean;
        color: string;
        position: LabelPosition;
        children: string;
      }) => React.ReactNode);
  tabBarIcon?:
    | ((props: {
        focused: boolean;
        color: string;
        size: number;
      }) => React.ReactNode)
    | undefined;
  route: BottomTabBarProps['state']['routes'][number];
  isFocused: boolean;
  navigation: BottomTabBarProps['navigation'];
};
const TabbarItem: React.FC<Item> = ({
  route,
  isFocused,
  navigation,
  label,
  tabBarIcon,
}) => {
  const { colors } = useTheme();
  const animated = useSharedValue(0);

  const onLongPress = useCallback(() => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  }, [navigation, route.key]);

  const onPress = useCallback(() => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      // The `merge: true` option makes sure that the params inside the tab screen are preserved
      navigation.navigate({ name: route.name, merge: true, params: undefined });
    }
  }, [isFocused, navigation, route.key, route.name]);

  const accessibilityState = isFocused ? { selected: true } : {};

  const color = isFocused ? colors.primary : '#A9B3C6';

  const onPressIn = () => {
    animated.value = withSpring(1, {
      duration: 300,
    });
  };

  const onPressOut = () => {
    animated.value = withSpring(0, {
      duration: 300,
    });
  };

  const content =
    typeof label === 'string' ? (
      <Text fontSize={11} color={color}>
        {label}
      </Text>
    ) : (
      label({
        focused: isFocused,
        color,
        position: 'below-icon',
        children: '',
      })
    );

  const icon = tabBarIcon
    ? typeof tabBarIcon === 'function'
      ? tabBarIcon({
          focused: isFocused,
          color: color,
          size: sizeScale(24),
        })
      : tabBarIcon
    : null;

  const gap = sizeScale(4);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: interpolate(animated.value, [0, 1], [1, 1.2]) }],
      gap,
      alignItems: 'center',
    };
  }, []);

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}>
      <Animated.View style={animatedStyle}>
        {icon}
        {content}
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tabbarContainer: {
    height: sizeScale(TAB_BAR_HEIGHT),
    flexDirection: 'row',
    position: 'relative',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default (props: BottomTabBarProps) => <Tabbar {...props} />;
