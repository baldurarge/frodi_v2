import React, {Component} from "react";
import {Text, View, Image} from 'react-native';
import styles from '../assets/styles/Style';


class NumPad extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.numpadContainer}>
                <View style={styles.numpadColumn}>
                    <View style={[styles.numpadNumber, styles.borderRight, styles.numpadTopNumber]}><Text>7</Text></View>
                    <View style={[styles.numpadNumber, styles.borderTop, styles.borderBottom, styles.borderRight]}><Text>4</Text></View>
                    <View style={[styles.numpadNumber, styles.borderRight, styles.borderBottom]}><Text>1</Text></View>
                    <View style={[styles.numpadNumber, styles.borderRight]}>
                        <Image source={require('../assets/img/delete.png')}/>
                    </View>
                </View>
                <View style={styles.numpadColumn}>
                    <View style={[styles.numpadNumber, styles.borderBottom, styles.numpadTopNumber]}><Text>8</Text></View>
                    <View style={[styles.numpadNumber, styles.borderBottom]}><Text>5</Text></View>
                    <View style={[styles.numpadNumber, styles.borderBottom]}><Text>2</Text></View>
                    <View style={[styles.numpadNumber]}><Text>0</Text></View>
                </View>
                <View style={styles.numpadColumn}>
                    <View style={[styles.numpadNumber, styles.borderLeft, styles.borderBottom, styles.numpadTopNumber]}><Text>9</Text></View>
                    <View style={[styles.numpadNumber, styles.borderLeft, styles.borderBottom]}><Text>6</Text></View>
                    <View style={[styles.numpadNumber, styles.borderLeft, styles.borderBottom]}><Text>3</Text></View>
                    <View style={[styles.numpadNumber, styles.borderLeft]}>
                        <Image source={require('../assets/img/backspace.png')}/>
                    </View>
                </View>
            </View>
        )
    }
}

export default NumPad