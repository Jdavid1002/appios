import {
  get as getStatisticsAction,
  update as updateStatisticsAction,
} from '../../reducers/statistics/actions';
import {Http, HttpCustomStructure} from '../../utils/http';
import {Alert} from 'react-native';

interface IFetchRankingGamification {
  user_id: string // Identificador del usuario
  alliance_id: string // Identificador de la allianza
  structure_id?: string // Identificador de la estructura
}


export interface IGetNationalityRanking {
  alliance_id : string
  auth_token : string
  query_params : IFetchRankingGamification
}

export interface IGetLocationRanking {
  alliance_id : string
  auth_token : string
  query_params : IFetchRankingGamification
}

export interface IGetFetchGamificationValuesAndTransformData {
  force_calculation?:boolean
  alliance_id: string
  auth_token: string
}

class StatisticsService {

  getNationalityRanking = async (_params : IGetNationalityRanking) => {

    const { alliance_id , auth_token , query_params} = _params;

    const query_data: HttpCustomStructure = {
      method: 'POST',
      url: `/api/gamification-user-statistics/${alliance_id}/ranking-nationality`,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth_token,
      }),
      params: query_params,
      auth_token: auth_token
    };


    const data = await Http.send(query_data);


    if (data?.code === 200) {
      return data
    } else {
      if(data?.message && !data?.message.includes('JSON')) Alert.alert('Error!', data.message);
    }
  }


  getLocationRanking = async (_params : IGetNationalityRanking) => {

    const { alliance_id , auth_token , query_params} = _params;

    const query_data: HttpCustomStructure = {
      method: 'POST',
      url: `/api/gamification-user-statistics/${alliance_id}/ranking-location`,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: auth_token,
      }),
      params: query_params,
      auth_token: auth_token
    };


    const data = await Http.send(query_data);

    if (data?.code === 200) {
      return data
    } else {
      if(data?.message && !data?.message.includes('JSON')) Alert.alert('Error!', data.message);
    }
  }

  getStatistics = async (token: string,alliance_id : string, dispatch: any, params : any) => {
    dispatch(getStatisticsAction('loading'));

    const query_data: HttpCustomStructure = {
      method: 'POST',
      url: `/api/gamification-user-statistics/${alliance_id}/fetch-gamification-activity`,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token,
      }),
      params: params,
      auth_token: token
    };

    const data = await Http.send(query_data);

    if(data?.status !== 'success') {
      if(data?.message && !data?.message.includes('JSON')) Alert.alert('Error!', data.message);
      return
    }

    const points = await this.getFetchGamificationValuesAndTransformData({
      // force_calculation: true,
      alliance_id: alliance_id,
      auth_token: token,
    })

    const categories = this.transformDataInformGamificationValues(data)

    const newStatistics = {
      categories : categories,
      status : 'success',
      ...points
    }

    dispatch(updateStatisticsAction(newStatistics));
  };

  getFetchGamificationValuesAndTransformData = async (params : IGetFetchGamificationValuesAndTransformData) => {

    const {auth_token, alliance_id, force_calculation} = params

    let newParams = {}

    if(force_calculation){
      newParams = {...newParams, force_calculation}
    }

    try {
      const query_data: HttpCustomStructure = {
        method: 'POST',
        url: `/api/gamification-user-statistics/${alliance_id}/fetch-values`,
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: auth_token,
        }),
        params: newParams,
        auth_token: auth_token
      };
      const data = await Http.send(query_data);
      
      if (data?.status === 'success') {
        const newStatistics = {
          total : data?.gamification_level?.value,
          range : {
            init : {
              name : data?.gamification_level?.info?.level_name,
              points : data?.gamification_level?.info?.from
            },
            end : {
              name : data?.next_gamification_level?.level_name || '',
              points : data?.gamification_level?.info?.to
            },
            percentage : ((data?.gamification_level?.value - data?.gamification_level?.info?.from) / data?.gamification_level?.info?.to) * 100
          },
        }

        return newStatistics
      } else {
        if(data?.message && !data?.message.includes('JSON')) Alert.alert(data.message);
      }
    } catch (error) {
      console.log(error)
    }
  };

  transformDataInformGamificationValues = (data : any) => {

    //@INFO Validacion de los logs de las categorias.
    if(!data?.logs?.length) return {}

     //@INFO Obtener los nombres de las categorias de cada log.
     const allFathersOfGamificationsNames = data?.logs?.map((_log : any) => {
      if(_log?.gamification_values?.length > 0){
        return _log?.gamification_values?.map((_gamification : any) => _gamification?.name)
      }else{
        return []
      }
    })

    let allGamificationNames : string[] = []

    //@INFO Agregar los nombres de las categorias de cada log a un array.
    for (const _fatherGamificationNames of allFathersOfGamificationsNames) {
      for (const gamificationName of _fatherGamificationNames) {
        allGamificationNames.push(gamificationName)
      }
    }

    //@INFO Eliminar nombres de categorias repetidos.
    const uniqueGamificationNames : any[] = [...new Set(allGamificationNames)];

    let categoriesByDataBase : any = {}

    //@INFO Crear objecto con los nombres y los points de cada categoria.
    uniqueGamificationNames.forEach((_name : any) => {
      categoriesByDataBase = {
        ...categoriesByDataBase,
        [_name] : {
          points : [],
          name : _name
        }
      }
    })

    //@INFO Agregar los points de cada categoria a su respectiva categoria.
    for (const _log of data?.logs) {
      const gamification_values = _log?.gamification_values
      for (const _gamification of gamification_values) {
        const currentCategorieList = categoriesByDataBase[_gamification?.name]?.points
        currentCategorieList.push(_gamification?.stats)
        categoriesByDataBase = {
          ...categoriesByDataBase,
          [_gamification?.name] : {
            points : currentCategorieList,
            name : _gamification?.description || _gamification?.name
          }
        }
      }
    }

    //@INFO Formatear los datos para que sean mas legibles.
    const formatCategories = Object.keys(categoriesByDataBase)?.map((_id : string) => {
      const item = categoriesByDataBase[_id]
      const totalPoints = item?.points?.map((point : any) => Number(point.value)).reduce((a : any, b : any) => a + b, 0)
      return {
        ...item,
        points : totalPoints
      }
    })

    return formatCategories
  };

}

export default StatisticsService;
