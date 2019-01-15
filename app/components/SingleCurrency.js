import React, {Component} from "react";
import {Text, View, TouchableHighlight} from 'react-native';
import styles from '../assets/styles/Style';


class SingleCurrency extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={[styles.singleCurrency, {backgroundColor:this.props.backgroundColor}]}>
                <Text style={styles.currencyText}>{this.props.currency.shortName}</Text>
                <View style={styles.currencyValueContainer}>
                    <Text style={styles.currencyValue}>{this.props.currency.value}</Text>
                    <Text style={styles.currencyValueName}>{this.props.currency.longName}</Text>
                </View>
            </View>
        )
    }
}

export default SingleCurrency