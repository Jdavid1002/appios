import React from 'react';
import {View, Image} from 'react-native';
import {Text, Thumbnail, Button} from 'native-base';

import styles from './../styles';

import Separator from './separator';
import GeneralService from 'app_services/general/general';

const RankingLayout = (props: any) => {
  const generalService = new GeneralService();
  return (
    <View style={[styles.ranking]}>
      <Text style={[styles.text, styles.title, {color: props.color}]}>
        {props.title}
      </Text>
      {props.data.length > 0 &&
        props.data.map((rank: any, i: number) => {
          return typeof rank !== 'undefined' ? (
            <React.Fragment key={i}>
              {props.data.length > 4 && i === props.data.length - 2 && (
                <Separator color={props.color} />
              )}
              <View key={rank.id} style={[styles.rankItem]}>
                {/* <Thumbnail
                  style={[styles.avatar, {borderColor: props.color}]}
                  source={{uri: rank.avatar}}
                /> */}
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={[styles.text, styles.rankItemText]}>
                  {rank.position}. {rank.name}
                </Text>
                <View style={[styles.rankItemPoints]}>
                  <Image
                    style={{marginRight: 8}}
                    source={require('assets/img/brain.png')}
                  />
                  <Text style={[styles.text, {fontSize: 16, color: '#39b3e2'}]}>
                    = {generalService.formatNumber(rank.value)}
                  </Text>
                </View>
              </View>
            </React.Fragment>
          ) : null;
        })}

      <Button
        onPress={() => props.setShowMore(!props.showMore)}
        block
        transparent>
        <Text style={[styles.text, {color: '#f3c744', fontSize: 16}]}>
          {props.showMore && 'Ver menos'}
          {!props.showMore && 'Ver más'}
        </Text>
      </Button>
    </View>
  );
};

export default RankingLayout;
