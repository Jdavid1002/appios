import React, {useState, useEffect} from 'react';
import {ScrollView, RefreshControl} from 'react-native';

import {styles} from '../../../../components/screens/profile';

import HowIFeel from '../../../../components/commons/how-i-feel';
import StatisticsTopSection from './statisticsTopSection';
import StatisticsRankingSection from './statisticsRankingSection';
import ProfileService from '../../../../services/profile';
import {connect} from 'react-redux';
import StatisticsService from '../../../../services/statistics/statistics';

const StatisticsLayout = (props: any) => {
  const [loading, setLoading] = useState(false);

  const getStatisticsInformation = async () => {
    setLoading(true);

    const statisticsService = new StatisticsService();

    const params = {
      nPerPage: '10',
      not_validate_alliance: false,
      not_validate_structure: false,
      not_validate_user: false,
      pageNumber: '1',
      structure_id: props?.user_data?.program?._id || '',
    };

    await statisticsService.getStatistics(
      props?.auth_token,
      props?.alliance_id,
      props.dispatch,
      params,
    );
    setLoading(false);
  };

  useEffect(() => {
    getStatisticsInformation();
  }, []);

  return (
    <React.Fragment>
      <ScrollView
        style={{
          height : '85%'
        }}
        contentContainerStyle={[
          styles.wrapper,
          {
            backgroundColor: '#f8f8f8',
            paddingHorizontal: 0,
            paddingTop: 0,
          },
        ]}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={getStatisticsInformation}
          />
        }>
        {props.statistics?.status === 'success' && (
          <StatisticsTopSection statistics={props.statistics} />
        )}
        <StatisticsRankingSection
          statistics={props.statistics}
          data={props.data}
        />
      </ScrollView>
      <HowIFeel screen="section_profile" />
    </React.Fragment>
  );
};

function mapStatesToProps(state: any = {}) {
  return {
    auth_token: state?.auth?.user?.token,
    alliance_id: state?.auth?.user?.alliance_id,
    user_data: state.auth.user.user_data,
  };
}
export default connect(mapStatesToProps)(StatisticsLayout);
