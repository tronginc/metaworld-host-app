import React, { PropsWithChildren, useMemo } from 'react';
import { StyleSheet, ViewStyle, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = ViewStyle & {
  safeAreaEdge?: keyof typeof safeAreaEdges;
  style?: ViewStyle;
};

const safeAreaEdges = {
  top: ['top'],
  bottom: ['bottom'],
  left: ['left'],
  right: ['right'],
  all: ['top', 'bottom', 'left', 'right'],
  top_bottom: ['top', 'bottom'],
  left_right: ['left', 'right'],
  top_left_right: ['top', 'left', 'right'],
  bottom_left_right: ['bottom', 'left', 'right'],
  none: [],
} as const;

const Box: React.FC<PropsWithChildren<Props>> = ({
  children,
  safeAreaEdge = 'none',
  style: overrideStyle,
  ...styleProps
}) => {
  const style = useMemo(() => {
    return StyleSheet.flatten([styleProps, overrideStyle]);
  }, [overrideStyle, styleProps]);

  const safeAreaEdgesToApply = useMemo(() => {
    return safeAreaEdges[safeAreaEdge];
  }, [safeAreaEdge]);

  if (safeAreaEdgesToApply.length === 0) {
    return <View style={style}>{children}</View>;
  }
  return (
    <SafeAreaView edges={safeAreaEdgesToApply} style={style}>
      {children}
    </SafeAreaView>
  );
};

export default Box;
