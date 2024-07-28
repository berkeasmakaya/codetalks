import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container:{
        borderWidth:1,
        borderColor:"#000000",
        borderRadius:15,
        margin:10,
        padding:10,
        backgroundColor:"#ffffff"
    },
    inner_container:{
        flexDirection:"row",
        justifyContent:"space-between",
        //backgroundColor:"yellow"
    },
    user_text:{
        fontSize:13
    },
    date_text:{
        fontSize:13
    },
    message_container:{
        marginTop:15,
        //backgroundColor:"red"
    },
    message_text:{
        fontWeight:"bold",
        color:"#000000",
        fontSize:15
    }
})