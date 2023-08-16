import Avatar from '@components/UI/Avatar';
import Box from '@components/UI/Box';
import Text from '@components/UI/Text';
import { sizeScale } from '@helpers/scale';
import { useTheme } from '@react-navigation/native';
import useUserStore from '@stores/user.store';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

type Props = {};

const SectionProfile: React.FC<Props> = ({}) => {
  const user = useUserStore().user!;

  const [t] = useTranslation('home');
  const { colors } = useTheme();

  const name = useMemo(() => {
    if (user.nickName) {
      return user.nickName;
    }
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }

    if (user.firstName) {
      return user.firstName;
    }

    if (user.lastName) {
      return user.lastName;
    }

    if (user.email) {
      return user.email;
    }

    if (user.phone) {
      return user.phone;
    }

    return 'Metaway User';
  }, [user]);

  return (
    <Box flexDirection="row" gap={sizeScale(8)}>
      <Avatar uri={user.avatar} name={name} size={48} />
      <Box justifyContent="space-around">
        <Text color={colors.text} fontSize={18} fontWeight="bold">
          {name}
        </Text>
        <Text color="#8D9BB9" fontSize={14}>
          {t('account_screen.see_your_profile')}
        </Text>
      </Box>
    </Box>
  );
};

export default SectionProfile;
