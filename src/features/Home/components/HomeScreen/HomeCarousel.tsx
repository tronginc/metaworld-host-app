import Box from '@components/UI/Box';
import Image from '@components/UI/Image';
import useHomeCarouselDataQuery from '@features/Home/hooks/HomeScreen/useHomeCarouselDataQuery';
import React, { memo, useState } from 'react';
import { ListRenderItem, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import { sizeScale } from '@helpers/scale';
import PaginationDots from '@components/UI/PaginationDots';
import { useTheme } from '@react-navigation/native';

const { width: windowWidth } = Dimensions.get('window');

type Data = NonNullable<
  ReturnType<typeof useHomeCarouselDataQuery>['data']
>[number];

const HomeCarousel = () => {
  const { data = [] } = useHomeCarouselDataQuery();
  const itemLength = data.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const { colors } = useTheme();

  return (
    <Box
      paddingBottom={sizeScale(24)}
      gap={sizeScale(12)}
      paddingTop={sizeScale(20)}>
      <PaginationDots
        currentPage={activeIndex}
        totalPages={itemLength}
        paginationColor="#E4E8F1"
        paginationSelectedColor={colors.primary}
      />
      <Carousel
        windowSize={windowWidth}
        sliderWidth={windowWidth}
        itemWidth={windowWidth - 60}
        data={data}
        renderItem={renderItem}
        layout="default"
        autoplay
        loop
        autoplayInterval={5000}
        autoplayDelay={2000}
        inactiveSlideOpacity={1}
        onSnapToItem={setActiveIndex}
        inactiveSlideScale={0.94}
        // Space between items
      />
    </Box>
  );
};

const renderItem: ListRenderItem<Data> = ({ item }) => {
  return (
    <Box width="100%">
      <Image
        uri={item.image}
        borderRadius={sizeScale(8)}
        aspectRatio={350 / 172}
        style={styles.image}
        showPlaceholder
      />
    </Box>
  );
};

const styles = StyleSheet.create({
  carousel: {
    paddingBottom: sizeScale(24),
    paddingTop: sizeScale(24),
  },
  image: {
    width: '100%',
  },
});

export default memo(HomeCarousel);
