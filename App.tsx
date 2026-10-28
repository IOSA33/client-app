import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import { ReactElement, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query'

import { AppState, Platform } from 'react-native'
import type { AppStateStatus } from 'react-native'

import Main from './src/components/Main';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5
    },
  },
})

const App = (): ReactElement => {
  useEffect(() => {
    const onAppStateChange = (status: AppStateStatus): void => {
      if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active');
      }
    };

    console.log("happened");

    const subscription = AppState.addEventListener('change', onAppStateChange);

    return (): void => {
      subscription.remove();
    };
  }, []);

  return (
  <SafeAreaProvider>      
      <StatusBar style="auto" />

    <QueryClientProvider client={queryClient}>
      <NativeRouter>
        <Main />
      </NativeRouter>
    </QueryClientProvider>
  </SafeAreaProvider>
  )
};

export default App;