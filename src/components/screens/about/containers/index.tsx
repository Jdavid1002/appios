import React from 'react';
import {ScrollView, Image} from 'react-native';
import {Text} from 'native-base';

import {styles} from './../index';

class About extends React.Component {
  render() {
    return (
      <ScrollView contentContainerStyle={[styles.container]}>
        <Image
          style={styles.logo}
          resizeMode="contain"
          source={require('assets/img/logo_registro.png')}
        />
        <Text style={[styles.text, {textAlign: 'justify'}]}>
          IQ.EDU.DO (Inteligencia Quisqueya) es una iniciativa de INICIA
          Educación, y desde el año 2014 funciona como herramienta de apoyo para
          los estudiantes de Secundaria en la preparación para las Pruebas
          Nacionales de la República Dominicana.
        </Text>
        <Image
          style={styles.kuepaLabel}
          resizeMode="contain"
          source={require('assets/img/menu_footer.png')}
        />
      </ScrollView>
    );
  }
}

export default About;
