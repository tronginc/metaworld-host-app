import React, { PropsWithChildren, useMemo } from 'react';
import { StyleSheet, ViewStyle, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Props = ViewStyle & {
  safeAreaEdge?: keyof typeof safeAreaEdges;
  enableScroll?: boolean;
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

  enableScroll,
  ...styleProps
}) => {
  const style = useMemo(() => {
    return StyleSheet.flatten([styles.screen, styleProps]);
  }, [styleProps]);
  const safeAreaEdgesToApply = useMemo(() => {
    return safeAreaEdges[safeAreaEdge];
  }, [safeAreaEdge]);

  if (enableScroll) {
    return (
      <SafeAreaView edges={safeAreaEdgesToApply} style={style}>
        <ScrollView
          keyboardDismissMode={
            Platform.OS === 'ios' ? 'interactive' : 'on-drag'
          }
          keyboardShouldPersistTaps="always"
          style={styles.screen}>
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

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
