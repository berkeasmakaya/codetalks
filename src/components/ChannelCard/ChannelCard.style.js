import { Dimensions, StyleSheet } from "react-native";

const deviceSize = Dimensions.get("window");

export default StyleSheet.create({
    container:{
        margin:15,
        width:deviceSize.width/ 2.5 ,
        height:deviceSize.height/3.5,
        borderWidth:1,
        borderRadius:10,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#eff0f1"
    },
    text:{
        fontSize:20,
        fontWeight:"bold",
        color:"#fea74d",
        paddingBottom:20
    },
    date_container:{
        alignContent:"center",
        
    },
    date_text:{
        fontSize:10,
        fontWeight:"bold",
        color:"#fea74d"
    },
    
    user_container:{
        alignContent:"center"
    },
    user_text:{
        fontSize:10,
        fontWeight:"bold",
        color:"#fea74d"
    }
})