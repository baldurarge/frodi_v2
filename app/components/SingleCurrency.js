import React, {Component} from "react";
import {Text, View, TouchableHighlight, TouchableOpacity} from 'react-native';

import styles from '../assets/styles/Style';


class SingleCurrency extends Component{
    constructor(props){
        super(props)
    }

    addTheCommas(value){
        // value = value.toString().replace(/,/g, ',')
        // return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // return (

        // )
        res = value.toString().split(".");
        if(res.length >=2){
            ret = res[0] + "," + res[1];
        }else{
            ret = res[0]
        }
        return ret.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        // return ret
    }

    renderValue(){
        if(this.props.touched){
            return this.addTheCommas(this.props.touched.value)
        }else if(this.props.changedValue){
            return this.addTheCommas(this.props.changedValue)
        }else{
            return this.addTheCommas(this.props.currency.value)
        }
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
                    {/* <Text style={styles.currencyValue}>{this.props.touched ? this.addTheCommas(this.props.touched.value) : this.addTheCommas(this.props.currency.value)}</Text> */}
                    <Text style={styles.currencyValue}>{this.renderValue()}</Text>

                    <Text style={styles.currencyValueName}>{this.props.currency.longName}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}

export default SingleCurrency