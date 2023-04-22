import "react-native-gesture-handler";
import React, { Component } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "app_storage/redux-storage";
import { Root } from "native-base";

import AppNavigator from "app_components/layouts/app-navigator/containers/app-navigator";
import ScreenSplash from "app_components/commons/screen-splash/components/screen-splash";
import {
  startNetworkLogging
} from "react-native-network-logger";
import { AppState, NativeEventSubscription } from "react-native";
export default class App extends Component {
  appStateSubscription?: NativeEventSubscription;

  state = {
    appState: AppState.currentState,
    splashFinished: false,
  };

  constructor(props: any) {
    super(props);
    startNetworkLogging();
  }

  componentDidMount() {
    // show the splash for 2 seconds
    setTimeout(() => {
      this.setState({
        splashFinished: true,
      });
    }, 2000);
  }

  componentWillUnmount() {
    this.appStateSubscription?.remove();
  }

  render() {
    return (
      <SafeAreaProvider>
        {/* <NetworkLogger /> */}
        <Provider store={store}>
          <Root>
            <PersistGate
              //loading={<ScreenSplash />}
              persistor={persistor}
            >
              {(bootstrapped: any) => {
                if (bootstrapped && this.state.splashFinished) {
                  return <AppNavigator />;
                } else {
                  return <ScreenSplash />;
                }
              }}
            </PersistGate>
          </Root>
        </Provider>
      </SafeAreaProvider>
    );
  }
}
