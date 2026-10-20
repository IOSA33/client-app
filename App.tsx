import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';

import Main from './src/components/Main';
import { ReactElement } from 'react';

const App = (): ReactElement => {
  return (
    <View>
      <StatusBar style="auto" />
      <NativeRouter>
        <Main />
      </NativeRouter>
    </View>
  )
};

export default App;