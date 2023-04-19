import React from 'react';
import {View} from 'react-native';
import styles from '../styles';
import {CustomText} from 'app_components/commons/customs/components/customComponents';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ItemWithOnPress} from './SectionsMatterLayout';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import SvgComponent from './SVGForm';

const SectionsSimulacrumCard = (props: ItemWithOnPress) => {

  return (
    <TouchableOpacity
      onPress={() => props.handlePress(props)}
    >
      <View style={styles.containerRight}>
      {props.completed &&
        <View style={styles.checkIconContainer}>
          <FontAwesomeIcon
            icon={faCheck}
            color={'#18DA6A'}
            size={10}
          />
        </View>
      }

        <SvgComponent number={props?.index} color={props.completed ? props?.color : "#CFD1D6"} />

        <View style={styles.containerText}>
          <CustomText style={styles.textInfo}>{props.label?.length > 24 ? `${props.label?.slice(0,24)}...` : props.label }</CustomText>
          <CustomText style={styles.questionsInfo}>
            {props.number_of_questions} Preguntas
          </CustomText>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SectionsSimulacrumCard;
