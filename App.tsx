import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';

import Main from './src/components/Main';

export default function App() {
  return (
    <View>
      <StatusBar style="auto" />
      <NativeRouter>
        <Main />
      </NativeRouter>
    </View>
  );
}