import React, {Component} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import mainStyles from '../../../../styles/MainStyles';
import SectionsMatterLayout from '../components/SectionsMatterLayout';
import ChallengeService from '../../../../services/challenges/challenges';

function mapStatesToProps(state: any = {}) {
  return {
    auth_token: state.auth.user.token,
    alliance_id: state.auth.user.alliance_id,
  };
}

export interface ISectionsMatterContainerProps {
  route: {
    params: {
      matterId: string;
      configCategory: string;
      customParams: any;
      getChallengesData: () => void;
      isSimulacrum?: boolean;
    };
  };
  auth_token: string;
  alliance_id: string;
  defaultInfoSections?: ISection[];
  navigation: any;
}

export interface ISectionsMatterContainerState {
  loading: boolean;
  infoSections: ISection[];
  academicResourceData: any;
}

export interface ISection {
  _id: string;
  color: string;
  label: string;
  number_of_questions: number;
  questions: IQuestions[];
  uuid: string;
  value: number;
}

export interface IQuestions {}

class SectionsMatterContainer extends Component<
  ISectionsMatterContainerProps,
  ISectionsMatterContainerState
> {
  state: ISectionsMatterContainerState = {
    loading: true,
    infoSections: [],
    academicResourceData: {},
  };

  componentDidMount = () => {
    this.setState({
      infoSections: [],
    });
    this.getSectionsOfMatter();
  };

  componentWillUnmount = () => {
    this.setState({
      loading: false,
      infoSections: [],
    });
  };

  getSectionsOfMatter = async () => {
    
    if (this?.props?.defaultInfoSections?.length) {
      this.setState({
        ...this.state,
        infoSections: this?.props?.defaultInfoSections,
      });
      return;
    }

    this.setState({
      ...this.state,
      loading: true,
    });

    const challengeService = new ChallengeService();

    const matterId = this.props.route.params.matterId;
    const configCategory = this.props.route.params.configCategory;

    let params = {};

    if (this.props.route.params?.customParams) {
      params = this.props.route.params?.customParams;
    } else {
      params = {
        alliance: this?.props?.alliance_id,
        diagnostic: matterId,
      };
    }

    const data = await challengeService.getSectionsMatter({
      configCategory: configCategory,
      auth_token: this.props.auth_token,
      alliance_id: this?.props?.alliance_id,
      query_params: params,
    });

    if (data?.status_code !== 'success') return 

    let sectionsWithQuestions: ISection[] = [];

    if (
      data?.academicResourceData?.config?.diagnostic_resource_module
        ?.question_configuration?.length
    ) {
      sectionsWithQuestions =
        data?.academicResourceData?.config?.diagnostic_resource_module?.question_configuration.map(
          (item: ISection) => {
            const newQuestions =
              data?.academicResourceData?.config?.questionsByConfiguration[
                item?.uuid
              ]?.map((question_id: any) => {
                return data?.academicResourceData?.config?.questions?.find(
                  (question: any) => question?._id === question_id,
                );
              });

            return {
              ...item,
              questions: newQuestions,
            };
          },
        );
    }
    if (
      data?.academicResourceData?.config?.simulacrum_resource
        ?.question_configuration?.length
    ) {
      sectionsWithQuestions =
        data?.academicResourceData?.config?.simulacrum_resource?.question_configuration.map(
          (item: ISection) => {
            const newQuestions =
              data?.academicResourceData?.config?.questionsByConfiguration[
                item?.uuid
              ]?.map((question_id: any) => {
                return data?.academicResourceData?.config?.questions?.find(
                  (question: any) => question?._id === question_id,
                );
              });

            return {
              ...item,
              questions: newQuestions,
            };
          },
        );
    }

    this.setState({
      ...this.state,
      loading: false,
      infoSections: sectionsWithQuestions,
      academicResourceData: data?.academicResourceData,
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={[mainStyles.container, mainStyles.containerLoading]}>
          <ActivityIndicator size="large" color="#061946" />
        </View>
      );
    }

    return (
      <React.Fragment>
        <SectionsMatterLayout
          infoSections={this.state.infoSections}
          navigation={this?.props?.navigation}
          academicResourceData={this.state.academicResourceData}
          matterId={this.props.route.params.matterId}
          getSectionsOfMatter={this.getSectionsOfMatter}
          getChallengesData={this.props.route.params.getChallengesData}
          isSimulacrum={this.props.route.params.isSimulacrum}
        />
      </React.Fragment>
    );
  }
}

export default connect(mapStatesToProps)(SectionsMatterContainer);
