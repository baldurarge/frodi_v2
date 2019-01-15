import React, {Component} from "react";
import {Text, View, Image, TouchableOpacity} from 'react-native';

import Modal from 'react-native-modalbox';

import styles from '../assets/styles/Style';


class NumPad extends Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            
            <View style={styles.numpadContainer}>
                    <View style={styles.numpadColumn}>
                        <TouchableOpacity style={[styles.numpadNumber, styles.borderRight, styles.numpadTopNumber]}><Text>7</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.numpadNumber, styles.borderTop, styles.borderBottom, styles.borderRight]}><Text>4</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.numpadNumber, styles.borderRight, styles.borderBottom]}><Text>1</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.numpadNumber, styles.borderRight]}>
                            <Image source={require('../assets/img/delete.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.numpadColumn}>
                        <TouchableOpacity style={[styles.numpadNumber, styles.borderBottom, styles.numpadTopNumber]}><Text>8</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.numpadNumber, styles.borderBottom]}><Text>5</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.numpadNumber, styles.borderBottom]}><Text>2</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.numpadNumber]}><Text>0</Text></TouchableOpacity>
                    </View>
                    <View style={styles.numpadColumn}>
                        <TouchableOpacity style={[styles.numpadNumber, styles.borderLeft, styles.borderBottom, styles.numpadTopNumber]}><Text>9</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.numpadNumber, styles.borderLeft, styles.borderBottom]}><Text>6</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.numpadNumber, styles.borderLeft, styles.borderBottom]}><Text>3</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.numpadNumber, styles.borderLeft]}>
                            <Image source={require('../assets/img/backspace.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
                
        )
    }
}

export default NumPad