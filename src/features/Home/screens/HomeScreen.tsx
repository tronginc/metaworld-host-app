import Screen from '@components/UI/Screen';
import React from 'react';
import Header from '../components/commons/Header';
import { sizeScale } from '@helpers/scale';
import ListProduct from '../components/HomeScreen/ListProduct';
import { useTheme } from '@react-navigation/native';
import Box from '@components/UI/Box';
import { ScrollView, StyleSheet } from 'react-native';
import ListNews from '../components/HomeScreen/ListNews';
import HomeCarousel from '../components/HomeScreen/HomeCarousel';
import NotificationIcon from '../components/HomeScreen/NotificationIcon';
import useStatusbarOnFocus from '@hooks/common/useStatusbarOnFocus';
import AnimatedTabScreen from '../components/commons/AnimatedTabScreen';

type Props = {};

const HomeScreen: React.FC<Props> = ({}) => {
  const { colors } = useTheme();
  useStatusbarOnFocus('light-content');

  return (
    <AnimatedTabScreen>
      <Screen backgroundColor={colors.primary} safeAreaEdge="top">
        <Box paddingVertical={sizeScale(36)} paddingHorizontal={sizeScale(16)}>
          <Header showLogo title="MetaWorld" tintColor="white">
            <NotificationIcon />
          </Header>
        </Box>
        <Box
          flex={1}
          height="100%"
          backgroundColor={colors.background}
          borderTopLeftRadius={sizeScale(24)}
          overflow="hidden"
          borderTopRightRadius={sizeScale(24)}>
          <ScrollView
            style={styles.scrollView}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <HomeCarousel />
            <Box
              paddingHorizontal={sizeScale(4)}
              marginVertical={-sizeScale(12)}>
              <ListProduct />
            </Box>
            <Box paddingHorizontal={sizeScale(4)} marginVertical={sizeScale(6)}>
              <ListNews />
            </Box>
          </ScrollView>
        </Box>
      </Screen>
    </AnimatedTabScreen>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});

export default HomeScreen;
