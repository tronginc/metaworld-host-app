import React, { useMemo } from 'react';
import { ImageProps, ImageStyle, StyleSheet } from 'react-native';
import { Image as RNImage } from 'react-native';
type Props = {
  width?: ImageStyle['width'];
  height?: ImageStyle['height'];
  borderRadius?: ImageStyle['borderRadius'];
} & ImageProps;

const Image: React.FC<Props> = ({ width, height, borderRadius, ...props }) => {
  const style = useMemo(() => {
    return StyleSheet.flatten([
      width && { width },
      height && { height },
      borderRadius && { borderRadius },
    ]) as ImageStyle;
  }, [borderRadius, height, width]);
  return <RNImage {...props} style={style} />;
};

export default Image;
