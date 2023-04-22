import { Alert } from 'react-native'
import { update as updateAction } from 'app_reducers/simulacrum/actions'
import { get as getDailyQuestionAction } from 'app_reducers/daily-question/actions'
import { Http, HttpCustomStructure } from 'app_utils/http'
import { store } from 'app_storage/redux-storage'
import { User } from 'app_reducers/auth/types'

export interface IListSimulacrumsParams {
  user: string,
  structure_id: string,
  level: any,
  programByUser: boolean,
  is_diagnostic: boolean,
  status: { $in: string[] }
}

export interface IFilterLevelsSimulacrumsParams {
  alliance_id?: string         // Identificador de la alianza
  user: string                 // Identificador del usuario
  structure_id?: string        // Identificador del programa
  user_only?: boolean          // Solo de los grupos donde pertenece el usuario
  programByUser?: boolean      // Obtener el programa del usuario y no de la structure_id que llega
  is_diagnostic?: boolean      // Obtener los diagnosticos o simulacros
}

class SimulacrumService {

  private alliance: any
  private storeObject: any
  private token: string
  private user: User

  constructor() {
    this.storeObject = store
    this.token = this.storeObject.getState().auth?.user?.token
    this.alliance = this.storeObject.getState().auth?.user?.alliance_id
    this.user = this.storeObject.getState().auth?.user
  }

  getSimulacrumsOrDiagnostics = async (_params?: IListSimulacrumsParams) => {
    let responseData: any
    const alliance_id = this.alliance


    const queryData: HttpCustomStructure = {
      method: 'POST',
      url: `/api/lms/simulacrums/${alliance_id}/fetch-simulacrums-academic-groups`,
      auth_token: this.token,
      params: _params,
    }
    // console.log('Params GET resource data: ', params);
    responseData = await Http.send(queryData)
    if (responseData.code === 200) {
      return responseData
    }
  }

  /**
 * @INFO Obtener el filtro para los simulacros
 * @param _params
 */
  public getFilterLevels = async (_params?: IFilterLevelsSimulacrumsParams) => {

    let responseData: any
    const alliance_id = _params?.alliance_id ? _params.alliance_id : this.alliance

    const queryData: HttpCustomStructure = {
      method: 'POST',
      url: `/api/lms/simulacrums/${alliance_id}/fetch-simulacrums-filter`,
      auth_token: this.token,
      params: _params,
    }
    responseData = await Http.send(queryData)
    if (responseData.code === 200) {
      return responseData
    }
  }

  getLivesAvailable = async (userId?: string, token?: string) => {

    const auth_token = token || this.token

    if(!auth_token) return

    const query_data: HttpCustomStructure = {
      method: 'GET',
      url: `/api/app-utilities/${userId || this.user._id}/attempts`,
      auth_token:auth_token,
      params: {},
    }

    const data = await Http.send(query_data)

    if (data.status === 'success') {
      return data
    }
  }

  lostLive = async () => {
    const query_data: HttpCustomStructure = {
      method: 'DELETE',
      url: `/api/app-utilities/${this.user._id}/attempt`,
      auth_token: this.token,
      params: {},
    }

    const data = await Http.send(query_data)

    if (data.status === 'success') {
      return data
    }
  }

  getDailyQuestion = async (token: string, dispatch: any, alliance_id : string, user : string) => {
    const query_data: HttpCustomStructure = {
      method: 'POST',
      url: `/api/question-of-the-day/${alliance_id}/fetch-question-of-the-day`,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      }),
      auth_token : token,
      params : {
        user,
        alliance_id
      }
    };

    const data = await Http.send(query_data);

    if (data.status === 'success') {
      dispatch(getDailyQuestionAction(data?.response))
      return data
    } else if (
      data.status === 'error' &&
      data.status_code === 'simulacrums_you_have_no_lives'
    ) {
      dispatch(getDailyQuestionAction(data))
      return data
    } else {
      Alert.alert('Error!', data.message)
    }
  }

  checkRecoverLives = async (token: string, dispatch: any) => {
    const query_data: HttpCustomStructure = {
      method: 'GET',
      url: '/api/simulacrums/check-recover-lives',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      }),
    }

    const data = await Http.send(query_data)

    if (data.status === 'success') {
      dispatch(
        updateAction({
          lives: data.lives,
          time: new Date(),
        }),
      );
      if (data.lives > 0) {
        this.getDailyQuestion(token, dispatch)
      }
    }
  }
}

export default SimulacrumService
