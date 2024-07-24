import React from "react";
import { TextInput, View } from "react-native";
import styles from './Input.style';

const Input = ({placeholder, value, onType, isSecure, onBlur}) => {
    return(
        <View style={styles.container}>
            <TextInput
                autoCapitalize="none"
                value={value}
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#ffffff"  
                onChangeText={onType}
                secureTextEntry={isSecure}
                onBlur={onBlur}
            />
        </View>
    )
    
}   

export default Input;