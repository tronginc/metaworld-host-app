import Text from '@components/UI/Text';
import { sizeScale } from '@helpers/scale';
import React from 'react';
import { Pressable, PressableProps, StyleSheet } from 'react-native';

type Props = {} & PressableProps;

const FormButton: React.FC<Props> = ({ ...props }) => {
  return (
    <Pressable style={styles.button} {...props}>
      <Text fontSize={16} fontWeight="bold" color="white">
        Login
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: sizeScale(48),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: sizeScale(8),
    backgroundColor: '#161C37',
  },
});

export default FormButton;
