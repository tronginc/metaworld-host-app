import { sizeScale } from '@helpers/scale';
import { useTheme } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { ImageProps, ImageStyle, StyleSheet } from 'react-native';
import { Image as RNImage } from 'react-native';
type Props = {
  width?: ImageStyle['width'];
  height?: ImageStyle['height'];
  borderRadius?: ImageStyle['borderRadius'];
  aspectRatio?: ImageStyle['aspectRatio'];
  showPlaceholder?: boolean;
} & Omit<ImageProps, 'source'> &
  (
    | {
        uri?: string;
      }
    | {
        source?: ImageProps['source'];
      }
  );

/**
 * Image component already scale width, height, borderRadius, don't need to scale again
 */
const Image: React.FC<Props> = ({
  width,
  height,
  borderRadius,
  aspectRatio,
  showPlaceholder,
  ...props
}) => {
  const { colors } = useTheme();
  const imageSource = useMemo(() => {
    if ('uri' in props) {
      return { uri: props.uri };
    }
    if ('source' in props) {
      return props.source;
    }
    return require('@assets/images/placeholder.jpg');
  }, [props]);

  const style = useMemo(() => {
    return StyleSheet.flatten([
      width && { width: typeof width === 'number' ? sizeScale(width) : width },
      height && {
        height: typeof height === 'number' ? sizeScale(height) : height,
      },
      borderRadius && {
        borderRadius:
          typeof borderRadius === 'number'
            ? sizeScale(borderRadius)
            : borderRadius,
      },
      aspectRatio && { aspectRatio },
      showPlaceholder && { backgroundColor: colors.placeholder },
    ]) as ImageStyle;
  }, [
    width,
    height,
    borderRadius,
    aspectRatio,
    showPlaceholder,
    colors.placeholder,
  ]);
  return <RNImage source={imageSource} {...props} style={style} />;
};

export default Image;
