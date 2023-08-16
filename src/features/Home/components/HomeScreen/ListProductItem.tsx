import React from 'react';
import { sizeScale } from '@helpers/scale';
import { ListRenderItem } from 'react-native';
import Box from '@components/UI/Box';
import Image from '@components/UI/Image';
import Text from '@components/UI/Text';
import { useTheme } from '@react-navigation/native';
import useProductsQuery from '@features/Home/hooks/HomeScreen/useProductsQuery';
import FastImage from 'react-native-fast-image';

type Product = NonNullable<ReturnType<typeof useProductsQuery>['data']>[number];

const renderItem: ListRenderItem<Product | null> = ({ item }) => {
  if (!item) {
    return <ProductItemPlaceholder />;
  }
  return <ProductItem item={item} />;
};

const ITEM_PADDING = sizeScale(8);
const ITEM_GAP = sizeScale(8);
const ITEM_BORDER_RADIUS = sizeScale(8);

const IMAGE_WIDTH = 40,
  IMAGE_HEIGHT = 40;

const ProductItem: React.FC<{
  item: Product;
}> = ({ item }) => {
  const { colors } = useTheme();
  return (
    <Box
      flexDirection="row"
      flex={1}
      backgroundColor={colors.card}
      padding={ITEM_PADDING}
      borderRadius={ITEM_BORDER_RADIUS}
      gap={ITEM_GAP}
      alignItems="center">
      <Image
        ImageComponent={FastImage}
        source={item.icon}
        height={IMAGE_HEIGHT}
        width={IMAGE_WIDTH}
      />
      <Text color={colors.text}>{item.name}</Text>
    </Box>
  );
};

const ProductItemPlaceholder: React.FC = () => {
  const { colors } = useTheme();
  return (
    <Box
      flexDirection="row"
      flex={1}
      backgroundColor={colors.placeholder}
      padding={ITEM_PADDING}
      borderRadius={ITEM_BORDER_RADIUS}
      gap={ITEM_GAP}
      alignItems="center">
      <Box height={sizeScale(IMAGE_HEIGHT)} width={sizeScale(IMAGE_WIDTH)} />
      <Box height={sizeScale(14)} />
    </Box>
  );
};

export default renderItem;
