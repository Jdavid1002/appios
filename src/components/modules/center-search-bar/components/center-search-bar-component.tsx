import React, {Component} from 'react';
import {TextInput, FlatList, View, Text} from 'react-native';
import CenterItemComponent from '../../../../components/modules/center-search-bar/components/center-item-component';
import mainStyles from '../../../../styles/MainStyles';
import styles from '../styles/styles';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';
import ButtonRed from '../../../commons/buttons/components/button-red';

class CenterSearchBarComponent extends Component<any> {
  constructor(props: any) {
    super(props);

    this.filterItems = this.filterItems.bind(this);
  }

  filterItems() {
    const {text} = this.props;
    return this.props.items.filter((item: any) => item.school_name.toLowerCase().indexOf(text.toLowerCase()) > -1,);
  }

  render() {
    const {text, message, selectedItem, showNotFound} = this.props;
    const filteredItems = this.filterItems();
    const noFoundFind = this.props.items?.find((item : any) => item.name.includes("No encuentro mi centro educativo"))
    if(!filteredItems.find((item : any) => item?._id === noFoundFind?._id) && text?.length > 2) filteredItems.push(noFoundFind);

    const deleteUndefinedTextInItems = filteredItems?.map((item : any) => {
      return {
        ...item,
        school_name : item?.school_name?.replaceAll("undefined,", "").replaceAll("undefined", ""),
        name : item?.name?.replaceAll("undefined", "") 
      }
    })



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
              data={deleteUndefinedTextInItems}
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


        {showNotFound ? 
          <View>
            <CustomText style={mainStyles.label}> Ingresa el nombre de tu centro educativo* </CustomText>
            <TextInput
              placeholder="Escriba el nombre de su centro educativo..."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              style={mainStyles.input}
              value={this.props.state.headquarter_not_found_name}
              onChangeText={(text : string) => this?.props.updateTextNotFound('headquarter_not_found_name', text)}
            />

            <CustomText style={mainStyles.label}> Ingresa la localidad en donde te encuentras* </CustomText>
            <TextInput
              placeholder="Escriba el nombre de la localidad..."
              placeholderTextColor="rgba(255, 255, 255, 0.5)"
              style={mainStyles.input}
              value={this.props.state.location_not_found_name}
              onChangeText={(text : string) => this?.props.updateTextNotFound('location_not_found_name', text)}
            />

            <ButtonRed 
              textBtn="Confirmar" 
              disabled={!(this?.props?.state?.location_not_found_name?.trim()?.length && this.props?.state?.headquarter_not_found_name?.trim()?.length)}
              onPressBtn={() => {
                if(this?.props?.state?.location_not_found_name?.trim()?.length && this.props?.state?.headquarter_not_found_name?.trim()?.length){
                  this?.props?.handleButtonNotFound(this.props.state.selectedItem, true)
                }
              }} />
          </View>
        :null}
      </View>
    );
  }
}

export default CenterSearchBarComponent;
