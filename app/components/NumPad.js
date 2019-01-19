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
                        <TouchableOpacity style={[styles.numpadNumber, styles.borderRight, styles.numpadTopNumber]} onPress={() => {this.props.clickFunction(7)}}><Text>7</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.numpadNumber, styles.borderTop, styles.borderBottom, styles.borderRight]} onPress={() => {this.props.clickFunction(4)}}><Text>4</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.numpadNumber, styles.borderRight, styles.borderBottom]} onPress={() => {this.props.clickFunction(1)}}><Text>1</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.numpadNumber, styles.borderRight]} onPress={() => {this.props.clickFunction("x")}}>
                            <Image source={require('../assets/img/delete.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.numpadColumn}>
                        <TouchableOpacity style={[styles.numpadNumber, styles.borderBottom, styles.numpadTopNumber]} onPress={() => {this.props.clickFunction(8)}}><Text>8</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.numpadNumber, styles.borderBottom]} onPress={() => {this.props.clickFunction(5)}}><Text>5</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.numpadNumber, styles.borderBottom]} onPress={() => {this.props.clickFunction(2)}}><Text>2</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.numpadNumber]} onPress={() => {this.props.clickFunction(0)}}><Text>0</Text></TouchableOpacity>
                    </View>
                    <View style={styles.numpadColumn}>
                        <TouchableOpacity style={[styles.numpadNumber, styles.borderLeft, styles.borderBottom, styles.numpadTopNumber]} onPress={() => {this.props.clickFunction(9)}}><Text>9</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.numpadNumber, styles.borderLeft, styles.borderBottom]} onPress={() => {this.props.clickFunction(6)}}><Text>6</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.numpadNumber, styles.borderLeft, styles.borderBottom]} onPress={() => {this.props.clickFunction(3)}}><Text>3</Text></TouchableOpacity>
                        <TouchableOpacity style={[styles.numpadNumber, styles.borderLeft]} onPress={() => {this.props.clickFunction("delete")}}>
                            <Image source={require('../assets/img/backspace.png')}/>
                        </TouchableOpacity>
                    </View>
                </View>
                
        )
    }
}

export default NumPad