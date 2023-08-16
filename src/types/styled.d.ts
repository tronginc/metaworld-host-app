import '@react-navigation/native';

import defaultTheme from '../themes/defaultTheme';

declare module '@react-navigation/native' {
  export type Theme = typeof defaultTheme & {};
}
