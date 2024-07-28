import { View, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './Channels.style';
import FloatingButton from '../../components/FloatingButton/FloatingButton';
import ContentInputModal from '../../components/modal/ContentInput/ContentInputModal';
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import parseContentData from '../../utils/parseContentData';
import ChannelCard from '../../components/ChannelCard/ChannelCard';

function Channels({navigation}){
  const [inputModalVisible, setInputModalVisible] = useState(false)
  const [channelList, setChannelList] = useState([]);

  useEffect(()=>{
    database().ref('/channels')
    .on('value', snapshot => {
      const contentData = snapshot.val();
      const parsedData = parseContentData(contentData || {})
      setChannelList(parsedData)
      //console.log(roomList)
    })
  },[])


  function handleInputToggle() {
    setInputModalVisible(!inputModalVisible)
  }

  function sendContent(content) {
    const user = auth().currentUser.email;

    const contentObject = {
      name:content,
      user: user.split('@')[0],
      date: new Date().toISOString(),
    };
    database().ref('/channels').push(contentObject)
    console.log(contentObject)
  }

  function handleSendContent(content) {
    handleInputToggle();
    sendContent(content)
  }
   
  function handleGoChat(item) {
    navigation.navigate("ChatPage", {item})
  }

  const renderChannels = ({item}) => <ChannelCard channel={item} onPress={()=>handleGoChat(item)}/>

  return (
    <View style={styles.container}>
      <FlatList 
        data={channelList}
        renderItem={renderChannels}
        numColumns={2}
        keyExtractor={(item) => item.id}
      />
      <FloatingButton icon="plus" onPress={handleInputToggle}/>
      <ContentInputModal 
        visible={inputModalVisible}
        onClose={handleInputToggle}
        onSend={handleSendContent}
        placeholder="Oda Adı..."
        buttonText="Oluştur"
      />
    </View>
  )
}

export default Channels;