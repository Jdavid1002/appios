import React, { useEffect, useState } from 'react';
import { CustomText } from 'app_components/commons/customs/components/customComponents';
import HowIFeel from 'app_components/commons/how-i-feel/containers/how-i-feel';
import { FlatList, ScrollView } from 'react-native';
import { ISection } from '../containers/SectionsMatterContainer';

import mainStyles from 'app_styles/MainStyles';
import styles from '../styles';
import SectionsMatterCard from './SectionsMatterCard';
import { useDispatch } from 'react-redux';
import ButtonBlue from 'app_components/commons/buttons/components/button-blue';
import { Http, HttpCustomStructure } from 'app_utils/http';
import { store } from 'app_storage/redux-storage';

export interface ISectionsMatterLayout {
  infoSections: ISection[];
  navigation: any
  academicResourceData: any
  matterId: string
  getSectionsOfMatter: () => void
  getChallengesData: () => void
  isSimulacrum?: boolean
}

export interface ItemWithOnPress extends ISection {
  handlePress: (item: ISection) => void
  index: number
  completed: boolean
  disabled: boolean
}

const SectionsMatterLayout = (props: ISectionsMatterLayout) => {

  const [ProgressBySection, setProgressBySection] = useState<any>({})
  const [completedSections, setCompletedSections] = useState<any>({})
  const dispatch = useDispatch()

  useEffect(() => {
    calculateProgressSections()

    const unsubscribe = props.navigation.addListener('focus', async () => {
      props.getSectionsOfMatter()
    });

    return unsubscribe;

  }, [props])

  const handlePress = (section: ISection) => {

    props.isSimulacrum ?
      props.navigation.navigate('SimulacrumQuestion', {
        SimulacrumId: props?.matterId,
        academicResourceData: props?.academicResourceData,
        section: section,
        getSectionsOfSimulacrum: props.getSectionsOfMatter,
        dispatch: dispatch
      })
      :
      props.navigation.navigate('ChallengeQuestion', {
        matterId: props?.matterId,
        academicResourceData: props?.academicResourceData,
        section: section,
        getSectionsOfMatter: props.getSectionsOfMatter,
        getChallengesData: props.getChallengesData
      });
  };

  const renderEmpty = () => (
    <CustomText> No hay secciones para mostrar </CustomText>
  );

  const renderItem = ({ item }: any = {}) => {
    const index = props?.infoSections?.findIndex((info: ISection) => info?._id === item?._id)
    const completedIndexes = Object.keys(completedSections)
    const disabled = completedIndexes.find((sectionNumber) => Number(index) - 1 === Number(sectionNumber)) !== undefined || Number(index) === 0 ? false : true
    const completed = ProgressBySection[item?._id] > 99 ? true : false
    const ItemWithOnPress: ItemWithOnPress = {
      ...item,
      handlePress: completed || (disabled && props.isSimulacrum) ? () => null : handlePress,
      index: index + 1,
      completed,
      disabled
    }
    return <SectionsMatterCard {...ItemWithOnPress} />
  };

  /**
* @INFO Obtener la cantidad de preguntas de una sección
* @param _section
*/
  const getQuestionsBankLength = (_section: any) => {
    if (_section && _section.question_bank && typeof _section.question_bank !== 'string') {
      const _aux = _section.question_bank.questions.filter((_item: any) => _item.question_category.name !== 'container')
      return _section.number_of_questions
    }
    return 0
  }

  const calculateProgressSections = () => {
    if (props?.infoSections?.length) {
      let _auxProgress: any = {}
      let completedSectionsData: any = {}
      props?.infoSections?.forEach((item, index) => {
        const aux = getSectionProgress(item)
        if (aux > 99) {
          completedSectionsData = {
            ...completedSectionsData,
            [index]: item._id
          }
        }
        _auxProgress = {
          ..._auxProgress,
          [item._id]: aux
        }
      })
      setCompletedSections(completedSectionsData)
      setProgressBySection(_auxProgress)
    }
  }

  const getSectionProgress = (_section: any) => {
    if (!_section) return 0
    let totalQuestions = getQuestionsBankLength(_section)
    const questions_of_section = props.academicResourceData.config.questionsByConfiguration[_section.uuid]
    const statistics = props?.academicResourceData?.config?.attempt_active?.results?.statistics || []
    const totalAnswers = statistics.reduce((accum: number, item: any) => {
      if (questions_of_section?.length > 0 && questions_of_section?.includes(item.question.toString())) {
        accum += 1
      }
      return accum
    }, 0)
    if (questions_of_section?.length < totalQuestions) totalQuestions = questions_of_section?.length
    const progress = (totalAnswers / totalQuestions) * 100
    return progress ? progress : 0
  }

  const keyExtractor = (item: ISection) => item?._id.toString();
  const itemSeparator = () => <CustomText />;

  const handlePressButtonSend = async () => {

    const params = {
      results: props.academicResourceData?.results,
      deliverable_date: (new Date()),
      qualify: true,
      academic_resource_config: props.academicResourceData?.academic_resource_config,
      user: store.getState().auth.user?._id,
    }

    const alliance = store.getState().auth.user?.alliance_id

    const query_data: HttpCustomStructure = {
      method: 'POST',
      url: `/api/academic-resource-attempt/${alliance}/attempt`,
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: store.getState().auth.user?.token || '',
      }),
      params: params,
      auth_token: store.getState().auth.user?.token
    };


    const data = await Http.send(query_data);
    if (data.status === 'success') {
      props.navigation.navigate('SimulacrumScore', {
        score: Math.round(data.attempt.results.score),
        approve: data.attempt.results.score > 50
      })
    }
  }

  return (
    <React.Fragment>
      <ScrollView>
        <CustomText style={[mainStyles.textCenter, styles.textTitle]}>
          Componentes del {props.isSimulacrum ? 'simulacro' : 'diagnostico'}
        </CustomText>
        <FlatList
          keyExtractor={keyExtractor}
          data={props.infoSections}
          ListEmptyComponent={renderEmpty}
          ItemSeparatorComponent={itemSeparator}
          renderItem={renderItem}
        />
        {props.isSimulacrum && props.infoSections.length === Object.keys(completedSections).length ?
          <ButtonBlue
            textBtn="Finalizar simulacro"
            onPressBtn={handlePressButtonSend}
          />
          : null}
      </ScrollView>
      <HowIFeel screen="section_profile" />
    </React.Fragment>
  );
};

export default SectionsMatterLayout;
