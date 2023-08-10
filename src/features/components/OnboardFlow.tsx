import { SwiperFlatList } from '@components/UI/SwiperFlatList';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ImageProps,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PaginationDots from './PaginationDots';

const screenWidth = Dimensions.get('screen').width;

type Page = {
  title: string;
  subtitle: string;
  imageSource: ImageProps['source'];
};

type Props = {
  pages: Page[];
};

const OnboardFlow: React.FC<Props> = ({ pages }) => {
  const totalPages = pages.length;
  const [currentPage] = useState(0);
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <SwiperFlatList>
          {pages.map((page, index) => {
            return (
              <View style={styles.pageContainer} key={index}>
                <Image source={page.imageSource} />
                <Text style={styles.title}>{page.title}</Text>
                <Text style={styles.subtitleStyle}>{page.subtitle}</Text>
              </View>
            );
          })}
        </SwiperFlatList>
        <PaginationDots
          currentPage={currentPage}
          totalPages={totalPages}
          paginationColor="#C4C4C4"
          paginationSelectedColor="#FCFCFD"
        />
      </View>
      <View />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
  },
  pageContainer: {
    flex: 1,
    width: screenWidth,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 60,
    fontFamily: 'HelveticaNowDisplay',
    fontWeight: 'bold',
    color: '#FCFCFD',
    fontSize: 28,
    textAlign: 'center',
  },
  subtitleStyle: {
    marginTop: 16,
    fontFamily: 'HelveticaNowDisplay',
    color: '#707A8F',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default OnboardFlow;
