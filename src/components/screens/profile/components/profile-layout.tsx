import React from 'react';
import {Tab, Tabs, View} from 'native-base';

import mainStyles from 'app_styles/MainStyles';
import {
  styles,
  InfoLayout,
  StatisticsLayout,
} from 'app_components/screens/profile';

const ProfileLayout = (props: any) => {
  return (
    <View style={[mainStyles.container, styles.container]}>
      <Tabs
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
      </Tabs>
    </View>
  );
};

export default ProfileLayout;
