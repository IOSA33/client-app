import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import { ReactElement } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Main from './src/components/Main';

// Deleted SafeAreaView because we have in AppBar.tsx constant "Constants.statusBarHeight"
const App = (): ReactElement => {
  return (
  <SafeAreaProvider>      
      <StatusBar style="light" />

      <NativeRouter>
        <Main />
      </NativeRouter>
  </SafeAreaProvider>
  )
};

export default App;