import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScreenList from '@constants/screenList';
import HomeScreen from '@features/Home/screens/HomeScreen';
import AccountScreen from '@features/Home/screens/AccountScreen';

const MainTabs = createBottomTabNavigator();

type Props = {};

const defaultOptions = {
  headerShown: false,
};

const TabsNavigator: React.FC<Props> = ({}) => {
  return (
    <MainTabs.Navigator>
      <MainTabs.Screen
        name={ScreenList.HOME_SCREEN}
        component={HomeScreen}
        options={defaultOptions}
      />
      <MainTabs.Screen
        name={ScreenList.ACCOUNT_SCREEN}
        component={AccountScreen}
        options={defaultOptions}
      />
    </MainTabs.Navigator>
  );
};

export default TabsNavigator;
