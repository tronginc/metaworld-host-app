import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenList from '@constants/screenList';
import HomeScreen from '@features/Home/screens/HomeScreen';
import AccountScreen from '@features/Home/screens/AccountScreen';
import Tabbar from '@components/UI/Tabbar';
import i18n from '../i18n/i18n';
import scan_icon from '@assets/images/icons/scan.png';
import Box from '@components/UI/Box';
import Image from '@components/UI/Image';
import { sizeScale } from '@helpers/scale';

const MainTabs = createBottomTabNavigator();

type Props = {};

const homeOptions = {
  headerShown: false,
  tabBarLabel: i18n.t('home:bottom_tabs.home'),
};

const exploreOptions = {
  headerShown: false,
  tabBarLabel: i18n.t('home:bottom_tabs.explore'),
};

const scanOptions = {
  headerShown: false,
  tabBarLabel: () => (
    <Box position="absolute" top="-100%">
      <Image source={scan_icon} height={sizeScale(56)} width={sizeScale(56)} />
    </Box>
  ),
};

const ticketsOptions = {
  headerShown: false,
  tabBarLabel: i18n.t('home:bottom_tabs.tickets'),
};

const accountOptions = {
  headerShown: false,
  tabBarLabel: i18n.t('home:bottom_tabs.account'),
};

const TabsNavigator: React.FC<Props> = ({}) => {
  return (
    <MainTabs.Navigator tabBar={Tabbar}>
      <MainTabs.Screen
        name={ScreenList.HOME}
        component={HomeScreen}
        options={homeOptions}
      />
      <MainTabs.Screen
        name={ScreenList.EXPLORE}
        component={AccountScreen}
        options={exploreOptions}
      />
      <MainTabs.Screen
        name={ScreenList.SCAN}
        component={HomeScreen}
        options={scanOptions}
      />
      <MainTabs.Screen
        name={ScreenList.TICKETS}
        component={AccountScreen}
        options={ticketsOptions}
      />
      <MainTabs.Screen
        name={ScreenList.ACCOUNT}
        component={AccountScreen}
        options={accountOptions}
      />
    </MainTabs.Navigator>
  );
};

export default TabsNavigator;
