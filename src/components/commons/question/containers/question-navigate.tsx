import React, {Component} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {CustomText} from 'app_components/commons/customs/components/customComponents';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft, faChevronRight} from '@fortawesome/free-solid-svg-icons';

import styles from '../styles/style-question-navigate';

class QuestionNavigate extends Component<any> {
  render() {
    const disable_next =
      parseInt(this.props.currentItem) >= parseInt(this.props.totalItem) ||
      this.props.disableNext === true
        ? true
        : false;
    const disable_prev =
      parseInt(this.props.currentItem) <= 1 || this.props.disablePrev === true
        ? true
        : false;
    const colorText = this.props.colorText ? this.props.colorText : '#E94044';

    return (
      <View style={[styles.container, this.props.style]}>
        <TouchableOpacity
          disabled={disable_prev}
          onPress={this.props.onPressPrevItem}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            color={disable_prev ? 'gray' : colorText}
            size={26}
          />
        </TouchableOpacity>

        <CustomText style={[styles.text, {color: colorText}]}>
          {' '}
          {this.props.text} {this.props.currentItem} de {this.props.totalItem}{' '}
        </CustomText>

        <TouchableOpacity
          disabled={disable_next}
          onPress={this.props.onPressNextItem}>
          <FontAwesomeIcon
            icon={faChevronRight}
            color={disable_next ? 'gray' : colorText}
            size={26}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default QuestionNavigate;
