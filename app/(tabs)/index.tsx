import React from 'react';
import { View, StyleSheet } from 'react-native';
import Status from '@/components/Status';
import MessageList from '@/components/MessageList';
import InputMethodEditor from '@/components/ImageGrid';
import Toolbar from '@/components/Toolbar';

export default function App() {
    return (
        <View style={styles.container}>
            <Status />
            <View style={styles.content}>
                <MessageList />
            </View>
            <View style={styles.inputMethodEditor}>
                <InputMethodEditor />
            </View>
            <View style={styles.toolbar}>
                <Toolbar />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    content: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 1,
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
