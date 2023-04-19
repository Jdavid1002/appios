import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import styles from '../styles/styles';
import { CustomText } from 'app_components/commons/customs/components/customComponents';

class CenterItemComponent extends Component <any> {

  render() {

    const { school } = this.props;

    return (

      <TouchableOpacity
        style={styles.item}
        onPress={this.props.handleSelectItem}
      >
        <CustomText style={styles.mainText}>{school.school_name}</CustomText>
        {/* <CustomText style={styles.subText}>{school.district_name}, {school.tanda}</CustomText> */}
      </TouchableOpacity>

    );
  }
}

export default CenterItemComponent;
