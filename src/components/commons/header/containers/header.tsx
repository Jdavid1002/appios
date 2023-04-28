import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {StatusBar} from 'react-native';
import {faBars, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Profile} from '../../../../reducers/profile/types';
import GeneralService from '../../../../services/general/general';
import AvatarComponent from '../../../../components/commons/avatar';
import styles from '../styles/styles';

interface AppHeaderProps {
  navigation: any;
  title?: React.ReactNode;
  plain?: boolean;
  leftButton?: any;
  rightButton?: any;
  user_data: Profile;
  previous?: any;
  statistics: any;
}

const AppHeader = (props: AppHeaderProps) => {
  const generalService = new GeneralService();

  const categories = props?.statistics?.categories;

  const getTotal = () => {

    if(!categories?.length) return 0

    const allPoints = categories?.map((categorie: any) => categorie?.points)

    if(!allPoints?.length) return 0

    return allPoints.reduce((a: any, b: any) => a + b, 0);
  }
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

        <View style={[styles.containerHeader]} >
          
          <View style={[styles.left]}>
            {!props.leftButton && !props.previous && (
              <TouchableOpacity 
                onPress={() => props.navigation.toggleDrawer()}
              >
                <Text>
                  <FontAwesomeIcon icon={faBars} color={'#24ABDF'} size={32} />
                </Text>
              </TouchableOpacity>
            )}

            {!props.leftButton && props.previous && (
              <TouchableOpacity 
                onPress={() => {
                  props.navigation.goBack()
                }}
              >
                <FontAwesomeIcon icon={faArrowLeft} color={'#24ABDF'} size={32} />
              </TouchableOpacity>
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
                {getTotal() ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginHorizontal: 4,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 5,
                    }}>
                    <Image
                      resizeMode="contain"
                      style={{width: 12, height: 12, marginRight: 4}}
                      source={require('assets/img/brain_white_md.png')}
                    />
                    <Text style={[{color: 'white', fontSize: 12}]}>
                      {generalService?.formatNumber(
                        getTotal()
                      )}
                    </Text>
                  </View>
                ) : null}

                <TouchableOpacity
                  onPress={() => props.navigation.navigate('Profile')}
                >
                  <AvatarComponent
                    name={props?.user_data?.avatar}
                    color={props?.user_data?.color}
                  />
                </TouchableOpacity>
              </View>
            )}
            {props.rightButton && props.rightButton}
          </View>

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
