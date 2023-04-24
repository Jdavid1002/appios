import React from 'react';
import { View } from 'react-native';

import mainStyles from '../../../../styles/MainStyles';
import {
  styles,
  InfoLayout,
  StatisticsLayout,
} from '../../../../components/screens/profile';

const ProfileLayout = (props: any) => {
  return (
    <View style={[mainStyles.container, styles.container]}>
      <InfoLayout {...props} />
      <StatisticsLayout {...props} />
    </View>
  );
};

export default ProfileLayout;


{/* <Tabs
  tabContainerStyle={[styles.tabs]}
  tabBarUnderlineStyle={[styles.tabUnderline]}
  initialPage={
    props.route.params.initialTab ? props.route.params.initialTab : 0
  }
  locked>
  <Tab
    tabStyle={[styles.tab]}
    activeTabStyle={[styles.tabActive]}
    activeTextStyle={styles.tabText}
    textStyle={styles.tabText}
    heading="Tu info">
    <InfoLayout {...props} />
  </Tab>
  <Tab
    tabStyle={[styles.tab]}
    activeTabStyle={[styles.tabActive]}
    activeTextStyle={styles.tabText}
    textStyle={styles.tabText}
    heading="Estadísticas">
    <StatisticsLayout {...props} />
  </Tab>
</Tabs> */}