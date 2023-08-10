import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import OnboardingNavigator from '@navigations/OnboardingNavigator';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';

const AppNavigator = () => {
  const isFirstLaunch = true;
  const isLoggedIn = false;
  return (
    <NavigationContainer>
      {isFirstLaunch ? (
        <OnboardingNavigator />
      ) : isLoggedIn ? (
        <MainNavigator />
      ) : (
        <AuthNavigator />
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
