import { StyleSheet } from "react-native";

const base_style = StyleSheet.create({
    container:{
        borderRadius:10,
        margin:10,
        padding:10,
        alignItems:"center",
    },
    text:{
        fontWeight:"bold",
        fontSize:20,
    }
})

export default {
    primary: StyleSheet.create({
        ...base_style,
        container:{
            ...base_style.container,
            backgroundColor:"#ffa040",
        },
        text:{
            ...base_style.text,
            color:"#ffffff",
        }
    }),

    secondary: StyleSheet.create({
        ...base_style,
        container:{
            ...base_style.container,
            backgroundColor:"#ffffff",
        },
        text:{
            ...base_style.text,
            color:"#ffa852",
        }
    })
}