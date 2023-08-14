import React, { useCallback } from 'react';
import { ImageBackground, Pressable, StyleSheet } from 'react-native';
import tabbar_frame from '@assets/images/icons/tabbar-frame.png';
import { sizeScale } from '@helpers/scale';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { LabelPosition } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import Box from './Box';
import GradientText from './GradientText';

const TAB_BAR_HEIGHT = 66;

const Tabbar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <Box position="relative">
      <Box
        position="absolute"
        left={0}
        right={0}
        bottom={0}
        zIndex={1}
        top={sizeScale(TAB_BAR_HEIGHT - 1)}
        // backgroundColor="#04040F"
      />
      <ImageBackground style={styles.tabbarContainer} source={tabbar_frame}>
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
      </ImageBackground>
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

  const content =
    typeof label === 'string' ? (
      <GradientText colors={isFocused ? undefined : ['#49566E', '#49566E']}>
        {label}
      </GradientText>
    ) : (
      label({
        focused: isFocused,
        color: isFocused ? '#673ab7' : '#222',
        position: 'below-icon',
        children: '',
      })
    );

  const icon = tabBarIcon
    ? typeof tabBarIcon === 'function'
      ? tabBarIcon({
          focused: isFocused,
          color: isFocused ? '#673ab7' : '#222',
          size: sizeScale(24),
        })
      : tabBarIcon
    : null;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabbarItem}>
      {icon}
      {content}
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
    gap: sizeScale(4),
  },
});

export default Tabbar;
