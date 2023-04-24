import React, {Component, Fragment} from 'react';
import {View, FlatList, ScrollView, ActivityIndicator} from 'react-native';
import HowIFeel from '../../../../components/commons/how-i-feel';
import {connect} from 'react-redux';
import mainStyles from '../../../../styles/MainStyles';
import {Runway, TipCard, styles} from '../../../../components/modules/tips';

import {Http, HttpCustomStructure} from '../../../../utils/http';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';

function mapStatesToProps(state: any = {}) {
  return {
    auth_token: state.auth.user.token,
  };
}

class TipsScreen extends Component<any, any> {
  state = {
    loading: true,
    news: [],
  };

  componentDidMount = () => {
    this.loadItems();
  };

  loadItems = async () => {
    this.setState({loading: true, news: []});

    const query_data: HttpCustomStructure = {
      method: 'GET',
      url: '/api/tips/list',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: this.props.auth_token,
      }),
      params: {
        ignore: 'runway',
      },
    };

    const data = await Http.send(query_data);

    this.setState({loading: false});
    if (data.status === 'success') {
      if (data.tips.length > 0) {
        this.setState({news: data.tips});
      }
    }
  };

  handleGoToTip = (tip: any) => {
    this.props.navigation.navigate('Tip', {tip});
  };

  render = () => {
    if (this.state.loading) {
      return (
        <ScrollView style={[mainStyles.container]}>
          <ActivityIndicator size="large" color="#061946" />
        </ScrollView>
      );
    }

    return (
      <Fragment>
        <ScrollView style={[mainStyles.container]}>
          <View style={{marginHorizontal: -20}}>
            <Runway hideEmptyDisplay={true} />
          </View>

          {this.state.news.length === 0 ? (
            <View style={styles.emptyContainer}>
              <CustomText style={styles.emptyMessage}>
                Aún no hay noticias para mostrarte
              </CustomText>
            </View>
          ) : (
            <View style={{marginBottom: 40}}>
              <FlatList
                data={this.state.news}
                renderItem={({item}) => (
                  <TipCard
                    content={item}
                    onPress={() => this.handleGoToTip(item)}
                  />
                )}
                numColumns={2}
              />
            </View>
          )}
        </ScrollView>
        <HowIFeel screen="section_tips_page" />
      </Fragment>
    );
  };
}

export default connect(mapStatesToProps)(TipsScreen);
