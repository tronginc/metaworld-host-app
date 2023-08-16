import React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import ScreenList from '@constants/screenList';

import Tabbar from '@components/UI/Tabbar';
import i18n from '../i18n/i18n';
import Box from '@components/UI/Box';
import Image from '@components/UI/Image';
import { sizeScale } from '@helpers/scale';

import HomeScreen from '@features/Home/screens/HomeScreen';
import AccountScreen from '@features/Home/screens/AccountScreen';
import ExploreScreen from '@features/Home/screens/ExploreScreen';
import TicketsScreen from '@features/Home/screens/TicketsScreen';

import scan_icon from '@assets/images/icons/scan.png';

import tab_home_fill from '@assets/images/icons/tab_home_fill.png';
import tab_explore_fill from '@assets/images/icons/tab_explore_fill.png';
import tab_ticket_fill from '@assets/images/icons/tab_ticket_fill.png';
import tab_account_fill from '@assets/images/icons/tab_account_fill.png';

import tab_home_outlined from '@assets/images/icons/tab_home_outlined.png';
import tab_explore_outlined from '@assets/images/icons/tab_explore_outlined.png';
import tab_ticket_outlined from '@assets/images/icons/tab_ticket_outlined.png';
import tab_account_outlined from '@assets/images/icons/tab_account_outlined.png';

import ScanScreen from '@features/Home/screens/ScanScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import FastImage from 'react-native-fast-image';

const MainTabs = createBottomTabNavigator();

type Props = {};

const DEFAULT_ICON_SIZE = sizeScale(24);
const SCAN_ICON_SIZE = sizeScale(44);

const homeOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarLabel: i18n.t('home:bottom_tabs.home'),
  tabBarIcon: ({ focused, color }) => (
    <Image
      source={focused ? tab_home_fill : tab_home_outlined}
      height={DEFAULT_ICON_SIZE}
      width={DEFAULT_ICON_SIZE}
      tintColor={color}
      ImageComponent={FastImage}
    />
  ),
};

const exploreOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarLabel: i18n.t('home:bottom_tabs.explore'),
  tabBarIcon: ({ focused, color }) => (
    <Image
      source={focused ? tab_explore_fill : tab_explore_outlined}
      height={DEFAULT_ICON_SIZE}
      width={DEFAULT_ICON_SIZE}
      tintColor={color}
      ImageComponent={FastImage}
    />
  ),
};

const scanOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarLabel: () => (
    <Image
      source={scan_icon}
      height={SCAN_ICON_SIZE}
      width={SCAN_ICON_SIZE}
      ImageComponent={FastImage}
    />
  ),
};

const ticketsOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarLabel: i18n.t('home:bottom_tabs.tickets'),
  tabBarIcon: ({ focused, color }) => (
    <Image
      source={focused ? tab_ticket_fill : tab_ticket_outlined}
      height={DEFAULT_ICON_SIZE}
      width={DEFAULT_ICON_SIZE}
      tintColor={color}
      ImageComponent={FastImage}
    />
  ),
};

const accountOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarLabel: i18n.t('home:bottom_tabs.account'),
  tabBarIcon: ({ focused, color }) => (
    <Image
      source={focused ? tab_account_fill : tab_account_outlined}
      height={DEFAULT_ICON_SIZE}
      width={DEFAULT_ICON_SIZE}
      tintColor={color}
      ImageComponent={FastImage}
    />
  ),
};

const TabsNavigator: React.FC<Props> = ({}) => {
  const { bottom } = useSafeAreaInsets();
  const { colors } = useTheme();
  return (
    <Box flex={1}>
      <StatusBar translucent backgroundColor="transparent" />
      <MainTabs.Navigator
        tabBar={Tabbar}
        // why this doesn't work?
        // sceneContainerStyle={{
        //   backgroundColor: 'transparent',
        // }}
        // screenOptions={{
        //   tabBarStyle: {
        //     backgroundColor: 'transparent',
        //     position: 'absolute',
        //     borderTopWidth: 0,
        //     elevation: 0,
        //   },
        // }}
      >
        <MainTabs.Screen
          name={ScreenList.HOME}
          component={HomeScreen}
          options={homeOptions}
        />
        <MainTabs.Screen
          name={ScreenList.EXPLORE}
          component={ExploreScreen}
          options={exploreOptions}
        />
        <MainTabs.Screen
          name={ScreenList.SCAN}
          component={ScanScreen}
          options={scanOptions}
        />
        <MainTabs.Screen
          name={ScreenList.TICKETS}
          component={TicketsScreen}
          options={ticketsOptions}
        />
        <MainTabs.Screen
          name={ScreenList.ACCOUNT}
          component={AccountScreen}
          options={accountOptions}
        />
      </MainTabs.Navigator>
      <Box height={bottom} backgroundColor={colors.card} />
    </Box>
  );
};

export default TabsNavigator;
