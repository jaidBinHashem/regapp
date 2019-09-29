import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { Icon } from 'react-native-elements';
import styles from './styles';

const RectangleView = props => {
    return (
        <TouchableOpacity style={styles.rectangleContainer}>
            <Text style={{ fontSize: 18 }}>{props.title}</Text>
            <Icon type="entypo" name='chevron-thin-right' size={25} color='lightgray' />
        </TouchableOpacity>
    )
}

export default RectangleView;