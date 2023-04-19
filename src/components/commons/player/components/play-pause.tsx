import React from 'react';
import {TouchableHighlight, Text} from 'react-native';

import {PlayPauseStyles as styles} from 'app_components/commons/player';

function PlayPause(props: any) {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={styles.container}
      underlayColor="red"
      hitSlop={{left: 5, top: 5, bottom: 5, right: 5}}>
      <Text style={styles.button}>{props.paused ? 'Inicio' : 'Pausa'}</Text>
    </TouchableHighlight>
  );
}

export default PlayPause;
