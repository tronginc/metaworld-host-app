import { DefaultTheme } from '@react-navigation/native';

const defaultTheme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    background: '#F4F4F6',
    card: '#FFFFFF',
    primary: '#BB274B',
    text: '#070C21',
    placeholder: '#dfdfdf',
  },
} as const;

export default defaultTheme;
