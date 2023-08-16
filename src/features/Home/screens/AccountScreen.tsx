import React from 'react';
import Screen from '@components/UI/Screen';
import { sizeScale } from '@helpers/scale';
import Header from '../components/commons/Header';

type Props = {};

const AccountScreen: React.FC<Props> = ({}) => {
  return (
    <Screen
      marginBottom={-sizeScale(20)}
      enableScroll
      paddingHorizontal={sizeScale(17)}
      paddingVertical={sizeScale(8)}>
      <Header title="Account" />
    </Screen>
  );
};

export default AccountScreen;
