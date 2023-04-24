import React, {Component} from 'react';
import {View, ScrollView, ActivityIndicator} from 'react-native';
import {Http, HttpCustomStructure} from '../../../../utils/http';
import {connect} from 'react-redux';

import mainStyles from '../../../../styles/MainStyles';
import {styles} from '../../../../components/modules/tips';

import {RunwayCard} from '../../../../components/modules/tips';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';

const renderItem = ({item}: any = {}) => <RunwayCard content={item} />;

function mapStatesToProps(state: any = {}) {
  return {
    auth_token: state.auth.user.token,
  };
}
class Runway extends Component<any, any> {
  state = {
    loading: true,
    activeIndex: 0,
    emptyDisplay: true,
    onPress: null,
    items: [],
  };
  carouselRef: any = null;

  componentDidMount = () => {
    if (this.props.hideEmptyDisplay) {
      this.setState({emptyDisplay: false});
    }
    if (this.props.onPress) {
      this.setState({onPress: this.props.onPress});
    }
    this.loadItems();
  };

  loadItems = async () => {
    this.setState({loading: true, items: [], activeIndex: 0});

    const query_data: HttpCustomStructure = {
      method: 'GET',
      url: '/api/tips/list',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.auth_token,
      }),
      params: {
        category: 'runway',
      },
    };

    const data = await Http.send(query_data);

    this.setState({loading: false});
    if (data.status === 'success') {
      if (data.tips.length > 0) {
        if (this.state.onPress) {
          let tips = data.tips.map((tip: any) => {
            tip.onPress = this.state.onPress;
            return tip;
          });
          this.setState({items: tips});
        } else {
          this.setState({items: data.tips});
        }
      }
    }
  };
  render = () => {
    if (this.state.loading) {
      return (
        <ScrollView style={[mainStyles.container]}>
          <ActivityIndicator size="large" color="#061946" />
        </ScrollView>
      );
    }

    if (this.state.items.length === 0) {
      if (this.state.emptyDisplay === true) {
        return (
          <View style={styles.emptyContainer}>
            <CustomText style={styles.emptyMessage}>
              Aún no hay noticias para mostrarte
            </CustomText>
          </View>
        );
      } else {
        return null;
      }
    }

    return (
      <View style={{marginHorizontal: 20}}>
        <Carousel
          ref={(c: any) => {
            this.carouselRef = c;
          }}
          data={this.state.items}
          renderItem={renderItem}
          sliderWidth={373}
          itemWidth={373}
          firstItem={0}
          loop={true}
          autoplay={true}
          autoplayDelay={500}
          autoplayInterval={3000}
          onSnapToItem={index => this.setState({activeIndex: index})}
        />
        <Pagination
          dotsLength={this.state.items.length}
          activeDotIndex={this.state.activeIndex}
          carouselRef={this.carouselRef}
          tappableDots={!!this.carouselRef}
        />
      </View>
    );
  };
}

export default connect(mapStatesToProps)(Runway);
