import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import { ReactElement } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Main from './src/components/Main';

const App = (): ReactElement => {
  return (
  <SafeAreaProvider>      
      <StatusBar style="auto" />

      <NativeRouter>
        <Main />
      </NativeRouter>
  </SafeAreaProvider>
  )
};

export default App;