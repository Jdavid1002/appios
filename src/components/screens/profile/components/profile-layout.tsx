import React, { useState } from 'react';
import { TouchableOpacity, View , Text} from 'react-native';

import mainStyles from '../../../../styles/MainStyles';
import {
  styles,
  InfoLayout,
  StatisticsLayout,
} from '../../../../components/screens/profile';

const ProfileLayout = (props: any) => {

  const [ScreenSelected, setScreenSelected] = useState <'info' | 'statistics'>('info');
  

  return (
    <View style={[mainStyles.container, styles.container]}>

      <View style={[styles.tabs]} >
        <TouchableOpacity style={[styles.tab, ScreenSelected==='info' ? styles.tabActive : {}]}  onPress={() => setScreenSelected('info')}>
          <Text style={styles.tabText} > Tu info </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, ScreenSelected==='statistics' ? styles.tabActive : {} ]} onPress={() => setScreenSelected('statistics')}>
          <Text style={styles.tabText} > Estadísticas </Text>
        </TouchableOpacity>
      </View>


      {ScreenSelected === 'info' &&
        <InfoLayout {...props} />
      }
      {ScreenSelected === 'statistics' &&
        <StatisticsLayout {...props} />
      }

    </View>
  );
};

export default ProfileLayout;
