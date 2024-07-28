import React from "react";
import { Text, View } from "react-native";
import styles from './ChatCard.style';
import { formatDistance, parseISO } from "date-fns";
import { tr } from "date-fns/locale";

const ChatCard = ({data}) => {
    const formattedDate = formatDistance(parseISO(data.date), new Date(), {
        addSuffix:true,
        locale:tr,
    });
    return(
        <View style={styles.container}>
            <View style={styles.inner_container}>
                <Text style={styles.user_text}>{data.user}</Text>
                <Text style={styles.date_text}>{formattedDate}</Text>
            </View>
            <View style={styles.message_container}>
                <Text style={styles.message_text}>{data.message}</Text>
            </View>
        </View>
    )
}

export default ChatCard;