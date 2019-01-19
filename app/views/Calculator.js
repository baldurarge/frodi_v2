import React, { Component } from 'react';
import {
  Text, View, ScrollView, ActivityIndicator, Image, StatusBar, TouchableOpacity, AsyncStorage,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import Modal from 'react-native-modalbox';

import SingleCurrency from '../components/SingleCurrency';
import styles from '../assets/styles/Style';
import NumPad from '../components/NumPad';


const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);


class Calculator extends Component {
  isk = {
    shortName: 'ISK',
    longName: 'Íslensk Króna',
    value: 1,
    askValue: 0,
    bidValue: 0,
    changeCur: 0,
    changePer: 0,
  }

  async storeDataInLocalStorage(key, item) {
    try {
    // we want to wait for the Promise returned by AsyncStorage.setItem()
    // to be resolved to the actual value before returning the value
      const jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
      return jsonOfItem;
    } catch (error) {
      console.log(error.message);
    }
  }

  async getDataFromLocalStorage(key) {
    try {
      const retrivedItem = await AsyncStorage.getItem(key);
      const item = JSON.parse(retrivedItem);
      return item;
    } catch (error) {
      console.log(error.message);
    }
  }

  async deleteDataFromStorage(key) {
    try {
      const clearedItem = await AsyncStorage.clear(key);
      return clearedItem;
    } catch (error) {
      console.log(error.message);
    }
  }


  fetchDataFromAPI2() {
    fetch('http://apis.is/currency/m5')
      .then(res => res.json())
      .then((results) => {
        results.results.unshift(this.isk);
        this.getDataFromLocalStorage('frodiData3').then((storageData) => {
          if (storageData) {
            console.log('Found Data in Storage');
            for (let i = 0; i < storageData.results.length; i++) {
              for (let x = 0; x < results.results.length; x++) {
                if (storageData.results[i].shortName == results.results[x].shortName) {
                  storageData.results[i].value = results.results[x].value;
                }
              }
            }
            this.storeDataInLocalStorage('frodiData3', storageData);
            this.setState({
              isLoading: false,
              currency: storageData.results,
              initialCurrency: results.results,
            });
          } else {
            console.log('Did not find data in storage');
            newRes = [];
            results.results.forEach((item, index, object) => {
              if (item.shortName === 'SEK' || item.shortName === 'JPY' || item.shortName === 'CAD' || item.shortName === 'NOK' || item.shortName === 'CHF' || item.shortName === 'TWI') {

              } else {
                newRes.push(item);
              }
            });

            results.results = newRes;

            this.storeDataInLocalStorage('frodiData3', results);
            this.setState({
              isLoading: false,
              currency: results.results,
              initialCurrency: results.results,
            });
          }
        }).catch(error => console.log(error));
      }).catch(error => console.log(error));
  }

  currencyClicked(item) {
    tempStateCurr = this.state.currency;
    selectedCurrencyIntialValue = 0;
    this.setState({ currentInput: item });
    counter = 0;
    for (let i = 0; i < tempStateCurr.length; i++) {
      if (tempStateCurr[i].shortName === item.shortName) {
        tempStateCurr[i].touched = { value: '', inital: true };
        counter = i;
      } else {
        tempStateCurr[i].touched = false;
      }
    }
    this.refs.modal1.open();
    for (let i = 0; i < this.state.initialCurrency.length; i++) {
      if (this.state.initialCurrency[i].shortName === item.shortName) {
        selectedCurrencyIntialValue = this.state.initialCurrency[i];
      }
    }
    this.setState({
      currency: tempStateCurr, currentSelect: item, numbPadActive: true, selectedCurrencyIntialValue,
    });
    if (counter > 6) {
      scrollPos = ((counter - 6) * 64);
      this.scroller.scrollTo({ x: 0, y: scrollPos });
    }
  }

  calculateAll(calcData) {
    tempStateCurrent = this.state.currency;
    inIsk = Number(calcData.touched.value) * Number(calcData.value);
    console.log(inIsk);

    for (let i = 0; i < tempStateCurrent.length; i++) {
      if(tempStateCurr[i].shortName !== calcData.shortName){
        tempStateCurr[i].changedValue = (inIsk / tempStateCurr[i].value);
        tempStateCurr[i].changedValue = Math.floor(tempStateCurr[i].changedValue * 100) / 100;
        tempStateCurr[i].changedValue = tempStateCurr[i].changedValue.toFixed(2);
      }
    }

    this.setState({currency : tempStateCurr});
    // for (let i = 0; i < tempInitial.length; i++) {
    //   if (tempInitial[i].shortName === calcData.shortName) {
    //     iskNum = (Number(tempInitial[i].value) * Number(calcData.touched.value));
    //   }
    // }
    // for (let i = 0; i < tempStateCurrent.length; i++) {
    //   if (tempStateCurr[i].shortName === 'ISK') {
    //     o = iskNum;
    //     o = Math.floor(o * 100) / 100;
    //     tempStateCurr[i].value = o;
    //   }
    //   if (!tempStateCurrent[i].touched) {
    //     for (let x = 0; x < tempInitial.length; x++) {
    //       if (tempInitial[x].shortName === tempStateCurrent[i].shortName) {
    //         n = (Number(iskNum) / Number(tempInitial[x].value));
    //         n = Math.floor(n * 100) / 100;
    //         tempStateCurrent[i].value = n.toFixed(2);
    //       }
    //     }
    //   }
    // }
    /*
    300 USD => GBP
    300 * 121,25 = 36.375 ISK
    36.375 / 156,49 = 232
*/
  }


