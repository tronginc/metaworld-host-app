import { sizeScale } from '@helpers/scale';
import React, { PropsWithChildren, useMemo } from 'react';
import { Text as RNText, StyleSheet, TextProps, TextStyle } from 'react-native';

type Props = {
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  color?: TextStyle['color'];
  fontFamily?: TextStyle['fontFamily'];
  style?: TextStyle;
  textAlign?: TextStyle['textAlign'];
  numberOfLines?: number;
} & TextProps;

/**
 * Text component already scaled, don't need to scale again
 */
const Text: React.FC<PropsWithChildren<Props>> = ({
  fontSize = 14,
  fontWeight,
  children,
  color,
  fontFamily,
  textAlign,
  style: overrideStyle,
  ...textProps
}) => {
  const style = useMemo<TextStyle>(() => {
    return StyleSheet.flatten([
      fontSize && { fontSize: sizeScale(fontSize) },
      fontWeight && { fontWeight },
      color && { color },
      fontFamily && { fontFamily },
      textAlign && { textAlign },
      overrideStyle,
    ]) as TextStyle;
  }, [color, fontFamily, fontSize, fontWeight, overrideStyle, textAlign]);

  return (
    <RNText style={style} {...textProps}>
      {children}
    </RNText>
  );
};

export default Text;
