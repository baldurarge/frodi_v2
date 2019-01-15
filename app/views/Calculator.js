import React, {Component} from "react";
import {Text, View,ScrollView, ActivityIndicator, Image, Button} from 'react-native';
import { AsyncStorage } from "react-native"
import LinearGradient from 'react-native-linear-gradient';

import Modal from 'react-native-modalbox';

import SingleCurrency from "../components/SingleCurrency";
import styles from '../assets/styles/Style';
import NumPad from "../components/NumPad";

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
  this.setState({currentInput:item});
  for (let i = 0; i < tempStateCurr.length; i++) {
    if(tempStateCurr[i].shortName === item.shortName){
      tempStateCurr[i].touched = {value: item.value };
    }else{
      tempStateCurr[i].touched = false;
    }
  }
  this.refs.modal1.open()
  this.setState({currency:tempStateCurr, currentSelect:item, numbPadActive:true});
}


constructor(props){
  super(props);
  this.state ={isLoading: true, numbPadActive:false, currentSelect:false}
  this.currencyClicked = this.currencyClicked.bind(this)
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
        <LinearGradient start={{x: 0, y: 0}} end={{x: 0.5, y: 0.5}} colors={['#243949', '#517FA4']} style={styles.linearGradient}>
          <View style={[styles.navContainer]}>
          <Image source={require('../assets/img/refresh.png')}/>
            <Text style={styles.headline} >Fróði</Text>
            <Image source={require('../assets/img/settings.png')}/>
          </View>
        </LinearGradient>

        <ScrollView style={[styles.container]}>
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
              <NumPad/>
          </LinearGradient>
          </Modal>

        {/* } */}
            
      </View>
     
    );
  }
}

export default Calculator