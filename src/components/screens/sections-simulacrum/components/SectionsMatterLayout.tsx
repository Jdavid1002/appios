import React, {useEffect, useState} from 'react';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';
import HowIFeel from '../../../../components/commons/how-i-feel/containers/how-i-feel';
import {FlatList, ScrollView} from 'react-native';
import {ISection} from '../containers/SectionsMatterContainer';

import mainStyles from '../../../../styles/MainStyles';
import styles from '../styles';
import SectionsSimulacrumCard from './SectionsMatterCard';

export interface ISectionsSimulacrumLayout {
  infoSections: ISection[];
  navigation: any;
  academicResourceData: any;
  SimulacrumId: string;
  getSectionsOfSimulacrum: () => void;
  getChallengesData: () => void;
}

export interface ItemWithOnPress extends ISection {
  handlePress: (item: ISection) => void;
  index: number;
  completed: boolean;
}

const SectionsSimulacrumLayout = (props: ISectionsSimulacrumLayout) => {
  const [ProgressBySection, setProgressBySection] = useState<any>({});

  useEffect(() => {
    calculateProgressSections();
  }, []);

  const handlePress = (section: ISection) => {
    props.navigation.navigate('SimulacrumQuestion', {
      SimulacrumId: props?.SimulacrumId,
      academicResourceData: props?.academicResourceData,
      section: section,
      getSectionsOfSimulacrum: props.getSectionsOfSimulacrum,
    });
  };

  const renderEmpty = () => (
    <CustomText> No hay secciones para mostrar </CustomText>
  );

  const renderItem = ({item}: any = {}) => {
    const index = props?.infoSections?.findIndex(
      (info: ISection) => info?._id === item?._id,
    );
    const completed = ProgressBySection[item?._id] >= 100 ? true : false;

    const ItemWithOnPress: ItemWithOnPress = {
      ...item,
      handlePress: completed ? () => null : handlePress,
      index: index + 1,
      completed,
    };
    return <SectionsSimulacrumCard {...ItemWithOnPress} />;
  };

  /**
   * @INFO Obtener la cantidad de preguntas de una sección
   * @param _section
   */
  const getQuestionsBankLength = (_section: any) => {
    if (
      _section &&
      _section.question_bank &&
      typeof _section.question_bank !== 'string'
    ) {
      const _aux = _section.question_bank.questions.filter(
        (_item: any) => _item.question_category.name !== 'container',
      );
      return _section.number_of_questions;
    }
    return 0;
  };

  const calculateProgressSections = () => {
    if (props.infoSections?.length) {
      let _auxProgress: any = {};
      props?.infoSections?.forEach(item => {
        const aux = getSectionProgress(item);
        _auxProgress = {
          ..._auxProgress,
          [item._id]: aux,
        };
      });
      setProgressBySection(_auxProgress);
    }
  };

  const getSectionProgress = (_section: any) => {
    if (!_section) {
      return 0;
    }

    let totalQuestions = getQuestionsBankLength(_section);
    const questions_of_section =
      props.academicResourceData.config.questionsByConfiguration[
        _section.uuid
      ].map((item: any) => item.toString());
    const statistics =
      props?.academicResourceData?.config?.attempt_active?.results
        ?.statistics || [];
    const totalAnswers = statistics.reduce((accum: number, item: any) => {
      if (
        questions_of_section?.length > 0 &&
        questions_of_section?.includes(item.question.toString())
      ) {
        accum += 1;
      }
      return accum;
    }, 0);
    if (questions_of_section?.length < totalQuestions) {
      totalQuestions = questions_of_section?.length;
    }
    const progress = (totalAnswers / totalQuestions) * 100;
    return progress ? progress : 0;
  };

  const keyExtractor = (item: ISection) => item?._id.toString();
  const itemSeparator = () => <CustomText />;

  return (
    <React.Fragment>
      <ScrollView>
        <CustomText style={[mainStyles.textCenter, styles.textTitle]}>
          Componentes del simulacro
        </CustomText>
        <FlatList
          keyExtractor={keyExtractor}
          data={props.infoSections}
          ListEmptyComponent={renderEmpty}
          ItemSeparatorComponent={itemSeparator}
          renderItem={renderItem}
        />
      </ScrollView>
      <HowIFeel screen="section_profile" />
    </React.Fragment>
  );
};

export default SectionsSimulacrumLayout;
