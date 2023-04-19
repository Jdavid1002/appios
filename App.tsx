import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from 'app_storage/redux-storage';

import AppNavigator from 'app_components/layouts/app-navigator/containers/app-navigator';
import ScreenSplash from 'app_components/commons/screen-splash/components/screen-splash';
import {startNetworkLogging} from 'react-native-network-logger';

export default function App() {
  // const [splashFinished, setSplashFinished] = useState<boolean>(false);

  // useEffect(() => {
  //   startNetworkLogging();
  //   setTimeout(() => {
  //     setSplashFinished(true);
  //   }, 2000);
  // }, []);

  return (
    <SafeAreaProvider>
      {/* <NetworkLogger /> */}
      <Provider store={store}>
        <PersistGate
          //loading={<ScreenSplash />}
          persistor={persistor}>
          {(bootstrapped: any) => {
            if (bootstrapped) {
              return <AppNavigator />;
            } else {
              return <ScreenSplash />;
            }
          }}
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}
