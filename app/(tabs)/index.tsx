// index.tsx
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Status from '@/components/Status';
import MessageList from '@/components/MessageList';
import InputMethodEditor from '@/components/InputMethodEditor';
import Toolbar from '@/components/Toolbar';
import { createImageMessage, createLocationMessage, createTextMessage } from '@/utils/MessageUtils';

export default function App() {
    const [messages, setMessages] = useState([
        createImageMessage('https://unsplash.it/300/300'),
        createTextMessage('World'),
        createTextMessage('Hello'),
        createLocationMessage({
            latitude: 37.78825,
            longitude: -122.4324,
        }),
    ]);

    const onDeleteMessage = (messageId) => {
        setMessages((prevMessages) => prevMessages.filter((message) => message.id !== messageId));
    };

    const handlePressMessage = (message) => {
        console.log('Pressed message:', message);
    };

    return (
        <View style={styles.container}>
            <Status />
            <View style={styles.content}>
                <MessageList 
                    messages={messages} 
                    onPressMessage={handlePressMessage} 
                    onDeleteMessage={onDeleteMessage} // Pass the delete function
                />
            </View>
            <View style={styles.inputMethodEditor}>
                <InputMethodEditor />
            </View>
            <View style={styles.toolbar}>
                <Toolbar />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 9,
    },
    inputMethodEditor: {
        flex: 1,
        backgroundColor: 'white',
    },
    toolbar: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(0, 0, 0, 0.04)',
        backgroundColor: 'white',
    },
});
