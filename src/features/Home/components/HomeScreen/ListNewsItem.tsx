import React from 'react';
import { sizeScale } from '@helpers/scale';
import { ListRenderItem, StyleSheet } from 'react-native';
import Box from '@components/UI/Box';
import Text from '@components/UI/Text';
import { useTheme } from '@react-navigation/native';
import useNewsQuery from '@features/Home/hooks/HomeScreen/useNewsQuery';
import Image from '@components/UI/Image';

type News = NonNullable<ReturnType<typeof useNewsQuery>['data']>[number];

const renderItem: ListRenderItem<News | null> = ({ item, index }) => {
  if (!item) {
    return <NewsItemPlaceholder index={index} />;
  }
  return <NewsItem item={item} index={index} />;
};

const ITEM_PADDING = sizeScale(8);
const ITEM_MARGIN = sizeScale(6);
const ITEM_GAP = sizeScale(8);
const ITEM_BORDER_RADIUS = sizeScale(8);

const IMAGE_WIDTH = 40,
  IMAGE_HEIGHT = 40;

const NewsItem: React.FC<{
  item: News;
  index: number;
}> = ({ item, index }) => {
  const { colors } = useTheme();

  return (
    <Box
      flex={1}
      backgroundColor={colors.card}
      marginLeft={index % 2 === 0 ? 0 : ITEM_MARGIN}
      marginRight={index % 2 === 0 ? ITEM_MARGIN : 0}
      borderRadius={ITEM_BORDER_RADIUS}>
      <Image
        borderRadius={ITEM_BORDER_RADIUS}
        uri={item.thumbnail}
        aspectRatio={169 / 120}
        style={imageStyle.image}
      />
      <Box gap={1} padding={ITEM_GAP}>
        <Text
          fontWeight="600"
          fontSize={13}
          numberOfLines={1}
          color={colors.text}>
          {item.title}
        </Text>
        <Text fontSize={11} numberOfLines={1} color={colors.text}>
          {item.description}
        </Text>
      </Box>
    </Box>
  );
};

const NewsItemPlaceholder: React.FC<{
  index: number;
}> = ({ index }) => {
  const { colors } = useTheme();
  return (
    <Box
      flexDirection="row"
      flex={1}
      backgroundColor={colors.placeholder}
      padding={ITEM_PADDING}
      marginLeft={index % 2 === 0 ? 0 : ITEM_MARGIN}
      marginRight={index % 2 === 0 ? ITEM_MARGIN : 0}
      borderRadius={ITEM_BORDER_RADIUS}
      gap={ITEM_GAP}
      alignItems="center">
      <Box height={sizeScale(IMAGE_HEIGHT)} width={sizeScale(IMAGE_WIDTH)} />
      <Box height={sizeScale(14)} />
    </Box>
  );
};

const imageStyle = StyleSheet.create({
  image: {
    width: '100%',
  },
});

export default renderItem;
