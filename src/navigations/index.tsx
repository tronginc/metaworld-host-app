import React from 'react';
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

const RootStack = createNativeStackNavigator();

const defaultOptions = {
  headerShown: false,
};

const switchOptions: NativeStackNavigationOptions = {
  animation: 'flip',
  headerShown: false,
};

const AppNavigator = () => {
  const { isFirstRun, credentials, hydrated } = useUserStore();
  const isLoggedIn = !!credentials;

  if (!hydrated) {
    return null;
  }

  return (
    <NavigationContainer theme={defaultTheme}>
      <RootStack.Navigator>
        {isFirstRun ? (
          <RootStack.Screen
            name={ScreenList.ONBOARDING}
            component={OnboardingScreen}
            options={switchOptions}
          />
        ) : isLoggedIn ? (
          <RootStack.Screen
            name={ScreenList.MAIN_TABS}
            component={TabsNavigator}
            options={switchOptions}
          />
        ) : (
          <>
            <RootStack.Screen
              name={ScreenList.AUTH_LOGIN}
              component={LoginScreen}
              options={switchOptions}
            />
            <RootStack.Screen
              name={ScreenList.AUTH_SIGNUP}
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
