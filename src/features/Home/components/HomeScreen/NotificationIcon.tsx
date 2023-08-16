import React from 'react';
import Image from '@components/UI/Image';

import bell from '@assets/images/icons/bell.png';
import Box from '@components/UI/Box';
import { sizeScale } from '@helpers/scale';
import { useTheme } from '@react-navigation/native';

type Props = {};

const NotificationIcon: React.FC<Props> = ({}) => {
  const { colors } = useTheme();
  return (
    <Box
      height={sizeScale(32)}
      width={sizeScale(32)}
      borderRadius={sizeScale(16)}
      backgroundColor={colors.card}
      justifyContent="center"
      alignItems="center">
      <Image height={19} width={19} source={bell} />
    </Box>
  );
};

export default NotificationIcon;
