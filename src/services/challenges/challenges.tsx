import {Http, HttpCustomStructure} from 'app_utils/http';
import { Alert } from 'react-native';


export interface IGetSectionsMatter {
  configCategory : string
  auth_token : string
  alliance_id : string
  query_params : {
    alliance : string
    diagnostic ?: string
  } | any
}

export interface IGetChallengesData {
  auth_token : string
  alliance_id : string
  user_id : string
}

class ChallengeService {

  async getSectionsMatter (params : IGetSectionsMatter){

    const {configCategory, auth_token, alliance_id, query_params} = params

    try {
      const headers = {
        'Authorization': auth_token,
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
        url: `/api/lms/academic-resource/${alliance_id}/fetch-resource`,
        auth_token: auth_token,
        params : query_params,
      }

      const data = await Http.send(queryData);

      if(data?.code !== 200){
        Alert.alert(data.message);
        return null
      }

      return data

    } catch (error) {
      console.log(error)
    }
  }

  async getChallengesData(params : IGetChallengesData) {

    const {auth_token, alliance_id, user_id} = params

    try {
      const query_data: HttpCustomStructure = {
        method: 'POST',
        url: '/api/learning-way/get-home-info',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: auth_token,
        }),
        params: {
          alliance_id: alliance_id,
          user_id: user_id,
        },
        auth_token: auth_token
      };
      const data = await Http.send(query_data);
      if (data?.status === 'success') {
        return data
      } else {
        Alert.alert(data.message);
      }
    } catch (error) {
      console.log(error)
    }
  }
}

export default ChallengeService;
