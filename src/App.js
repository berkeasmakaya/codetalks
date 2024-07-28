import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./pages/Auth/Login/Login";
import Register from "./pages/Auth/Register/Register";
import FlashMessage from "react-native-flash-message";
import auth from '@react-native-firebase/auth'
import Channels from "./pages/Channels/Channels";
import Chatting from "./pages/Chatting/Chatting";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


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
  const AppStack = () => {
    return(
      <Stack.Navigator>
        <Stack.Screen 
            name="ChannelsPage" 
            component={Channels} 
            options={{
              headerTitle:"Odalar", 
              headerTintColor:"#fea74d", 
              headerTitleAlign:"center", 
              headerRight: () => <Icon 
                  name="logout" 
                  size={30} 
                  color="#fea344" 
                  onPress={()=> auth().signOut()} 
                />
          }}/>
        <Stack.Screen 
          name="ChatPage" 
          component={Chatting} 
          options={{
            headerTintColor:"#ffb266", 
            headerTitleAlign:"center",
            headerRight: () => <Icon 
                name="logout" 
                size={30} 
                color="#fea344"  
                onPress={()=> auth().signOut()} 
              />
          }}/>
    </Stack.Navigator>
    )
    
  }

  return(
    <NavigationContainer>
      <Stack.Navigator>  
        {!userSession ? (
         <Stack.Screen name="AuthStack" component={AuthStack} options={{headerShown:false}}/> 
        ):(
          <Stack.Screen name="AppStack" component={AppStack} options={{headerShown:false}}/>
        )}   
      </Stack.Navigator>
      <FlashMessage position="top"/>
    </NavigationContainer>
  )
}

export default App;