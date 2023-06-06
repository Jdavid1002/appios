import React, {Component} from 'react';
import CenterSearchBarComponent from '../../../../components/modules/center-search-bar/components/center-search-bar-component';
import {SafeAreaView, View, TouchableOpacity} from 'react-native';
import {Http, HttpCustomStructure} from '../../../../utils/http';
import styles from '../styles/styles';
import mainStyles from '../../../../styles/MainStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {CustomText} from '../../../../components/commons/customs/components/customComponents';

class CenterSearchBarContainer extends Component<any> {
  state = {
    selectedItem: null,
    message: 'Ingrese por lo menos 3 caracteres',
    text: '',
    items: [],
    addCenter: false,
    showNotFound : false,
    headquarter_not_found_name : '',
    location_not_found_name : '',
  };

  constructor(props: any) {
    super(props);

    this.state = {
      selectedItem: null,
      message: 'Ingrese su busqueda',
      text: '',
      items: [],
      addCenter: false,
      showNotFound : false,
      headquarter_not_found_name : '',
      location_not_found_name : '',
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.changeSelectedItem = this.changeSelectedItem.bind(this);
  }

  handleSelectItem(item: any, isButtonNotFound ? : boolean) {
    const isNotFound = item.name.includes("No encuentro mi centro educativo")

    if(isNotFound && !isButtonNotFound){
      this.setState({showNotFound: true, selectedItem: item})
      return
    }

    this.setState({selectedItem: item});
    this.props.onSubmit(item, {
      headquarter_not_found_name : this.state.headquarter_not_found_name,
      location_not_found_name : this.state.location_not_found_name,
    });
  }

  changeSelectedItem() {
    this.setState({
      showNotFound : false,
      selectedItem: null,
      message: 'Ingrese su busqueda',
      text: '',
      items: [],
      addCenter: false,
    });
  }

  async getCenterNotFoundItem () {
    // Fetch.
    const query_data: HttpCustomStructure = {
      method: 'GET',
      url: `/api/alliance/iq-secundaria/headquarter/external-list?search=No encuentro mi centro educativo&pageNumber=1&nPerPage=15&select=name+localization+slug`,
    };

    const data = await Http.send(query_data);

    const centers = data?.headquarters?.map((item: any) => {
      return {
        school_name:
          item?.name +
            ',  ' +
            item?.localization?.regional +
            ',  ' +
            item?.localization?.district || '',
        ...item,
      };
    });
    const noFoundFind = centers?.find((item : any) => item?.name?.includes("No encuentro mi centro educativo"))

    return noFoundFind
  }

  async handleTextChange(text: string) {

    if(!text?.length && !this.state.showNotFound) return this.changeSelectedItem()

    this.setState({
      message: 'Buscando...',
      text
    });

    // Fetch.
    const query_data: HttpCustomStructure = {
      method: 'GET',
      url: `/api/alliance/iq-secundaria/headquarter/external-list?search=${text}&pageNumber=1&nPerPage=15&select=name+localization+slug`,
    };

    const data = await Http.send(query_data);

    if (data.status === 'success') {
      const centers = data?.headquarters?.map((item: any) => {
        return {
          school_name:
            item?.name +
              ',  ' +
              item?.localization?.regional +
              ',  ' +
              item?.localization?.district || '',
          ...item,
        };
      });

      const noFoundFind = centers?.find((item : any) => item?.name?.includes("No encuentro mi centro educativo")) || await this.getCenterNotFoundItem()

      
      if(!centers.find((item : any) => item?._id === noFoundFind?._id)) centers.unshift(noFoundFind)

      this.setState({
        items: centers,
        message:
          centers?.length > 0
            ? ''
            : 'No hay resultados que coincidan con la búsqueda',
        addCenter: true,
      });

    } else {
      if(data?.message && !data?.message.includes('JSON')) alert(data?.message && !data?.message.includes('JSON'));
    }
  }

  updateTextNotFound = (name : string, value : string) => {
    this?.setState({
      ...this?.state,
      [name] : value
    })
  }

  render() {
    const {items, message, text, selectedItem} = this.state;

    return (
      <SafeAreaView style={[styles.container, mainStyles.formContainer]}>
        <TouchableOpacity
          onPress={this.props.onSubmit}
          style={{marginBottom: 15}}>
          <FontAwesomeIcon icon={faChevronLeft} color={'#E94044'} size={26} />
        </TouchableOpacity>

        <CenterSearchBarComponent
          items={items}
          text={text}
          message={message}
          selectedItem={selectedItem}
          handleTextChange={this.handleTextChange}
          handleSelectItem={this.handleSelectItem}
          changeSelectedItem={this.changeSelectedItem}
          showNotFound={this.state.showNotFound}
          updateTextNotFound={this.updateTextNotFound}
          handleButtonNotFound={this.handleSelectItem}
          state={this.state}
        />
        {message !== '' && (
          <View style={styles.message}>
            <CustomText>{message}</CustomText>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

export default CenterSearchBarContainer;
