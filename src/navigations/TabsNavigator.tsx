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
import tab_account from '@assets/images/icons/tab_account.png';
import tab_explore from '@assets/images/icons/tab_explore.png';
import tab_home from '@assets/images/icons/tab_home.png';
import tab_ticket from '@assets/images/icons/tab_ticket.png';
import ScanScreen from '@features/Home/screens/ScanScreen';

const MainTabs = createBottomTabNavigator();

type Props = {};

const ICON_SIZE = sizeScale(24);

const homeOptions: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarLabel: i18n.t('home:bottom_tabs.home'),
  tabBarIcon: () => (
    <Image source={tab_home} height={ICON_SIZE} width={ICON_SIZE} />
  ),
};

const exploreOptions = {
  headerShown: false,
  tabBarLabel: i18n.t('home:bottom_tabs.explore'),
  tabBarIcon: () => (
    <Image source={tab_explore} height={ICON_SIZE} width={ICON_SIZE} />
  ),
};

const scanOptions = {
  headerShown: false,
  tabBarLabel: () => (
    <Box position="absolute" top="-50%">
      <Image source={scan_icon} height={sizeScale(56)} width={sizeScale(56)} />
    </Box>
  ),
};

const ticketsOptions = {
  headerShown: false,
  tabBarLabel: i18n.t('home:bottom_tabs.tickets'),
  tabBarIcon: () => (
    <Image source={tab_ticket} height={ICON_SIZE} width={ICON_SIZE} />
  ),
};

const accountOptions = {
  headerShown: false,
  tabBarLabel: i18n.t('home:bottom_tabs.account'),
  tabBarIcon: () => (
    <Image source={tab_account} height={ICON_SIZE} width={ICON_SIZE} />
  ),
};

const TabsNavigator: React.FC<Props> = ({}) => {
  return (
    <Box flex={1} safeAreaEdge="all">
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
    </Box>
  );
};

export default TabsNavigator;
