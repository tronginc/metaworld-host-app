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

type Props = {};

const HomeScreen: React.FC<Props> = ({}) => {
  const { colors } = useTheme();
  return (
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
          <Box paddingHorizontal={sizeScale(16)}>
            <ListProduct />
          </Box>
          <Box paddingHorizontal={sizeScale(16)} marginVertical={sizeScale(20)}>
            <ListNews />
          </Box>
        </ScrollView>
      </Box>
    </Screen>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
});

export default HomeScreen;
