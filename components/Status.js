import { Constants } from 'expo';
import { Platform, StatusBar as RNStatusBar, StyleSheet, Text, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import React from 'react';

export default class Status extends React.Component {
    state = {
        isConnected: true,
    };

    componentDidMount() {
        // Subscribe to network state updates
        this.unsubscribe = NetInfo.addEventListener(state => {
            this.setState({ info: state.isConnected ? 'connected' : 'none' });
        });
    }

    componentWillUnmount() {
        // Unsubscribe from network state updates when the component unmounts
        this.unsubscribe();
    }

    render() {
        const { info } = this.state;
        const isConnected = info !== 'none';
        const backgroundColor = isConnected ? 'white' : 'red';

        const statusBar = (
            <RNStatusBar
                backgroundColor={backgroundColor}
                barStyle={isConnected ? 'dark-content' : 'light-content'}
                animated={false}
            />
        );

        const messageContainer = (
            <View style={styles.messageContainer} pointerEvents={"none"}>
                {statusBar}
                {!isConnected && (
                    <View style={styles.bubble}>
                        <Text style={styles.text}>No network connection</Text>
                    </View>
                )}
            </View>
        );

        
        
        
        if (Platform.OS === 'ios') {
            return (
                <View style={[styles.status, { backgroundColor }]}>
                    {messageContainer}
                </View>
            );
        }

        return messageContainer; 
    }
}

const statusHeight = (Platform.OS === 'ios' ? Constants.statusBarHeight + 40 : 1); 

const styles = StyleSheet.create({
    status: {
        zIndex: 1,
        height: statusHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageContainer: {
        zIndex: 1,
        position: 'absolute',
        top: statusHeight + 20,
        left: 0,
        right: 0,
        height: 80,
        alignItems: 'center',
    },
    bubble: {
        marginTop: 23,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: 'red',
    },
    text: {
        fontSize: 15,
        color: 'white',
    },
});
