import React, { PropsWithChildren, useMemo } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

type Props = ViewStyle;

const Screen: React.FC<PropsWithChildren<Props>> = ({
  children,
  ...styleProps
}) => {
  const style = useMemo(() => {
    return StyleSheet.flatten([styles.screen, styleProps]);
  }, [styleProps]);
  return <View style={style}>{children}</View>;
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Screen;
