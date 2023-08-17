import { useIsFocused } from '@react-navigation/native';
import { useEffect } from 'react';
import { Platform, StatusBar } from 'react-native';

const useStatusbarOnFocus = (barStyle: 'dark-content' | 'light-content') => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused && Platform.OS === 'android') {
      StatusBar.setBarStyle(barStyle);
    }
  }, [isFocused, barStyle]);
};

export default useStatusbarOnFocus;
