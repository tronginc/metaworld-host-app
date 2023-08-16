import Box from '@components/UI/Box';
import { FlatGrid, FlatGridProps } from '@components/UI/Grid';
import Image from '@components/UI/Image';
import Text from '@components/UI/Text';
import useLogoutMutation from '@features/Auth/hooks/useLogoutMutation';
import { keyExtractor } from '@helpers/keyExtractor';
import { sizeScale } from '@helpers/scale';
import { useTheme } from '@react-navigation/native';
import useUserStore from '@stores/user.store';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet } from 'react-native';

type MenuItem = {
  id: string;
  name: string;
  icon: any;
  onPress?: () => void;
};

const SectionMenus = () => {
  const [t] = useTranslation('home');
  const { setFirstRun } = useUserStore();
  const { mutate: logout } = useLogoutMutation();

  // const logout

  // security, network, language, assets, support, about_us, referral
  const menus = useMemo(() => {
    return [
      {
        id: 'security',
        name: t('account_screen.menus.security'),
        icon: require('@assets/images/icons/menu_security.png'),
      },
      {
        id: 'network',
        name: t('account_screen.menus.network'),
        icon: require('@assets/images/icons/menu_network.png'),
      },
      {
        id: 'language',
        name: t('account_screen.menus.language'),
        icon: require('@assets/images/icons/menu_language.png'),
      },
      {
        id: 'assets',
        name: t('account_screen.menus.assets'),
        icon: require('@assets/images/icons/menu_assets.png'),
      },
      {
        id: 'support',
        name: t('account_screen.menus.support'),
        icon: require('@assets/images/icons/menu_support.png'),
      },
      {
        id: 'about_us',
        name: t('account_screen.menus.about_us'),
        icon: require('@assets/images/icons/menu_about_us.png'),
      },
      {
        id: 'referral',
        name: t('account_screen.menus.referral'),
        icon: require('@assets/images/icons/menu_referral.png'),
      },
      {
        id: 'logout',
        name: t('account_screen.menus.logout'),
        icon: require('@assets/images/icons/menu_assets.png'),
        onPress: () => logout(),
      },
      {
        id: 'reset',
        name: 'Reset Onboarding',
        icon: require('@assets/images/icons/menu_assets.png'),
        onPress: () => setFirstRun(true),
      },
    ];
  }, [logout, t, setFirstRun]);

  return (
    <FlatGrid
      style={styles.grid}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      data={menus}
      spacing={sizeScale(12)}
      scrollEnabled={false}
      itemDimension={sizeScale(130)}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};

const renderItem: FlatGridProps<MenuItem>['renderItem'] = ({ item }) => {
  return <MenuItem item={item} />;
};

type MenuItemProps = {
  item: MenuItem;
};

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { colors } = useTheme();
  return (
    <Pressable onPress={item.onPress}>
      <Box
        flex={1}
        backgroundColor={colors.card}
        paddingHorizontal={sizeScale(16)}
        paddingVertical={sizeScale(12)}
        borderRadius={sizeScale(12)}
        gap={sizeScale(4)}>
        <Image
          source={item.icon}
          height={sizeScale(24)}
          width={sizeScale(24)}
        />
        <Text fontSize={sizeScale(16)} fontWeight="500" color={colors.text}>
          {item.name}
        </Text>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  grid: {
    width: '100%',
  },
});

export default SectionMenus;
