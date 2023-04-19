import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {CustomText} from 'app_components/commons/customs/components/customComponents';
import Answer from './answer';

class AnswerList extends Component<any> {
  renderEmpty = () => (
    <CustomText> No hay información para mostrar </CustomText>
  );
  renderItem = ({item}: any = {}) => (
    <Answer {...item} onPressAnswer={this.props.onPressAnswer} />
  );
  keyExtractor = (item: any = {}) => item.id.toString();
  itemSeparator = () => <CustomText />;

  render() {
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        data={this.props.dataAnswers}
        ListEmptyComponent={this.renderEmpty}
        ItemSeparatorComponent={this.itemSeparator}
        renderItem={this.renderItem}
        extraData={this.props}
      />
    );
  }
}

export default AnswerList;
