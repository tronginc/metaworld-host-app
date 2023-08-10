import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from '../features/Onboarding/screens/OnboardingScreen';
import ScreenList from '../constants/screenList';

type Props = {};

const MainStack = createNativeStackNavigator();

const defaultOptions = {
  headerShown: false,
};

const MainNavigator: React.FC<Props> = ({}) => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        name={ScreenList.ONBOARDING}
        component={OnboardingScreen}
        options={defaultOptions}
      />
    </MainStack.Navigator>
  );
};

export default MainNavigator;
