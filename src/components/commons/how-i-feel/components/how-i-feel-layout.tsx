import React from 'react';
import {
  View,
  Image,
  Modal,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableHighlight,
} from 'react-native';
// import {Fab, Icon} from 'native-base';
import styles from './../styles';

const HowIFeelLayout = (props: any) => {
  return (
    <React.Fragment>
      {/* <Fab
        containerStyle={styles.fabButtonContainer}
        style={[styles.fabButton]}
        position="bottomRight"
        onPress={() => props.setModalVisibility(!props.modalVisibility)}>
        <Image
          source={require('assets/img/how-i-feel/love.png')}
          resizeMode="contain"
        />
      </Fab> */}
      <Modal
        animationType="fade"
        visible={props.modalVisibility}
        transparent={true}>
        <ScrollView contentContainerStyle={[styles.modalContainer]}>
          <TouchableWithoutFeedback
            onPress={() => props.setModalVisibility(false)}>
            <View style={[{flex: 1, flexGrow: 1, backgroundColor: 'white'}]} />
          </TouchableWithoutFeedback>
          {props.modalTab === 0 && (
            <View style={[styles.modalBottomWrapper]}>
              <Text style={[styles.modalBottomWrapperTitle]}>
                ¿Cómo te sientes?
              </Text>
              <View
                style={[
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                {props.emojis.map((emoji: any) => (
                  <TouchableHighlight
                    key={emoji.value}
                    onPress={() => props.next('question_one', emoji.value)}>
                    <Image source={emoji.image} />
                  </TouchableHighlight>
                ))}
              </View>
              <View style={[styles.modalContainerTriangle]} />
            </View>
          )}
          {props.modalTab === 1 && (
            <View style={[styles.modalBottomWrapper]}>
              <Text
                style={[styles.modalBottomWrapperTitle, {color: '#e94044'}]}>
                ¿Qué estás haciendo?
              </Text>
              <View
                style={[
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <View
                  style={[
                    {
                      width: '100%',
                      maxWidth: 400,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                    },
                  ]}>
                  {props.activities.map((activity: any) => (
                    <TouchableOpacity
                      key={activity.value}
                      onPress={() =>
                        props.next('question_two', activity.value)
                      }>
                      <View
                        style={[
                          {
                            width: 80,
                            marginBottom: 16,
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                          },
                        ]}>
                        <View
                          style={[
                            {
                              borderWidth: 2,
                              borderColor: '#061946',
                              borderRadius: 30,
                              padding: 5,
                            },
                          ]}>
                          <Image
                            resizeMode="contain"
                            source={activity.image}
                            style={[
                              {
                                width: 40,
                                height: 40,
                              },
                            ]}
                          />
                        </View>
                        {activity.text && (
                          <Text
                            numberOfLines={2}
                            ellipsizeMode="tail"
                            style={[
                              {
                                fontSize: 12,
                                color: '#061946',
                                textAlign: 'center',
                                fontFamily: 'Nunito-Bold',
                              },
                            ]}>
                            {activity.text}
                          </Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View style={[styles.modalContainerTriangle]} />
            </View>
          )}
          {props.modalTab === 2 && props.status === 'loading' && (
            <View style={[styles.modalBottomWrapper]}>
              <Text
                style={[styles.modalBottomWrapperTitle, {color: '#e94044'}]}>
                Enviando...
              </Text>
              <ActivityIndicator />
              <View style={[styles.modalContainerTriangle]} />
            </View>
          )}
        </ScrollView>
        {/* <Fab
          containerStyle={styles.fabButtonContainer}
          style={[styles.fabButton]}
          position="bottomRight"
          onPress={() => props.onCloseModal()}>
          <Icon name="close" />
        </Fab> */}
      </Modal>
    </React.Fragment>
  );
};

export default HowIFeelLayout;
