import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../features/Onboarding/screens/OnboardingScreen';
import ScreenList from '../constants/screenList';

type Props = {};

const OnboardingStack = createNativeStackNavigator();

const defaultOptions = {
  headerShown: false,
};

const OnboardingNavigator: React.FC<Props> = ({}) => {
  return (
    <OnboardingStack.Navigator>
      <OnboardingStack.Screen
        name={ScreenList.ONBOARDING}
        component={OnboardingScreen}
        options={defaultOptions}
      />
    </OnboardingStack.Navigator>
  );
};

export default OnboardingNavigator;
