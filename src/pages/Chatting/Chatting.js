import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Alert } from "react-native";
import ChatCard from "../../components/ChatCard/ChatCard";
import styles from './Chatting.style'
import parseContentData from "../../utils/parseContentData";
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import ContentInputModal from "../../components/modal/ContentInput/ContentInputModal";
import FloatingButton from "../../components/FloatingButton/FloatingButton";

function Chatting({route, navigation}) {
    const {item} = route.params;
    const channelName = item.name
    const channelId = item.id
    const [messagesList, setMessagesList] = useState([]);
    const [inputModalVisible, setInputModalVisible] = useState(false)
    const currentUser = auth().currentUser;

    useEffect(()=>{
        navigation.setOptions({headerTitle:channelName})
        database().ref(`/channels/${channelId}/messages`)
        .on('value', snapshot => {
          const contentData = snapshot.val();
          const parsedData = parseContentData(contentData || {}) 
          setMessagesList(parsedData)
        })
      },[])
    
      function handleInputToggle() {
        setInputModalVisible(!inputModalVisible)
      }
    
      function sendContent(content) {
        const user = auth().currentUser.email;
    
        const contentObject = {
          message:content,
          user: user.split('@')[0],
          date: new Date().toISOString(),
        };
        database().ref(`/channels/${channelId}/messages`).push(contentObject)
        
      }
    
      function handleSendContent(content) {
        handleInputToggle();
        sendContent(content)
      }

      const handleLongPress = (item) => {
        if (item.user === currentUser.email.split('@')[0]) {
              Alert.alert('Mesajı Sil', 'Bu Mesajı Silmek İstediğinizden Emin Misiniz ?',
                [
                  {text:'İptal', style:'cancel'},
                  {text:'Sil', onPress: () => deleteMessage(item)}
                ],
                { cancelable: true }
            )
          }
        }
    
      const deleteMessage = (item) => {
          database().ref(`channels/${channelId}/messages/${item.id}`).remove();
      }

    const renderMessages = ({item}) => <ChatCard data={item} onLongPress={()=>handleLongPress(item)} />
    return(
        <View style={styles.container}>
            <View style={styles.inner_container}>
                <View style={styles.channel_header_text}>
                    <Text style={styles.header_text}>{channelName} Odası Kuruldu!</Text>
                </View>
                <FlatList 
                    data={messagesList}
                    renderItem={renderMessages}
                />
                <FloatingButton icon="plus" onPress={handleInputToggle}/>
                <ContentInputModal 
                    visible={inputModalVisible}
                    onClose={handleInputToggle}
                    onSend={handleSendContent}
                    placeholder="Mesajınız..."
                    buttonText="Gönder"
                />
            </View>
        </View>
        
    )
}

export default Chatting;