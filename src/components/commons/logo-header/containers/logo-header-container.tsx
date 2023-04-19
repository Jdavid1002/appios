import React, {Component} from 'react';
// import styles from '../styles/styles';

// import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
// import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Box, HStack, StatusBar, Text} from 'native-base';
import { TextBase } from 'react-native';



const LogoHeaderContainer = () => {
  return (
    <>
      {/* <StatusBar barStyle="light-content" />
      <Box safeAreaTop bg="violet.600" /> */}
      {/* <HStack
        bg="violet.800"
        px="1"
        py="3"
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        maxW="350">
        <HStack alignItems="center">
          <Text color="white" fontSize="20" fontWeight="bold">
            Home
          </Text>
        </HStack>
        <HStack />
      </HStack> */}
      <TextBase> Hola </TextBase>
    </>
  );
}


export default LogoHeaderContainer;
// class LogoHeaderContainer extends Component<any> {
//   render() {


//     // return (
//     //   <Header
//     //     style={styles.container}
//     //     androidStatusBarColor="#061946"
//     //     transparent>
//     //     <StatusBar
//     //       translucent={true}
//     //       backgroundColor="#061946"
//     //       barStyle="light-content"
//     //     />
//     //     <Left>
//     //       {typeof this.props.navigation !== 'undefined' ? (
//     //         <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
//     //           <FontAwesomeIcon icon={faArrowLeft} color={'#24ABDF'} size={32} />
//     //         </TouchableOpacity>
//     //       ) : (
//     //         <TouchableOpacity />
//     //       )}
//     //     </Left>
//     //     <Body style={styles.logo}>
//     //       <Image source={require('assets/img/logo_registro.png')} />
//     //     </Body>
//     //     <Right />
//     //   </Header>
//     // );
//   }
// }

// export default LogoHeaderContainer;
