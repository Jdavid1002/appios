import React, {Component} from 'react';
import {TextInput, FlatList, View, Text, ScrollView} from 'react-native';
import CenterItemComponent from '../../../../components/modules/center-search-bar/components/center-item-component';
import mainStyles from '../../../../styles/MainStyles';
import styles from '../styles/styles';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';
import ButtonRed from '../../../commons/buttons/components/button-red';

class CenterSearchBarComponent extends Component<any> {
  constructor(props: any) {
    super(props);
  }


  render() {
    const {text, message, selectedItem, showNotFound, items} = this.props;

    const deleteUndefinedTextInItems = items?.map((item : any) => {
      return {
        ...item,
        school_name : item?.school_name?.replaceAll("undefined,", "").replaceAll("undefined", ""),
        name : item?.name?.replaceAll("undefined", "") 
      }
    })



    return (
      <ScrollView>
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
          <View
            style={styles.listContainer}
          >
            {deleteUndefinedTextInItems?.map((item : any, idx : number)=> 
              <CenterItemComponent
                handleSelectItem={() => this.props.handleSelectItem(item)}
                school={item}
                key={idx}
              />
            )}
            {!message && deleteUndefinedTextInItems.length === 0 && (
              <CustomText style={styles.message}>
                No hay resultados que coincidan con la búsqueda
              </CustomText>
            )}
          </View>
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
      </ScrollView>
    );
  }
}

export default CenterSearchBarComponent;
