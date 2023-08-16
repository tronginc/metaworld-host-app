import Box from '@components/UI/Box';
import Image from '@components/UI/Image';
import Text from '@components/UI/Text';
import { sizeScale } from '@helpers/scale';
import { useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import arrow_right from '@assets/images/icons/arrow-right.png';
import useNewsQuery from '@features/Home/hooks/HomeScreen/useNewsQuery';
import renderItem from './ListNewsItem';
import { FlatGrid } from '@components/UI/Grid';

type Props = {};

const ListNews: React.FC<Props> = ({}) => {
  const { data: news = [], isLoading } = useNewsQuery();

  const placeholderData = useMemo(() => {
    return Array.from<null>({ length: 8 }).fill(null);
  }, []);

  return (
    <FlatGrid
      scrollEnabled={false}
      itemDimension={sizeScale(130)}
      spacing={sizeScale(12)}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      ListHeaderComponent={ListHeaderComponent}
      data={isLoading ? placeholderData : news}
      renderItem={renderItem}
    />
  );
};

const ListHeaderComponent = () => {
  const { colors } = useTheme();
  const [t] = useTranslation('home');
  return (
    <Box
      marginBottom={sizeScale(16)}
      paddingHorizontal={sizeScale(12)}
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center">
      <Text color={colors.text} fontWeight="700" fontSize={18}>
        {t('home_screen.news')}
      </Text>
      <Box flexDirection="row" alignItems="center" gap={sizeScale(8)}>
        <Text color={colors.primary} fontWeight="700" fontSize={14}>
          {t('home_screen.next')}
        </Text>
        <Image
          source={arrow_right}
          tintColor={colors.primary}
          height={16}
          width={16}
        />
      </Box>
    </Box>
  );
};

export default ListNews;
