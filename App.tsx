import * as React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/storage/redux-storage';
import AppNavigator from './src/components/layouts/app-navigator/containers/app-navigator';
import ScreenSplash from './src/components/commons/screen-splash/components/screen-splash';
import { OnlineCheck } from './src/components/commons/onlineCheck';

export default function App() {

  return (
    <SafeAreaView style={{height : '100%'}} >
  
      <Provider store={store}>
        <OnlineCheck />
        <PersistGate loading={null} persistor={persistor}>
          {(bootstrapped: any) => {
            if (bootstrapped) {
              return <AppNavigator />;
            } else {
              return <ScreenSplash />;
            }
          }}
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
}
