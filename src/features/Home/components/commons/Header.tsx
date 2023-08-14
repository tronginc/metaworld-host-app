import Box from '@components/UI/Box';
import GradientText from '@components/UI/GradientText';
import React from 'react';

type Props = {
  title: string;
};

const Header: React.FC<Props> = ({ title }) => {
  return (
    <Box flexDirection="row" justifyContent="space-between">
      <GradientText fontSize={24} fontWeight="bold">
        {title}
      </GradientText>
    </Box>
  );
};

export default Header;
