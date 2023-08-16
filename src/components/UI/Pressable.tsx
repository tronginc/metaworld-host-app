import React, { PropsWithChildren, useMemo } from 'react';
import { StyleSheet, ViewStyle, Pressable as RNPressable } from 'react-native';

type Props = ViewStyle & {
  onPress?: () => void;
};

const Pressable: React.FC<PropsWithChildren<Props>> = ({
  children,
  onPress,
  ...styleProps
}) => {
  const style = useMemo(() => {
    return StyleSheet.flatten(styleProps);
  }, [styleProps]);

  return (
    <RNPressable onPress={onPress} style={style}>
      {children}
    </RNPressable>
  );
};

export default Pressable;
