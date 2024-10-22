import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MessageList = () => {
    return(
        <View style = {styles.messageListContainer}>
            <Text>
            </Text>
        </View>
    );
};

export default MessageList;

const styles = StyleSheet.create({
    messageListContainer: {
      padding: 20,
      alignItems: 'center',
      flex: 1,
    },
  });


