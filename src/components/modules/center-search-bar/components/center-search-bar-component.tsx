import React, {Component} from 'react';
import {TextInput, FlatList, View} from 'react-native';
import CenterItemComponent from '../../../../components/modules/center-search-bar/components/center-item-component';
import mainStyles from '../../../../styles/MainStyles';
import styles from '../styles/styles';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';

class CenterSearchBarComponent extends Component<any> {
  constructor(props: any) {
    super(props);

    this.filterItems = this.filterItems.bind(this);
  }

  filterItems() {
    const {text} = this.props;

    return this.props.items.filter(
      (item: any) =>
        item.school_name.toLowerCase().indexOf(text.toLowerCase()) > -1,
    );
  }

  render() {
    const {text, message, selectedItem} = this.props;
    const filteredItems = this.filterItems();
    // filteredItems.push({school_name: '¿No encuentras tu centro?'});

    return (
      <View>
        <CustomText style={mainStyles.label}>Centro Educativo</CustomText>
        <TextInput
          placeholder="Centro Educativo"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          style={mainStyles.input}
          value={selectedItem ? selectedItem.school_name : text}
          onChangeText={this.props.handleTextChange}
          onFocus={this.props.changeSelectedItem}
        />

        {!selectedItem && (
          <>
            <FlatList
              data={filteredItems}
              renderItem={({item}) => (
                <CenterItemComponent
                  handleSelectItem={() => this.props.handleSelectItem(item)}
                  school={item}
                />
              )}
              style={styles.listContainer}
            />
            {!message && filteredItems.length === 0 && (
              <CustomText style={styles.message}>
                No hay resultados que coincidan con la búsqueda
              </CustomText>
            )}
          </>
        )}
      </View>
    );
  }
}

export default CenterSearchBarComponent;
