import { DefaultTheme, Theme } from '@react-navigation/native';

const defaultTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'transparent',
  },
};

export default defaultTheme;
