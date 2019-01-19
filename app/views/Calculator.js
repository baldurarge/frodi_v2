import React, {Component} from "react";
import {Text, View,ScrollView, ActivityIndicator, Image, Button, StatusBar} from 'react-native';
import { AsyncStorage } from "react-native"
import LinearGradient from 'react-native-linear-gradient';

import Modal from 'react-native-modalbox';

import SingleCurrency from "../components/SingleCurrency";
import styles from '../assets/styles/Style';
import NumPad from "../components/NumPad";


const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);


class Calculator extends Component{
  isk = {
    "askValue": 0,
    "bidValue": 0,
    "changeCur": 0,
    "changePer": 0,
    "longName": "Íslensk Króna",
    "shortName": "ISK",
    "value": 1
  }

async storeDataInLocalStorage(key, item) {
try {
    //we want to wait for the Promise returned by AsyncStorage.setItem()
    //to be resolved to the actual value before returning the value
    var jsonOfItem = await AsyncStorage.setItem(key, JSON.stringify(item));
    return jsonOfItem;
} catch (error) {
  console.log(error.message);
}
}

async getDataFromLocalStorage(key){
try{
  const retrivedItem = await AsyncStorage.getItem(key);
  const item = JSON.parse(retrivedItem);
  return item;
} catch(error){
  console.log(error.message);
}
return;
}


fetchDataFromAPI2(){
fetch('http://apis.is/currency/m5')
.then(res => res.json())
.then(results => {
  this.getDataFromLocalStorage('frodiData3').then((storageData) => {
    if(storageData){
      for (let i = 0; i < storageData.results.length; i++) {
        for (let x = 0; x < results.results.length; x++) {
          if(storageData.results[i].shortName == results.results[x].shortName){
            storageData.results[i].value = results.results[x].value;
          }
        } 
      }
      this.storeDataInLocalStorage('frodiData3', storageData);
      this.setState({
        isLoading : false,
        currency : storageData.results,
        initialCurrency : results.results
      });
    }else{
      results.results.unshift(this.isk);
      this.storeDataInLocalStorage('frodiData3', results);
      this.setState({
        isLoading : false,
        currency : results.results,
        initialCurrency : results.results
      });
    }
  }).catch(error => console.log(error))
}).catch(error => console.log(error))
}

currencyClicked(item){
  tempStateCurr = this.state.currency;
  selectedCurrencyIntialValue = 0;
  this.setState({currentInput:item});
  counter = 0;
  for (let i = 0; i < tempStateCurr.length; i++) {
    if(tempStateCurr[i].shortName === item.shortName){
      tempStateCurr[i].touched = {value: "", inital:true };
      counter = i;
    }else{
      tempStateCurr[i].touched = false;
    }
  }
  this.refs.modal1.open()
  for (let i = 0; i < this.state.initialCurrency.length; i++) {
    if(this.state.initialCurrency[i].shortName === item.shortName){
      selectedCurrencyIntialValue = this.state.initialCurrency[i];
    }
  }
  this.setState({currency:tempStateCurr, currentSelect:item, numbPadActive:true, selectedCurrencyIntialValue:selectedCurrencyIntialValue});
  if(counter > 6){
    scrollPos = ((counter - 6) * 64);
    this.scroller.scrollTo({x: 0, y: scrollPos});
  }
  
}

calculateAll(calcData){

}

changeValueOfSelected(value){
  tempStateCurr = this.state.currency;

  if(value === "x"){
    this.refs.modal1.close()
    return
  }else if(value === "delete"){
    for (let i = 0; i < tempStateCurr.length; i++) {
      if(tempStateCurr[i].touched){
        tmpStr = tempStateCurr[i].touched.value.toString()
        tmpStr = tmpStr.slice(0, -1)
        tempStateCurr[i].touched.value = tmpStr
        calcData = tempStateCurr[i];
      }
    }
  }else{
    for (let i = 0; i < tempStateCurr.length; i++) {
      if(tempStateCurr[i].touched){
        if(tempStateCurr[i].touched.inital){
          tempStateCurr[i].touched.value = value;
          tempStateCurr[i].touched.inital = false
          calcData = tempStateCurr[i];
        }else{
          tmpNum = tempStateCurr[i].touched.value.toString();
          tmpNum = tmpNum + value;
          tempStateCurr[i].touched.value = tmpNum
          calcData = tempStateCurr[i];
        }
      }
    }
  }
  this.setState({currency:tempStateCurr});
  this.calculateAll(calcData);
}

numpadClicked(value){
  switch (value) {
    case 1:
    this.changeValueOfSelected("1")
      break;
    case 2:
      this.changeValueOfSelected("2")

      break;
    case 3:
      this.changeValueOfSelected("3")

      break;
    case 4:
      this.changeValueOfSelected("4")

      break;
    case 5:
      this.changeValueOfSelected("5")

      break;
    case 6:
      this.changeValueOfSelected("6")

      break;
    case 7:
      this.changeValueOfSelected("7")

      break;
    case 8:
      this.changeValueOfSelected("8")

      break;
    case 9:
      this.changeValueOfSelected("9")

      break;
    case 0:
      this.changeValueOfSelected("0")

      break;
    case "x":
    this.changeValueOfSelected("x")
      break;
    case "delete":
    this.changeValueOfSelected("delete")
      break;
  }
}


constructor(props){
  super(props);
  this.state ={isLoading: true, numbPadActive:false, currentSelect:false}
  this.currencyClicked = this.currencyClicked.bind(this)
  this.numpadClicked = this.numpadClicked.bind(this)
}

componentDidMount(){
this.fetchDataFromAPI2();
}



  render(){
    if(this.state.isLoading){
      return(
        <View>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={styles.container}>
      <MyStatusBar barStyle="light-content" />
        <LinearGradient start={{x: 0, y: 0}} end={{x: 0.5, y: 0.5}} colors={['#243949', '#517FA4']} style={styles.linearGradient}>
          <View style={[styles.navContainer]}>
          <Image source={require('../assets/img/refresh.png')}/>
            <Text style={styles.headline} >Fróði</Text>
            <Image source={require('../assets/img/settings.png')}/>
          </View>
        </LinearGradient>

        <ScrollView style={[styles.container]} ref={(scroller) => {this.scroller = scroller}}>
        {this.state.currency.map(item => {
            // return <Text key={item.shortName}>{item.shortName} - {item.value}</Text>
            return <SingleCurrency key={item.shortName} currency={item} clickFunction={this.currencyClicked} touched={item.touched}/>
          })}
          <View style={{height:300}}></View>
        </ScrollView>
        {/* {this.state.numbPadActive === true && */}
        <Modal
            style={[styles.modal, styles.modal1]}
            ref={"modal1"}
            swipeToClose={this.state.swipeToClose}
            onClosed={this.onClose}
            onOpened={this.onOpen}
            position={"bottom"}
            backdrop={false}
            onClosingState={this.onClosingState}>
          <LinearGradient start={{x: 0, y: 0}} end={{x: 0.5, y: 0.5}} colors={['#ffffff', '#E7ECEF']} style={styles.linearGradient}>
              <NumPad clickFunction={this.numpadClicked}/>
          </LinearGradient>
          </Modal>

        {/* } */}
            
      </View>
     
    );

  }
}

export default Calculator