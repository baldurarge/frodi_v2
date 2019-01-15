import React, {Component} from "react";
import {Text, View, TouchableHighlight, TouchableOpacity} from 'react-native';

import styles from '../assets/styles/Style';


class SingleCurrency extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <TouchableOpacity 
            style={[styles.singleCurrency, this.props.touched ? styles.singleCurrencyClicked : styles.singleCurrencyNotClicked]} 
            onPress={() => {
                this.props.clickFunction(this.props.currency)
            }}
            >
                <Text style={styles.currencyText}>{this.props.currency.shortName}</Text>
                <View style={styles.currencyValueContainer}>
                    <Text style={styles.currencyValue}>{this.props.touched ? this.props.touched.value : this.props.currency.value}</Text>
                    <Text style={styles.currencyValueName}>{this.props.currency.longName}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default SingleCurrency