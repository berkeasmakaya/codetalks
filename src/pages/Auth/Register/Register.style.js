import { StyleSheet,Dimensions } from "react-native";

const deviceSize = Dimensions.get("window");

export default StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fe6e00",
    },
    header_container:{
        justifyContent:"flex-end",
        alignItems:"center",
        //backgroundColor:"#000000",
        height:deviceSize.height /4,
        width:deviceSize.width,
        marginBottom:25
    },
    header:{
        padding:10,
        color:"#ffffff",
        fontSize:30
    },
    input_container:{
        marginVertical:20,
        //backgroundColor:"green"
    },
    button_container:{
        //backgroundColor:"#ffffff",
        marginVertical:20,
    },
    error:{
        textAlign:"center",
        fontWeight:"bold",
        color:"#000000"
    }
})