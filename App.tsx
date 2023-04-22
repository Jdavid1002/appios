import * as React from 'react';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/storage/redux-storage';
import AppNavigator from './src/components/layouts/app-navigator/containers/app-navigator';
import ScreenSplash from './src/components/commons/screen-splash/components/screen-splash';

const BorderPadding = (props: any) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      {props.children}
    </View>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <BorderPadding>
              {(bootstrapped: any) => {
                if (bootstrapped) {
                  return <AppNavigator />;
                } else {
                  return <ScreenSplash />;
                }
              }}
            </BorderPadding>
          </PersistGate>
        </Provider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
