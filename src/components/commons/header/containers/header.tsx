import React from 'react';
import {View, Image} from 'react-native';
import {connect} from 'react-redux';
import {
  Header,
  Left,
  Body,
  Right,
  Subtitle,
  Button,
  Text,
} from 'native-base';
import {faBars, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Profile} from 'app_reducers/profile/types';

import styles from '../styles/styles';
import {StatusBar} from 'react-native';
import GeneralService from 'app_services/general/general';
import AvatarComponent from 'app_components/commons/avatar';
// import {CustomText} from 'app_components/commons/customs/components/customComponents';

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
      <Header
        style={[styles.header]}
        androidStatusBarColor="#061946"
        transparent>
        <StatusBar
          translucent={true}
          backgroundColor="#061946"
          barStyle="light-content"
        />

        <Left style={[styles.left]}>
          {!props.leftButton && !props.previous && (
            <Button onPress={props.navigation.toggleDrawer} transparent>
              <FontAwesomeIcon icon={faBars} color={'#24ABDF'} size={32} />
            </Button>
          )}

          {!props.leftButton && props.previous && (
            <Button onPress={props.navigation.goBack} transparent>
              <FontAwesomeIcon icon={faArrowLeft} color={'#24ABDF'} size={32} />
            </Button>
          )}

          {props.leftButton && props.leftButton}
        </Left>

        <Body style={[styles.body]}>
          {typeof props.title === 'string' && (
            <Text style={[styles.textTitle]} numberOfLines={1}>
              {props.title}
            </Text>
          )}
          {typeof props.title === 'object' && props.title}
          {props.subtitle && (
            <Subtitle>
              <Text style={[styles.textSubtitle]} numberOfLines={1}>
                {props.subtitle}
              </Text>
            </Subtitle>
          )}
        </Body>

        <Right style={[styles.right]}>
          {!props.rightButton && (
            <View
              style={[
                {
                  alignItems: 'center',
                  flexDirection: 'column-reverse',
                },
              ]}>
              {props?.statistics && props?.statistics?.hasOwnProperty('points') && props?.statistics?.points.hasOwnProperty('total') && props?.statistics?.points?.total ?
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
                      {generalService?.formatNumber(props?.statistics?.points?.total || 0)}
                    </Text>
                </View>
              : null}

              <Button
                onPress={() => props.navigation.navigate('Profile')}
                transparent
              >
                <AvatarComponent
                  name={props?.user_data?.avatar}
                  color={props?.user_data?.color}
                />
              </Button>
            </View>
          )}
          {props.rightButton && props.rightButton}
        </Right>
      </Header>
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

// class Header extends Component<any> {
//   render() {
//     return (
//       <SafeAreaView style={styles.wraper}>
//         <StatusBar
//           translucent={true}
//           backgroundColor="#061946"
//           barStyle="light-content"
//         />
//         <View style={[styles.container, this.props.style]}>
//           <TouchableOpacity
//             onPress={this.props.onPressIcon}
//             style={styles.headerElementsWidth}>
//             {this.props.leftIcon}
//           </TouchableOpacity>

//           {this.props.children}

//           <View style={[styles.headerProfileInfo, styles.headerElementsWidth]}>
//             <Image
//               style={styles.profileImage}
//               source={require('assets/img/logo_iq.png')}
//             />

//             <View style={styles.brainInfo}>
//               <Image
//                 source={require('assets/img/brain.png')}
//                 resizeMode="contain"
//               />
//               <CustomText style={styles.brainText}>12.500</CustomText>
//             </View>
//           </View>
//         </View>
//       </SafeAreaView>
//     );
//   }
// }

// export default Header;
