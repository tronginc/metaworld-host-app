import Screen from '@components/UI/Screen';
import React from 'react';
import Header from '../components/commons/Header';
import { sizeScale } from '@helpers/scale';
import AnimatedTabScreen from '../components/commons/AnimatedTabScreen';

type Props = {};

const TicketsScreen: React.FC<Props> = ({}) => {
  return (
    <AnimatedTabScreen>
      <Screen
        marginBottom={-sizeScale(20)}
        enableScroll
        paddingHorizontal={sizeScale(17)}
        paddingVertical={sizeScale(8)}>
        <Header title="Tickets" />
      </Screen>
    </AnimatedTabScreen>
  );
};

export default TicketsScreen;
