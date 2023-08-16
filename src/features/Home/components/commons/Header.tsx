import React, { PropsWithChildren } from 'react';
import Box from '@components/UI/Box';
import Text from '@components/UI/Text';
import { useTheme } from '@react-navigation/native';
import { sizeScale } from '@helpers/scale';
import Image from '@components/UI/Image';

import logo from '@assets/images/icons/logo.png';

type Props = {
  title: string;
  tintColor?: string;
  showLogo?: boolean;
};

const Header: React.FC<PropsWithChildren<Props>> = ({
  title,
  children,
  tintColor,
  showLogo,
}) => {
  const { colors } = useTheme();
  return (
    <Box flexDirection="row" justifyContent="space-between" alignItems="center">
      <Box gap={sizeScale(6)} flexDirection="row" alignItems="center">
        {showLogo ? <Image source={logo} height={28} width={28} /> : null}
        <Text
          color={tintColor || colors.primary}
          fontSize={24}
          fontWeight="bold">
          {title}
        </Text>
      </Box>
      {children}
    </Box>
  );
};

export default Header;
