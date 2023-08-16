import Screen from '@components/UI/Screen';
import React from 'react';
import Header from '../components/commons/Header';
import { sizeScale } from '@helpers/scale';

type Props = {};

const ExploreScreen: React.FC<Props> = ({}) => {
  return (
    <Screen
      enableScroll
      marginBottom={-sizeScale(20)}
      paddingHorizontal={sizeScale(17)}
      paddingVertical={sizeScale(8)}>
      <Header title="Explore" />
    </Screen>
  );
};

export default ExploreScreen;
