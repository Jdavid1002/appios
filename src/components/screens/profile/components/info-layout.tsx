import React from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {Thumbnail, Text, Button} from 'native-base';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import HowIFeel from 'app_components/commons/how-i-feel';

import {styles, ProfileEditModal} from 'app_components/screens/profile';
import AvatarComponent from 'app_components/commons/avatar';
import { connect } from 'react-redux';

const InfoLayout = (props: any) => {


  const convertGenderInNaturalLenguaje : any = {
    'male' : 'masculino',
    'female' : 'femenino'
  }

  return (
    <React.Fragment>
      <ScrollView
        contentContainerStyle={[styles.wrapper, {backgroundColor: '#061946'}]}>
        <AvatarComponent
          name={props?.user_data?.avatar}
          width={138}
          height={138}
          color={props?.user_data?.color}
        />
        {/* <Thumbnail source={{uri: props?.data?.avatar}} style={[styles.avatar]} /> */}

        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => props.setEditModalVisible(true)}>
          <View style={[styles.editButton]}>
            <FontAwesomeIcon icon={faEdit} size={20} color="#e94044" />
            <Text style={[styles.editButtonText]}>Editar</Text>
          </View>
        </TouchableOpacity>

        <View style={[styles.grid]}>
          {props?.data && props?.data?.fullname ? (
            <View style={[styles.row]}>
              <Text style={[styles.label]}>Nombre Completo</Text>
              <Text style={[styles.text]}>{props.data.fullname}</Text>
            </View>
          ) : null}

          {props?.data && props?.data?.email_address ? (
            <View style={[styles.row]}>
              <Text style={[styles.label]}>Correo electrónico / Usuario</Text>
              <Text style={[styles.text]}>{props.data.email_address}</Text>
            </View>
          ) :null}

          {props?.data && props?.data?.birthdate ? (
            <View style={[styles.row]}>
              <Text style={[styles.label]}>Fecha de nacimiento</Text>
              <Text style={[styles.text]}>{props.data.birthdate}</Text>
            </View>
          ) : null}

          <View style={[styles.row, styles.withCol]}>
            <View>
              <Text style={[styles.label]}>Teléfono</Text>
              <Text style={[styles.text]}>
                {props?.data?.phone && props?.data?.phone}
              </Text>
            </View>
            {props?.data && props?.data?.gender && (
              <View style={[styles.withColCell]}>
                <Text style={[styles.label]}>Género</Text>
                <Text style={[styles.text]}>{convertGenderInNaturalLenguaje[props.data.gender]}</Text>
              </View>
            )}
          </View>

        </View>

        <Button style={[styles.button]} onPress={props.doLogout} rounded block>
          <Text>Cerrar sesión</Text>
        </Button>

        <ProfileEditModal
          setVisible={props.setEditModalVisible}
          visible={props.editModalVisible}
        />
      </ScrollView>
      <HowIFeel screen="section_profile" />
    </React.Fragment>
  );
};


function mapStatesToProps(state: any = {}) {
  return {
    user_data: state.auth.user.user_data,
  };
}


export default connect(mapStatesToProps)(InfoLayout);
