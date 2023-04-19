import React from "react";
import { Thumbnail } from "native-base";
import { Text, View } from "react-native";
import { connect } from "react-redux";
import styles from '../styles/styles'

interface LayoutComponentProps {
  name?: string;
  user_data: any;
  width?: number;
  height?: number;
  color?: string;
}

const LayoutComponent: React.FC<LayoutComponentProps> = props => {

  const width = (props.width || 28)
  const height = (props.height || 28)

  const defaultGradientColors: string[] = [
    "#FD531E",
    "#B40056",
    "#172884",
    "#175807",
    "rgba(241,236,90,1)",
    "rgba(203,115,200,1)",
    "rgba(124,241,90,1)",
    "rgba(241,185,90,1)",
    "rgba(242,115,146,1)",
    "rgba(115,242,214,1)"
  ];

  const randomColor = Math.round(Math.random() * defaultGradientColors?.length - 1)
  const defaultAvatar = props?.name?.includes('default')
  const indexOfSeparator : number = props?.name?.indexOf("/") || 0
  const newName = props?.name?.slice(indexOfSeparator + 1, props?.name?.length).toLocaleUpperCase().replace(" ", "")

  if(defaultAvatar){
    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 4,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor : props?.color ? props?.color : defaultGradientColors[randomColor] || defaultGradientColors[0],
          borderRadius: 100,
          width : width,
          height : height,
          borderWidth : width / 20,
          borderColor : 'white'
        }}
      >
        <Text style={[
          {
            color: 'white',
            fontSize: width / 2,
            fontFamily: 'Helvetica',
          }
        ]}
        >
          {newName}
        </Text>
      </View>
    );
  }else{
    return(
      <Thumbnail
        style={[styles.avatar, {width : width, height : height}]}
        source={{
          uri: props?.user_data?.avatar,
        }}
        small
      />
    )
  }

};


function mapStatesToProps(state: any = {}) {
  return {
    user_data: state.auth.user.user_data,
  };
}
export default connect(mapStatesToProps)(LayoutComponent);
