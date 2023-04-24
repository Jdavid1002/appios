import React from 'react';
import {View, Image, Text} from 'react-native';
import {styles} from '../../../../components/screens/profile';
import GeneralService from '../../../../services/general/general';
import {connect} from 'react-redux';

const StatisticsTopSection = (props: any) => {
  const generalService = new GeneralService();
  const categories = props?.statistics?.categories;
  const total = categories
    ?.map((categorie: any) => categorie?.points)
    .reduce((a: any, b: any) => a + b, 0);

  return (
    <View style={[styles.topSection]}>
      <View style={[styles.progressBarWrapper]}>
        <View
          style={[
            styles.progressBar,
            {width: `${props.statistics?.range?.percentage}%`},
          ]}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
        <View>
          <Text style={[styles.text, {fontSize: 16}]}>
            {props?.statistics?.range?.init?.name}
          </Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={[styles.text, {fontSize: 16}]}>
            {props.statistics?.range?.end?.name}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{marginRight: 8}}
              source={require('assets/img/brain_white.png')}
            />
            {props?.statistics?.range?.end?.points ? (
              <Text style={[styles.text, {fontSize: 16}]}>
                ={' '}
                {generalService.formatNumber(
                  props?.statistics?.range?.end?.points,
                )}
              </Text>
            ) : null}
          </View>
        </View>
      </View>

      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flexGrow: 2,
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: 12,
            flex: 1,
          }}>
          {Object.keys(categories).length === 0 && (
            <Text
              style={[styles.text, {fontSize: 24, fontFamily: 'Nunito-Bold'}]}>
              Aún no has acumulado puntos
            </Text>
          )}
          {Object.keys(categories).map((category: any) => {
            if (categories[category]?.name) {
              return (
                <View
                  key={categories[category].name}
                  style={{width: '100%', marginBottom: 12}}>
                  <Text style={{color: '#f3c744', marginBottom: 8}}>
                    {categories[category].name}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      style={{marginRight: 8}}
                      source={require('assets/img/brain_white_md.png')}
                    />
                    <Text
                      style={[
                        styles.text,
                        {fontSize: 24, fontFamily: 'Nunito-Bold'},
                      ]}>
                      ={' '}
                      {generalService.formatNumber(categories[category].points)}
                    </Text>
                  </View>
                </View>
              );
            } else {
              return null;
            }
          })}
        </View>

        <View
          style={{
            flex: 1,
            flexGrow: 2,
            backgroundColor: '#f3c744',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            borderRadius: 15,
            marginRight: -20,
            paddingVertical: 50,
          }}>
          <Image
            style={{marginBottom: 12}}
            source={require('assets/img/brain_lg.png')}
          />
          <Text style={[styles.text, {color: '#061946'}]}>Total:</Text>
          <Text style={[styles.text, {color: '#061946', fontSize: 48}]}>
            {generalService.formatNumber(total)}
          </Text>
        </View>
      </View>
    </View>
  );
};

function mapStatesToProps(state: any = {}) {
  return {
    auth_token: state?.auth?.user?.token,
    alliance_id: state?.auth?.user?.alliance_id,
    user_data: state.auth.user.user_data,
  };
}
export default connect(mapStatesToProps)(StatisticsTopSection);
