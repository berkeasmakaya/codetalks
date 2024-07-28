import React from "react";
import { TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './FloatingButton.style';

const FloatingButton = ({icon, onPress}) => {
    return(
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Icon name={icon} size={30} color="#ffffff"/>
        </TouchableOpacity>
    )
    
}

export default FloatingButton;