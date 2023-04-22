import React from 'react';
import { SafeAreaView, Image} from 'react-native';

function ScreenSplash() {
  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <Image
        source={require('assets/img/splash.png')}
        style={{ height: 100, width: 100, alignSelf: 'center', resizeMode: 'contain',}}
      />
    </SafeAreaView>
  );
}

export default ScreenSplash;
