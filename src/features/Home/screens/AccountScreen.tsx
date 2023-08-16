import React from 'react';
import Screen from '@components/UI/Screen';
import Header from '../components/commons/Header';
import { useTheme } from '@react-navigation/native';
import Box from '@components/UI/Box';
import { sizeScale } from '@helpers/scale';
import useStatusbarOnFocus from '@hooks/common/useStatusbarOnFocus';
import { useTranslation } from 'react-i18next';
import SectionProfile from '../components/AccountScreen/SectionProfile';
import SectionMenus from '../components/AccountScreen/SectionMenus';
import AnimatedTabScreen from '../components/commons/AnimatedTabScreen';

type Props = {};

const AccountScreen: React.FC<Props> = ({}) => {
  const { colors } = useTheme();
  useStatusbarOnFocus('dark-content');

  const [t] = useTranslation('home');

  return (
    <AnimatedTabScreen>
      <Screen
        enableScroll
        backgroundColor={colors.background}
        safeAreaEdge="top">
        <Box
          paddingTop={sizeScale(36)}
          paddingBottom={sizeScale(22)}
          paddingHorizontal={sizeScale(16)}>
          <Header title={t('account_screen.account')} tintColor={colors.text} />
        </Box>
        <Box paddingHorizontal={sizeScale(16)}>
          <SectionProfile />
          <Box
            marginTop={sizeScale(16)}
            marginBottom={sizeScale(12)}
            height={sizeScale(1)}
            width="100%"
            backgroundColor="#E4E8F1"
          />
          <Box marginHorizontal={sizeScale(-12)}>
            <SectionMenus />
          </Box>
        </Box>
      </Screen>
    </AnimatedTabScreen>
  );
};

export default AccountScreen;
