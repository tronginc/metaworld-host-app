import React, { useEffect } from 'react';
import AppNavigator from '@navigations/index';
import { I18nextProvider } from 'react-i18next';
import i18n from './src/i18n/i18n';
import {
  QueryClientProvider,
  focusManager,
  onlineManager,
} from '@tanstack/react-query';
import queryClient from '@helpers/queryClient';
import { AppState, AppStateStatus, Platform } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}

const App: React.FC = () => {
  const netInfo = useNetInfo();

  useEffect(() => {
    onlineManager.setOnline(netInfo.isConnected || false);
  }, [netInfo.isConnected]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', onAppStateChange);
    return () => subscription.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <I18nextProvider i18n={i18n}>
        <AppNavigator />
      </I18nextProvider>
    </QueryClientProvider>
  );
};

export default App;
