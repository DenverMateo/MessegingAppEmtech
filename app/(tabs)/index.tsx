import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import * as Location from 'expo-location';
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

    const [isInputFocused, setInputFocused] = useState(false); 

    const onDeleteMessage = (messageId) => {
        setMessages((prevMessages) => prevMessages.filter((message) => message.id !== messageId));
    };

    const handlePressMessage = (message) => {
        console.log('Pressed message:', message);
    };

    const handleChangeFocus = (isFocused) => {
        setInputFocused(isFocused);
    };

    const handleSubmit = (text) => {
        setMessages((prevMessages) => [createTextMessage(text), ...prevMessages]);
    };

    const handlePressToolbarCamera = () => {
        // Handle camera press
    };

    const handlePressToolbarLocation = async () => {
        // Request location permissions
        const { status } = await Location.requestForegroundPermissionsAsync();
    
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Location permission is required to send your location.');
            return;
        }
    
        try {
            // Fetch the current location
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
    
            // Add the location message to the message list
            setMessages((prevMessages) => [
                createLocationMessage({ latitude, longitude }),
                ...prevMessages,
            ]);
        } catch (error) {
            Alert.alert('Location Error', 'Unable to fetch your location. Please try again.');
            console.error('Error fetching location:', error);
        }
    };
    

    return (
        <View style={styles.container}>
            <Status />
            <View style={styles.content}>
                <MessageList 
                    messages={messages} 
                    onPressMessage={handlePressMessage} 
                    onDeleteMessage={onDeleteMessage} 
                />
            </View>
            <View style={styles.inputMethodEditor}>
            </View>
            <View style={styles.toolbar}>
                <Toolbar
                    isFocused={isInputFocused}
                    onSubmit={handleSubmit}
                    onChangeFocus={handleChangeFocus}
                    onPressCamera={handlePressToolbarCamera}
                    onPressLocation={handlePressToolbarLocation}
                />
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
