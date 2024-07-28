import { Dimensions, StyleSheet } from "react-native";

const deviceSize = Dimensions.get("window");

export default StyleSheet.create({
    container:{
        backgroundColor:"#ffffff",
        padding:10,
        marginHorizontal:10,
        borderRadius:10,
        height:deviceSize.height / 3
    },
    modal:{
        justifyContent:"flex-end",
        margin:5
    },
    input_container:{
        flex:1,
        backgroundColor:"#ffffff",
        
    },
})