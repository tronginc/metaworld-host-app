import Box from '@components/UI/Box';
import Text from '@components/UI/Text';
import React from 'react';

type Props = {
  title: string;
};

const Header: React.FC<Props> = ({ title }) => {
  return (
    <Box flexDirection="row" justifyContent="space-between">
      <Text fontSize={24} fontWeight="bold" color="#D42B53">
        {title}
      </Text>
    </Box>
  );
};

export default Header;
