import React from 'react';
import {View, Image, Text, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {faBars, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Profile} from '../../../../reducers/profile/types';

import styles from '../styles/styles';
import {StatusBar} from 'react-native';
import GeneralService from '../../../../services/general/general';
import AvatarComponent from '../../../../components/commons/avatar';

interface AppHeaderProps {
  navigation: any;
  title?: React.ReactNode;
  plain?: boolean;
  subtitle?: string;
  leftButton?: any;
  rightButton?: any;
  user_data: Profile;
  previous?: any;
  statistics: any;
}

const AppHeader = (props: AppHeaderProps) => {
  const generalService = new GeneralService();

  return (
    <View
      style={[
        styles.headerWrapper,
        !props.plain && styles.headerWrapperRounded,
      ]}>
      <View style={[styles.header]}>
        <StatusBar
          translucent={true}
          backgroundColor="#061946"
          barStyle="light-content"
        />

        <View style={[styles.left]}>
          {!props.leftButton && !props.previous && (
            <TouchableHighlight onPress={props.navigation.toggleDrawer}>
              <FontAwesomeIcon icon={faBars} color={'#24ABDF'} size={32} />
            </TouchableHighlight>
          )}

          {!props.leftButton && props.previous && (
            <TouchableHighlight onPress={props.navigation.goBack}>
              <FontAwesomeIcon icon={faArrowLeft} color={'#24ABDF'} size={32} />
            </TouchableHighlight>
          )}

          {props.leftButton && props.leftButton}
        </View>

        <View style={[styles.body]}>
          {typeof props.title === 'string' && (
            <Text style={[styles.textTitle]} numberOfLines={1}>
              {props.title}
            </Text>
          )}
          {typeof props.title === 'object' && props.title}
          {props.subtitle && (
            <Text style={[styles.textSubtitle]} numberOfLines={1}>
              {props.subtitle}
            </Text>
          )}
        </View>

        <View style={[styles.right]}>
          {!props.rightButton && (
            <View
              style={[
                {
                  alignItems: 'center',
                  flexDirection: 'column-reverse',
                },
              ]}>
              {props?.statistics &&
              props?.statistics?.hasOwnProperty('points') &&
              props?.statistics?.points.hasOwnProperty('total') &&
              props?.statistics?.points?.total ? (
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    resizeMode="contain"
                    style={{width: 12, height: 12, marginRight: 4}}
                    source={require('assets/img/brain_white_md.png')}
                  />
                  <Text style={[{color: 'white', fontSize: 12}]}>
                    {generalService?.formatNumber(
                      props?.statistics?.points?.total || 0,
                    )}
                  </Text>
                </View>
              ) : null}

              <TouchableHighlight
                onPress={() => props.navigation.navigate('Profile')}>
                <AvatarComponent
                  name={props?.user_data?.avatar}
                  color={props?.user_data?.color}
                />
              </TouchableHighlight>
            </View>
          )}
          {props.rightButton && props.rightButton}
        </View>
      </View>
    </View>
  );
};

function mapStatesToProps(state: any = {}) {
  return {
    user_data: state.auth.user.user_data,
    statistics: state.statistics.data,
  };
}

export default connect(mapStatesToProps)(AppHeader);
