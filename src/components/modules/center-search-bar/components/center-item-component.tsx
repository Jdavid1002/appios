import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';
import styles from '../styles/styles';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';

class CenterItemComponent extends Component<any> {
  render() {
    const {school} = this.props;

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={this.props.handleSelectItem}>
        <CustomText style={styles.mainText}>{school?.school_name}</CustomText>
      </TouchableOpacity>
    );
  }
}

export default CenterItemComponent;
