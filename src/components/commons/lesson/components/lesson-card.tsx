import React from 'react';
import {View, Image} from 'react-native';
import {CustomText} from 'app_components/commons/customs/components/customComponents';
import ButtonBlue from 'app_components/commons/buttons/components/button-blue';

function LessonCard(props: any) {
  const progress = props?.progress || 0;

  return (
    <View
      style={{
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        flex: 1,
      }}
      >
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 0.3, paddingHorizontal: 20, paddingVertical: 20}}>
          <Image
            style={{width: 81, height: 81, borderRadius: 50}}
            source={{uri: props.config?.thumbnail || ''}}
          />
        </View>
        <View style={{flex: 0.7, paddingHorizontal: 20, paddingVertical: 20}}>
          <View style={{borderBottomColor: '#C0C1C3', borderBottomWidth: 2}}>
            <CustomText
              style={{color: '#061946', fontSize: 16, fontWeight: '800'}}>
              {props.name ? props.name : ''}
            </CustomText>
          </View>
          <CustomText style={{color: '#8ec772', fontSize: 14, marginTop: 10}}>
            Progreso de la lección {progress ? progress : '0'} %{' '}
          </CustomText>
          <View
            style={{
              width: '90%',
              height: 10,
              borderRadius: 10,
              marginBottom: 8,
              backgroundColor: '#8ec7724D',
            }}>
            <View
              style={[
                {height: 10, borderRadius: 10},
                {backgroundColor: '#8ec772', width: `${progress}%`},
              ]}
            />
          </View>
        </View>
      </View>
      <ButtonBlue
        style={{marginBottom: 15, marginTop: 0, marginHorizontal: 25}}
        fontStyle={{fontSize: 15, paddingVertical: 0}}
        textBtn={props.textBtn ? props.textBtn : 'Continuar Lección'}
        onPressBtn={props.onPress}
      />
    </View>
  );
}

export default LessonCard;
