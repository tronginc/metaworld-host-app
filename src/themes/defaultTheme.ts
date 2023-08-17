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

    neutral_03: '#E4E8F1',
    neutral_04: '#7886A5',
    neutral_05: '#8D9BB9',
    neutral_07: '#636B7E',
    neutral_09: '#2D3758',

    error: '#F04438',
  },
} as const;

export default defaultTheme;
