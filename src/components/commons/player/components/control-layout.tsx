import React from 'react';
import {View} from 'react-native';

import {ControlLayoutStyles as styles} from '../../../../components/commons/player';

function ControlLayout(props: any) {
  return <View style={styles.container}>{props.children}</View>;
}

export default ControlLayout;
