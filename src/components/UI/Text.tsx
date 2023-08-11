import { sizeScale } from '@helpers/scale';
import React, { PropsWithChildren, useMemo } from 'react';
import { Text as RNText, StyleSheet, TextProps, TextStyle } from 'react-native';

type Props = {
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  color?: TextStyle['color'];
  fontFamily?: TextStyle['fontFamily'];
  style?: TextStyle;
} & TextProps;

const Text: React.FC<PropsWithChildren<Props>> = ({
  fontSize = 14,
  fontWeight,
  children,
  color,
  fontFamily,
  style: overrideStyle,
  ...textProps
}) => {
  const style = useMemo<TextStyle>(() => {
    return StyleSheet.flatten([
      fontSize && { fontSize: sizeScale(fontSize) },
      fontWeight && { fontWeight },
      color && { color },
      fontFamily && { fontFamily },
      overrideStyle,
    ]) as TextStyle;
  }, [color, fontFamily, fontSize, fontWeight, overrideStyle]);

  return (
    <RNText style={style} {...textProps}>
      {children}
    </RNText>
  );
};

export default Text;