  resetDATA() {
    AsyncStorage.removeItem('frodiData3');
    this.fetchDataFromAPI2();
  }

  changeValueOfSelected(value) {
    tempStateCurr = this.state.currency;
    console.log(tempStateCurr);
    if (value === 'x') {
      this.refs.modal1.close();
      return;
    } if (value === 'delete') {
      for (let i = 0; i < tempStateCurr.length; i++) {
        if (tempStateCurr[i].touched) {
          tmpStr = tempStateCurr[i].touched.value.toString();
          tmpStr = tmpStr.slice(0, -1);
          tempStateCurr[i].touched.value = tmpStr;
          calcData = tempStateCurr[i];
        }
      }
    } else {

      for (let i = 0; i < tempStateCurr.length; i++) {
        if (tempStateCurr[i].touched) {
          if (tempStateCurr[i].touched.inital) {
            tempStateCurr[i].touched.value = value;
            tempStateCurr[i].touched.inital = false;
            calcData = tempStateCurr[i];
          } else {
            tmpNum = tempStateCurr[i].touched.value.toString();
            tmpNum += value;
            tempStateCurr[i].touched.value = tmpNum;
            calcData = tempStateCurr[i];
          }
        }
      }
    }
    this.setState({ currency: tempStateCurr });
    this.calculateAll(calcData);
  }

  numpadClicked(value) {
    switch (value) {
      case 1:
        this.changeValueOfSelected('1');
        break;
      case 2:
        this.changeValueOfSelected('2');

        break;
      case 3:
        this.changeValueOfSelected('3');

        break;
      case 4:
        this.changeValueOfSelected('4');

        break;
      case 5:
        this.changeValueOfSelected('5');

        break;
      case 6:
        this.changeValueOfSelected('6');

        break;
      case 7:
        this.changeValueOfSelected('7');

        break;
      case 8:
        this.changeValueOfSelected('8');

        break;
      case 9:
        this.changeValueOfSelected('9');

        break;
      case 0:
        this.changeValueOfSelected('0');

        break;
      case 'x':
        this.changeValueOfSelected('x');
        break;
      case 'delete':
        this.changeValueOfSelected('delete');
        break;
    }
  }


  constructor(props) {
    super(props);

    this.state = { isLoading: true, numbPadActive: false, currentSelect: false };

    this.currencyClicked = this.currencyClicked.bind(this);
    this.numpadClicked = this.numpadClicked.bind(this);
  }

  componentDidMount() {
    this.fetchDataFromAPI2();
  }


  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <MyStatusBar barStyle="light-content" />
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0.5, y: 0.5 }} colors={['#243949', '#517FA4']} style={styles.linearGradient}>
          <View style={[styles.navContainer]}>
            <TouchableOpacity onPress={() => { this.resetDATA(); }}><Image source={require('../assets/img/refresh.png')} /></TouchableOpacity>
            <Text style={styles.headline}>Fróði</Text>
            <Image source={require('../assets/img/settings.png')} />
          </View>
        </LinearGradient>

        <ScrollView style={[styles.container]} ref={(scroller) => { this.scroller = scroller; }}>
          {this.state.currency.map(item =>
          // return <Text key={item.shortName}>{item.shortName} - {item.value}</Text>
            <SingleCurrency key={item.shortName} currency={item} clickFunction={this.currencyClicked} touched={item.touched} changedValue={item.changedValue} />)}
          <View style={{ height: 300 }} />
        </ScrollView>
        {/* {this.state.numbPadActive === true && */}
        <Modal
          style={[styles.modal, styles.modal1]}
          ref="modal1"
          swipeToClose={this.state.swipeToClose}
          onClosed={this.onClose}
          onOpened={this.onOpen}
          position="bottom"
          backdrop={false}
          onClosingState={this.onClosingState}
        >
          <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0.5, y: 0.5 }} colors={['#ffffff', '#E7ECEF']} style={styles.linearGradient}>
            <NumPad clickFunction={this.numpadClicked} />
          </LinearGradient>
        </Modal>

        {/* } */}

      </View>

    );
  }
}

export default Calculator;
