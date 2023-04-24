import React, {Component} from 'react';
import {View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';

import {CustomText} from '../../../../components/commons/customs/components/customComponents';
import QuestionExplanation from '../../../../components/commons/question/containers/question-explanation';
import LessonCard from '../../../../components/commons/lesson/containers/lesson-card';

import GeneralService from '../../../../services/general/general';

import styles from '../styles/styles-modal-results';

class ModalResults extends Component<any> {
  _renderHeader = (item: any, expanded: boolean) => {
    //let text_question = strip_tags(item.title.replace(/<[^>]*>?/gm, '') + ' ' + item.description.replace(/<[^>]*>?/gm, ''));
    let txt = item.title + ' ' + item.description;
    const generalService = new GeneralService();
    let text_question = generalService.stripTags(txt);
    return (
      <View
        style={[
          styles.acordionHeader,
          {backgroundColor: item.correct === true ? '#e6ffd9' : '#ffd8d9'},
        ]}>
        <CustomText style={styles.acordionHeaderNumber}>
          {item.number}
        </CustomText>
        <View style={styles.acordionHeaderCenter}>
          <CustomText style={styles.acordionHeaderText}>
            {text_question.substring(0, 200)} ...
            {item.correct === true ? (
              <FontAwesomeIcon
                icon={faCheck}
                color={item.correct === true ? '#8ec772' : '#e94044'}
                size={16}
              />
            ) : (
              <FontAwesomeIcon
                icon={faTimes}
                color={item.correct === true ? '#8ec772' : '#e94044'}
                size={16}
              />
            )}
          </CustomText>
        </View>
        {expanded ? (
          <CustomText style={styles.acordionHeaderText}> ÷÷÷ </CustomText>
          // <Icon style={styles.acordionHeaderIcon} name="arrow-down" />
        ) : (
          <CustomText style={styles.acordionHeaderText}> ÷÷÷ </CustomText>
          // <Icon style={styles.acordionHeaderIcon} name="arrow-forward" />
        )}
      </View>
    );
  };

  _renderContent = (item: any) => {
    return (
      <>
        <View
          style={[
            styles.acordionExplanation,
            {backgroundColor: item.correct === true ? '#e6ffd9' : '#ffd8d9'},
          ]}>
          <CustomText
            style={[
              styles.acordionExplanationTitle,
              {color: item.correct === true ? '#7cb55f' : '#e94044'},
            ]}>
            {' '}
            Explicación{' '}
          </CustomText>
          <QuestionExplanation
            explanation={item.comment}
            correct={item.correct}
          />
        </View>
        {item.lesson && Object.keys(item.lesson).length > 0 ? (
          <LessonCard {...item.lesson} />
        ) : (
          <View />
        )}
      </>
    );
  };

  render() {
    return (
      <View> Accordion </View>
      // <Accordion
      //   style={styles.acordion}
      //   dataArray={this.props.dataResults}
      //   animation={true}
      //   expanded={true}
      //   renderHeader={this._renderHeader}
      //   renderContent={this._renderContent}
      // />
    );
  }
}

export default ModalResults;
