import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  NativeStackNavigationOptions,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import defaultTheme from '../themes/defaultTheme';
import useUserStore from '@stores/user.store';
import ScreenList from '@constants/screenList';
import ConfirmCodeScreen from '@features/Auth/screens/ConfirmCodeScreen';
import ForgotPasswordScreen from '@features/Auth/screens/ForgotPasswordScreen';
import LoginScreen from '@features/Auth/screens/LoginScreen';
import SetPasswordScreen from '@features/Auth/screens/SetPasswordScreen';
import SignUpScreen from '@features/Auth/screens/SignUpScreen';
import OnboardingScreen from '@features/Onboarding/screens/OnboardingScreen';
import TabsNavigator from './TabsNavigator';
import axios from 'axios';
import useUserInformationQuery from '@hooks/user/useUserInformationQuery';

const RootStack = createNativeStackNavigator();

const defaultOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

const AppNavigator = () => {
  const { isFirstRun, credentials, hydrated, setUser, user } = useUserStore();

  const { data: userInfo, isLoading } = useUserInformationQuery();

  const isLoggedIn = !!credentials;

  useEffect(() => {
    if (userInfo) {
      setUser(userInfo);
    }
  }, [userInfo, setUser]);

  useEffect(() => {
    if (credentials) {
      axios.defaults.headers.common.Authorization = `Bearer ${credentials.accessToken}`;
    } else {
      axios.defaults.headers.common.Authorization = null;
    }
  }, [credentials]);

  if (!hydrated) {
    return null;
  }

  if (!isLoggedIn && !user && !isLoading) {
    return null;
  }

  return (
    <NavigationContainer theme={defaultTheme}>
      <RootStack.Navigator screenOptions={defaultOptions}>
        {isFirstRun ? (
          <RootStack.Screen
            name={ScreenList.ONBOARDING}
            component={OnboardingScreen}
            options={defaultOptions}
          />
        ) : isLoggedIn ? (
          <RootStack.Screen
            name={ScreenList.MAIN_TABS}
            component={TabsNavigator}
            options={defaultOptions}
          />
        ) : (
          <>
            <RootStack.Screen
              name={ScreenList.AUTH_LOGIN}
              component={LoginScreen}
              options={defaultOptions}
            />
            <RootStack.Screen
              name={ScreenList.AUTH_SIGN_UP}
              component={SignUpScreen}
              options={defaultOptions}
            />
            <RootStack.Screen
              name={ScreenList.AUTH_CONFIRM_CODE}
              component={ConfirmCodeScreen}
              options={defaultOptions}
            />
            <RootStack.Screen
              name={ScreenList.AUTH_FORGOT_PASSWORD}
              component={ForgotPasswordScreen}
              options={defaultOptions}
            />
            <RootStack.Screen
              name={ScreenList.AUTH_SET_PASSWORD}
              component={SetPasswordScreen}
              options={defaultOptions}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
