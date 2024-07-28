import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from './ChannelCard.style';
import {format} from 'date-fns'



const ChannelCard = ({channel, onPress}) => {
    const formattedDate = format(new Date(channel.date), 'dd.MM.yyyy')
    return(
        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{channel.name}</Text>
            <View style={styles.user_container}>
                <Text style={styles.user_text}>Tarafından Kuruldu: {channel.user}</Text>
            </View>
            <View style={styles.date_container}>
                <Text style={styles.date_text}>{formattedDate}</Text>
            </View>
        </TouchableOpacity>  
    )
}

export default ChannelCard;