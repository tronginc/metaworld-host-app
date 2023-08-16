import Screen from '@components/UI/Screen';
import React from 'react';
import Header from '../components/commons/Header';
import { sizeScale } from '@helpers/scale';

type Props = {};

const TicketsScreen: React.FC<Props> = ({}) => {
  return (
    <Screen
      marginBottom={-sizeScale(20)}
      enableScroll
      paddingHorizontal={sizeScale(17)}
      paddingVertical={sizeScale(8)}>
      <Header title="Tickets" />
    </Screen>
  );
};

export default TicketsScreen;
