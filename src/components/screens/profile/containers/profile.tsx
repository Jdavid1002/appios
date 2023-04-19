import React, { Component } from "react";
import { Alert } from "react-native";
import { connect } from "react-redux";
import { LOGOUT } from "app_reducers/auth/types";
import { ProfileLayout } from "app_components/screens/profile";

import ProfileService from "app_services/profile";
import StatisticsService from "app_services/statistics/statistics";

class Profile extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      editModalVisible: false
    };

    this.setEditModalVisible = this.setEditModalVisible.bind(this);
    this.doLogout = this.doLogout.bind(this);
    this.doGetStatistics = this.doGetStatistics.bind(this);
    this.doGetRankings = this.doGetRankings.bind(this);
  }

  confirmLogout = () => {
    Alert.alert("Cerrar sesión", "¿Está seguro que desea cerrar sesión?", [
      {
        text: "Cancelar",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "Si, cerrar sesión", onPress: this.doLogout }
    ]);
  };

  doLogout = () => {
    this.props.dispatch({
      type: LOGOUT,
      payload: null
    });
  };

  setEditModalVisible = (state: boolean) => {
    this.setState({
      editModalVisible: state
    });
  };

  doGetStatistics = async () => {
    const statisticsService = new StatisticsService();

    const params = {
      nPerPage: "10",
      not_validate_alliance: false,
      not_validate_structure: false,
      not_validate_user: false,
      pageNumber: "1",
      structure_id: this?.props?.data?.program?._id || ""
    };

    await statisticsService.getStatistics(
      this.props.token,
      this.props.alliance_id,
      this.props.dispatch,
      params
    );
  };

  doGetRankings = async (params: any) => {
    const profileService = new ProfileService();

    await profileService.getRankings(
      params,
      this.props.token,
      this.props.dispatch
    );
  };

  async componentDidMount() {
    await this.doGetStatistics();
    await this.doGetRankings({ type: "all", limit: 15 });
    await this.doGetRankings({ type: "district", limit: 15 });
    await this.doGetRankings({ type: "institution", limit: 15 });
  }

  render() {
    return (
      <ProfileLayout
        {...this.props}
        doLogout={this.confirmLogout}
        setEditModalVisible={this.setEditModalVisible}
        editModalVisible={this.state.editModalVisible}
        doGetStatistics={this.doGetStatistics}
      />
    );
  }
}

function mapStatesToProps(state: any = {}) {
  return {
    data: state.auth.user.user_data,
    alliance_id: state.auth.user.alliance_id,
    token: state.auth.user.token,
    statistics: state.statistics.data,
    statisticsStatus: state.statistics.status,
    rankings: state.rankings.data,
    rankingsStatus: state.rankings.status
  };
}

export default connect(mapStatesToProps)(Profile);
