import { SwiperFlatList } from '@components/UI/SwiperFlatList';
import React, { ComponentProps, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  ImageProps,
  StyleSheet,
  View,
  Image as RNImage,
} from 'react-native';
import PaginationDots from './PaginationDots';
import Buttons from './Buttons';
import { useTranslation } from 'react-i18next';
import { SwiperFlatListRefProps } from '@components/UI/SwiperFlatList/SwiperProps';
import Text from '@components/UI/Text';
import Box from '@components/UI/Box';
import Image from '@components/UI/Image';
import { sizeScale } from '@helpers/scale';
import useUserStore from '@stores/user.store';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

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
  const [currentPage, setCurrentPage] = useState(0);
  const { t } = useTranslation('onboarding');
  const swiperRef = useRef<SwiperFlatListRefProps>(null);
  const { setFirstRun } = useUserStore();

  const onPageChange: ComponentProps<
    typeof SwiperFlatList
  >['onChangeIndex'] = ({ index: number }) => {
    setCurrentPage(number);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      swiperRef.current?.scrollToIndex({ index: currentPage + 1 });
      setCurrentPage(currentPage + 1);
    } else {
      // Discover now (Skip onboarding)
      setFirstRun(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      swiperRef.current?.scrollToIndex({ index: currentPage - 1 });
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Box flex={4}>
          <SwiperFlatList ref={swiperRef} onChangeIndex={onPageChange}>
            {pages.map((page, index) => {
              return <OnboardPage key={index} {...page} />;
            })}
          </SwiperFlatList>
        </Box>
        <Box flex={1} paddingTop={sizeScale(32)}>
          <PaginationDots
            currentPage={currentPage}
            totalPages={totalPages}
            paginationColor="#C4C4C4"
            paginationSelectedColor="#FCFCFD"
          />
        </Box>
      </View>
      <Buttons
        hasNextPage={currentPage < totalPages - 1}
        hasPrevPage={currentPage > 0}
        nextText={
          currentPage === totalPages - 1
            ? t('buttons.discover_now')
            : t('buttons.next')
        }
        prevText={t('buttons.previous')}
        onNext={handleNextPage}
        onPrev={handlePrevPage}
      />
      <View />
    </View>
  );
};

const IMAGE_WIDTH = screenWidth - 128;

const OnboardPage: React.FC<Page> = ({ title, subtitle, imageSource }) => {
  const { height, width } = useMemo(() => {
    const info = RNImage.resolveAssetSource(imageSource);
    const heightRatio = info.height / info.width;
    const newHeight = IMAGE_WIDTH * heightRatio;
    return { height: newHeight, width: IMAGE_WIDTH };
  }, [imageSource]);

  return (
    <View style={styles.pageContainer}>
      <Box
        maxHeight={screenHeight / 3}
        height="100%"
        justifyContent="flex-end"
        alignItems="center">
        <Image
          resizeMode="contain"
          source={imageSource}
          width={width}
          height={height}
        />
      </Box>
      <Text fontSize={28} style={styles.title}>
        {title}
      </Text>
      <Text fontSize={14} style={styles.subtitleStyle}>
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {},
  pageContainer: {
    flex: 1,
    width: screenWidth,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    marginTop: sizeScale(60),
    fontFamily: 'HelveticaNowDisplay',
    fontWeight: 'bold',
    color: '#FCFCFD',
    textAlign: 'center',
  },
  subtitleStyle: {
    marginTop: sizeScale(16),
    fontFamily: 'HelveticaNowDisplay',
    color: '#707A8F',
    textAlign: 'center',
  },
});

export default OnboardFlow;
