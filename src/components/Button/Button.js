import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import styles from './Button.style'

const Button = ({text, onPress, theme="primary", loading}) => {
    return(
        <TouchableOpacity style={styles[theme].container} onPress={onPress}>
            {loading ? (
                <ActivityIndicator color="#ffffff"/>
            ):(
                <Text style={styles[theme].text}>{text}</Text>
            )}
            
        </TouchableOpacity>
    )
}

export default Button;