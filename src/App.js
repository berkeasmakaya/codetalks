import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import FlashMessage from "react-native-flash-message";
import auth from '@react-native-firebase/auth'
import Rooms from "./pages/Rooms/Rooms";


const Stack = createNativeStackNavigator(); 

function App() {

  const [userSession, setUserSession] = useState();

  useEffect(()=>{
    auth().onAuthStateChanged(user=>{
      setUserSession(!!user)
    })
  },[])
  
  const AuthStack = () => {
    return(
      <Stack.Navigator>
        <Stack.Screen name="LoginPage" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="RegisterPage" component={Register} options={{headerShown:false}}/>
      </Stack.Navigator>
    )
  }

  return(
    <NavigationContainer>
      <Stack.Navigator>
        {!userSession ? (
         <Stack.Screen name="AuthStack" component={AuthStack} options={{headerShown:false}}/> 
        ):(
          <Stack.Screen name="RoomsPage" component={Rooms}/>
        )}
        
      </Stack.Navigator>
      <FlashMessage position="top"/>
    </NavigationContainer>
  )
}

export default App;