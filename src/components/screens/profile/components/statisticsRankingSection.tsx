import React, {useState, useEffect} from 'react';

import Ranking from '../../../../components/commons/ranking';
import StatisticsService from '../../../../services/statistics/statistics';
import {connect} from 'react-redux';

const StatisticsRankingSection = (props: any) => {
  const [rankingAll, setRankingAll] = useState<any[]>([]);
  const [rankingDistrict, setRankingDistrict] = useState<any[]>([]);
  const [rankingInstitution, setRankingInstitution] = useState<any[]>([]);

  const statisticsService = new StatisticsService();

  useEffect(() => {
    const getRankingNational = async () => {
      const response = await statisticsService.getNationalityRanking({
        alliance_id: props.alliance_id,
        auth_token: props.auth_token,
        query_params: {
          user_id: props.user_id,
          alliance_id: props.alliance_id,
          structure_id: props?.user_data?.program?._id || '',
        },
      });

      const newRankingAll = sortByValue(response?.response)?.map(
        (item: any, idx: number) => {
          return {
            ...item,
            id: item?._id,
            position: idx + 1,
          };
        },
      );

      setRankingAll(newRankingAll);
    };
    const getLocationRanking = async () => {
      const response = await statisticsService.getLocationRanking({
        alliance_id: props.alliance_id,
        auth_token: props.auth_token,
        query_params: {
          user_id: props.user_id,
          alliance_id: props.alliance_id,
          structure_id: props?.user_data?.program?._id || '',
        },
      });

      const newRankingDistrict = sortByValue(response?.response)?.map(
        (item: any, idx: number) => {
          return {
            ...item,
            id: item?._id,
            position: idx + 1,
          };
        },
      );

      setRankingDistrict(newRankingDistrict);
    };

    // getRankingNational();
    // getLocationRanking();
  }, []);

  const sortByValue = (rankingList: any[]) => {
    return rankingList.sort((a, b) =>
      a.value > b.value ? -1 : b.value > a.value ? 1 : 0,
    );
  };

  return (
    <React.Fragment>
      {rankingAll?.length > 0 && (
        <Ranking title="Ranking Nacional" data={rankingAll} color="#e94044" />
      )}
      {rankingDistrict?.length > 0 && (
        <Ranking
          title="Ranking de tu localidad"
          data={rankingDistrict}
          color="#8ec772"
        />
      )}
      {rankingInstitution?.length > 0 && (
        <Ranking
          title="Ranking de tu centro educativo"
          data={rankingInstitution}
          color="#39b3e2"
        />
      )}
    </React.Fragment>
  );
};

function mapStatesToProps(state: any = {}) {
  return {
    auth_token: state?.auth?.user?.token,
    user_id: state?.auth?.user?._id,
    alliance_id: state?.auth?.user?.alliance_id,
    user_data: state.auth.user.user_data,
  };
}

export default connect(mapStatesToProps)(StatisticsRankingSection);
