import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../features/Onboarding/screens/OnboardingScreen';
import ScreenList from '../constants/screenList';

type Props = {};

const AuthStack = createNativeStackNavigator();

const AuthNavigator: React.FC<Props> = ({}) => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name={ScreenList.ONBOARDING}
        component={OnboardingScreen}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
