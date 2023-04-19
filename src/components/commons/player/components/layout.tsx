import React from 'react';
import {View} from 'react-native';

import {LayoutStyles as styles} from 'app_components/commons/player';

function Layout(props: any) {
  return (
    <View style={styles.container}>
      <View style={styles.video}>{props.video}</View>
      <View style={styles.overlay}>{props.loading && props.loader}</View>
      {/* {props.controls} */}
    </View>
  );
}

export default Layout;
