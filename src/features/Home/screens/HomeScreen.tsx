import Screen from '@components/UI/Screen';
import React from 'react';
import Header from '../components/commons/Header';
import { sizeScale } from '@helpers/scale';

type Props = {};

const HomeScreen: React.FC<Props> = ({}) => {
  return (
    <Screen
      safeAreaEdge="all"
      paddingHorizontal={sizeScale(17)}
      paddingVertical={sizeScale(8)}>
      <Header title="MetaWorld" />
    </Screen>
  );
};

export default HomeScreen;
