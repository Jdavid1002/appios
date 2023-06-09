import React, {Component} from 'react';
import CenterSearchBarComponent from 'app_components/modules/center-search-bar/components/center-search-bar-component';
import {SafeAreaView, View, TouchableOpacity} from 'react-native';
import {Http, HttpCustomStructure} from 'app_utils/http';
import styles from '../styles/styles';
import mainStyles from 'app_styles/MainStyles';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faChevronLeft} from '@fortawesome/free-solid-svg-icons';
import {CustomText} from 'app_components/commons/customs/components/customComponents';

class CenterSearchBarContainer extends Component<any> {
  state = {
    selectedItem: null,
    message: 'Ingrese por lo menos 3 caracteres',
    text: '',
    items: [],
    addCenter: false,
  };

  constructor(props: any) {
    super(props);

    this.state = {
      selectedItem: null,
      message: 'Ingrese por lo menos 3 caracteres',
      text: '',
      items: [],
      addCenter: false,
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSelectItem = this.handleSelectItem.bind(this);
    this.changeSelectedItem = this.changeSelectedItem.bind(this);
  }

  handleSelectItem(item: any) {
    this.setState({selectedItem: item});
    this.props.onSubmit(item);
  }

  changeSelectedItem() {
    this.setState({
      selectedItem: null,
      message: 'Ingrese por lo menos 3 caracteres',
      text: '',
      items: [],
      addCenter: false,
    });
  }

  async handleTextChange(text: string) {
    this.setState({text});

    if (text.length < 3) {
      this.setState({
        message: 'Ingrese por lo menos 3 caracteres',
        items: [],
        addCenter: false,
      });
    } else if (this.state.items.length === 0) {
      this.setState({
        message: 'Buscando...',
      });

      // Fetch.
      const query_data: HttpCustomStructure = {
        method: 'GET',
        url:
          '/api/alliance/iq-secundaria/headquarter/external-list?search=&pageNumber=1&nPerPage=10&select=name+localization+slug',
      };

      const data = await Http.send(query_data);

      if (data.status === 'success') {
        const centers = data?.headquarters?.map((item : any) => {
          return {
            school_name : (item?.name + ',  ' + item?.localization?.regional + ',  ' + item?.localization?.district ) || '',
            ...item
          }
        })

        this.setState({
          items: centers,
          message:
            centers.length > 0
              ? ''
              : 'No hay resultados que coincidan con la búsqueda',
          addCenter: true,
        });
      } else {
        alert(data.message);
      }
    }
  }

  render() {
    const {items, message, text, addCenter, selectedItem} = this.state;

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
