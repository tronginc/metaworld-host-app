import React, { PropsWithChildren, useMemo } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = ViewStyle & {
  safeAreaEdge?: keyof typeof safeAreaEdges;
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

const Screen: React.FC<PropsWithChildren<Props>> = ({
  children,
  safeAreaEdge = 'none',
  ...styleProps
}) => {
  const style = useMemo(() => {
    return StyleSheet.flatten([styles.screen, styleProps]);
  }, [styleProps]);
  const safeAreaEdgesToApply = useMemo(() => {
    return safeAreaEdges[safeAreaEdge];
  }, [safeAreaEdge]);

  return (
    <SafeAreaView edges={safeAreaEdgesToApply} style={style}>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

export default Screen;
