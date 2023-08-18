import { sizeScale } from '@helpers/scale';
import { useTheme } from '@react-navigation/native';
import React, { PropsWithChildren, useMemo } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import check from '@assets/images/icons/check.png';
import Image from '@components/UI/Image';
import Box from '@components/UI/Box';

interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox: React.FC<PropsWithChildren<CheckboxProps>> = ({
  children,
  checked,
  onChange,
}) => {
  const { colors } = useTheme();
  const handlePress = () => {
    onChange(!checked);
  };

  const checkboxStyle = useMemo(() => {
    return StyleSheet.flatten([
      styles.checkbox,
      {
        borderColor: colors.neutral_04,
      },
    ]);
  }, [colors]);

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <View style={checkboxStyle}>
        {checked ? (
          <Box marginTop={-sizeScale(6)} marginRight={-sizeScale(3)}>
            <Image
              height={20}
              width={20}
              source={check}
              tintColor={colors.primary}
            />
          </Box>
        ) : null}
      </View>
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  checkbox: {
    width: sizeScale(16),
    height: sizeScale(16),
    borderWidth: sizeScale(1),
    borderRadius: sizeScale(4),
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: sizeScale(6),
  },
});

export default Checkbox;
