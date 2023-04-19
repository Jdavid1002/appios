import React, {Component} from 'react';
import {View,ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import mainStyles from 'app_styles/MainStyles';
import { Http, HttpCustomStructure } from 'app_utils/http';
import SectionsSimulacrumLayout from '../components/SectionsMatterLayout';

function mapStatesToProps(state: any = {}) {
  return {
    auth_token: state.auth.user.token,
    alliance_id: state.auth.user.alliance_id,
  };
}

export interface ISectionsSimulacrumContainerProps {
  route : {
    params : {
      simulacrumId : string
    }
  };
  auth_token: string;
  alliance_id: string;
  defaultInfoSections ?: ISection[]
  navigation : any
}

export interface ISectionsSimulacrumContainerState {
  loading: boolean;
  infoSections : ISection[]
  academicResourceData : any
}


export interface ISection {
  _id:string;
  color:string;
  label:string;
  number_of_questions:number;
  questions: IQuestions[];
  uuid: string;
  value: number;
}

export interface IQuestions {

}

class SectionsSimulacrumContainer extends Component<
  ISectionsSimulacrumContainerProps,
  ISectionsSimulacrumContainerState
> {
  state: ISectionsSimulacrumContainerState = {
    loading: true,
    infoSections : [],
    academicResourceData : {}
  };

  componentDidMount = () => {
    this.setState({
      loading: true,
      infoSections : []
    });
    this.getSectionsOfSimulacrum()
  };

  componentWillUnmount = () => {
    this.setState({
      loading: true,
      infoSections : []
    });
  };


  getSectionsOfSimulacrum = async () => {
    if(this?.props?.defaultInfoSections?.length){
      this.setState({
        ...this.state,
        infoSections : this?.props?.defaultInfoSections
      })
      return
    }

    const simulacrumId = this.props.route.params.simulacrumId;

    const configCategory = '601981dcef21ba13c3843b88'

    const headers = {
      'Authorization': this.props.auth_token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
    if(configCategory){
      // @ts-ignore
      headers['Academic-Resource-Config-Category'] = configCategory
    }

    const queryData: HttpCustomStructure = {
      headers,
      method: 'POST',
      url: `/api/lms/academic-resource/${this.props.alliance_id}/fetch-resource`,
      auth_token: this.props.auth_token,
      params : {
        alliance : this.props.alliance_id,
        simulacrum : simulacrumId,
        academic_components: {}
      },
    }

    const data = await Http.send(queryData);


    const sectionsWithQuestions : ISection[] = (data?.academicResourceData?.config?.questions?.question_config || data?.academicResourceData?.config?.simulacrum_resource?.question_configuration)?.map((item : ISection) => {

      const newQuestions = data?.academicResourceData?.config?.questionsByConfiguration[item?.uuid]?.map((question_id : any) => {
        return data?.academicResourceData?.config?.questions?.find((question : any) =>question?._id === question_id)
      });

      return{
        ...item,
        questions : newQuestions
      }
    })

    if(data?.status_code === 'success'){
      this.setState({
        ...this.state,
        loading : false,
        infoSections : sectionsWithQuestions,
        academicResourceData : data?.academicResourceData
      })
    }
  }

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
        <SectionsSimulacrumLayout
          infoSections={this.state.infoSections}
          navigation={this?.props?.navigation}
          academicResourceData={this.state.academicResourceData}
          simulacrumId={this.props.route.params.simulacrumId}
          getSectionsOfSimulacrum={this.getSectionsOfSimulacrum}
        />
      </React.Fragment>
    );
  }
}

export default connect(mapStatesToProps)(SectionsSimulacrumContainer);
