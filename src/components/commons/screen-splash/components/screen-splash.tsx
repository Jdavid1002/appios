import React from 'react';
import {Image, View} from 'react-native';

function ScreenSplash() {
  return (
    <View>
      <Image
        source={require('../../../../assets/img/splash.png')}
        style={{
          height: 100,
          width: 100,
          alignSelf: 'center',
          resizeMode: 'contain',
        }}
      />
    </View>
  );
}

export default ScreenSplash;
