import Screen from '@components/UI/Screen';
import React from 'react';
import AnimatedTabScreen from '../components/commons/AnimatedTabScreen';
type Props = {};

const ScanScreen: React.FC<Props> = ({}) => {
  return (
    <AnimatedTabScreen>
      <Screen />
    </AnimatedTabScreen>
  );
};

export default ScanScreen;
