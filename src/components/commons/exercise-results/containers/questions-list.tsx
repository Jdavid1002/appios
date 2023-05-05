import React, {Component} from 'react';
import {View} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';

import {CustomText} from '../../../../components/commons/customs/components/customComponents';
import QuestionExplanation from '../../../../components/commons/question/containers/question-explanation';

import styles from '../styles/styles-modal-results';
import InlineWebview from '../../../screens/trivia/components/inlineWebview';

class ModalResults extends Component<any> {

  render() {
    return (
      <View>
        {this.props.dataResults?.slice(0, 10)?.map((item : any, idx : number) => 
        <View 
          key={idx}
        >
          <View
            style={[
              styles.acordionHeader,
              {backgroundColor: item?.answer?.is_correct === true ? '#e6ffd9' : '#ffd8d9'},
            ]}>
            <CustomText style={styles.acordionHeaderNumber}>
              {idx + 1}
            </CustomText>
            <View style={styles.acordionHeaderCenter}>
              <InlineWebview
                html={`${item.question.content.substring(0, 200)}...`}
                style={[styles.acordionHeaderText]}
              />
              <CustomText style={styles.acordionHeaderText}>
                {item?.answer?.is_correct === true ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    color={item?.answer?.is_correct === true ? '#8ec772' : '#e94044'}
                    size={16}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faTimes}
                    color={item?.answer?.is_correct === true ? '#8ec772' : '#e94044'}
                    size={16}
                  />
                )}
              </CustomText>
            </View>
          </View>
          <View
            style={[
              styles.acordionExplanation,
              {backgroundColor: item?.answer?.is_correct === true ? '#e6ffd9' : '#ffd8d9'},
            ]}>
            <CustomText
              style={[
                styles.acordionExplanationTitle,
                {color: item?.answer?.is_correct  === true ? '#7cb55f' : '#e94044'},
              ]}>
              {' '} Solución {' '}
            </CustomText>
            <QuestionExplanation
              explanation={item?.answer?.content}
              correct={item?.answer?.is_correct}
            />
          </View>
        </View>
        )}
      </View>
    );
  }
}

export default ModalResults;
