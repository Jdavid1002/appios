import React, {Component} from 'react';
import {View} from 'react-native';

import {styles} from '../../../../components/modules/tips';

import {CustomText} from '../../../../components/commons/customs/components/customComponents';
import {Runway} from '../../../../components/modules/tips';

class TipsHomeCard extends Component<any, any> {
  handleGoToPage = () => {
    this.props.navigation.navigate('Tips');
  };
  render = () => {
    return (
      <View style={[styles.container, {marginHorizontal: -20}]}>
        <CustomText style={[styles.textTitle, {marginHorizontal: 20}]}>
          Tips
        </CustomText>
        <Runway onPress={this.handleGoToPage} />
      </View>
    );
  };
}

export default TipsHomeCard;
