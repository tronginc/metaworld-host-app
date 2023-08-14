import React, { PropsWithChildren } from 'react';
import { StyleSheet, TextProps, TextStyle } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import Text from './Text';

type Props = {
  fontSize?: number;
  fontWeight?: TextStyle['fontWeight'];
  fontFamily?: TextStyle['fontFamily'];
  style?: TextStyle;
  colors?: (string | number)[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
} & TextProps;

/**
 * Like Text component, GradientText already scaled, don't need to scale again
 */
const GradientText: React.FC<PropsWithChildren<Props>> = ({
  colors = ['#D42B53', '#D42BD4'],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 0 },
  children,
  ...textProps
}) => {
  return (
    <MaskedView maskElement={<Text {...textProps}>{children}</Text>}>
      <LinearGradient colors={colors} start={start} end={end}>
        <Text style={styles.opacity_0} {...textProps}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  opacity_0: {
    opacity: 0,
  },
});

export default GradientText;
