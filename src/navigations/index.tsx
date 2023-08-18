import React, { useEffect, useState } from 'react';
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
import SetNewPasswordScreen from '@features/Auth/screens/SetNewPasswordScreen';
import SignUpScreen from '@features/Auth/screens/SignUpScreen';
import OnboardingScreen from '@features/Onboarding/screens/OnboardingScreen';
import TabsNavigator from './TabsNavigator';
import axios from 'axios';
import useUserInformationQuery from '@hooks/user/useUserInformationQuery';
import BootSplash from 'react-native-bootsplash';
import { InteractionManager } from 'react-native';

const RootStack = createNativeStackNavigator();

const defaultOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

const AppNavigator = () => {
  const { isFirstRun, credentials, hydrated, setUser, user } = useUserStore();
  const [isReady, setIsReady] = useState(false);

  const { data: userInfo } = useUserInformationQuery();

  const isLoggedIn = !!credentials;
  const hasUserInfoInStore = !!user;

  useEffect(() => {
    if (userInfo) {
      // Save user information to store
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

  useEffect(() => {
    // Wait for data from async storage to be hydrated
    if (hydrated) {
      // User has not logged in, so we need to show login screen
      // Ready to show login screen
      if (!isLoggedIn) {
        setIsReady(true);
      } else if (hasUserInfoInStore) {
        /* User has logged in, so we need to fetch user information
            Wait for user information to be fetched
            If fetch user information failed,
              credentials is invalid, so we already check in axios interceptor
              user's credentials will be deleted in axios interceptor, so isLoggedIn = false, so we will show login screen
         */
        setIsReady(true);
      }
    }
  }, [hydrated, hasUserInfoInStore, isLoggedIn]);

  useEffect(() => {
    // Ready to show screen, to prevent flickering, we need to run this after interaction
    if (isReady) {
      InteractionManager.runAfterInteractions(() => {
        BootSplash.hide({
          fade: true,
        });
      });
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <NavigationContainer theme={defaultTheme}>
      <RootStack.Navigator
        screenOptions={defaultOptions}
        initialRouteName={ScreenList.AUTH_SET_NEW_PASSWORD}>
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
              name={ScreenList.AUTH_SET_NEW_PASSWORD}
              component={SetNewPasswordScreen}
              options={defaultOptions}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
