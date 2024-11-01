import { Constants } from 'expo';
import { Platform, StatusBar as RNStatusBar, StyleSheet, Text, View, Animated, Easing } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import React from 'react';

export default class Status extends React.Component {
    state = {
        info: 'connected',
        animatedValue: new Animated.Value(0), 
        backgroundColorValue: new Animated.Value(0), 
    };

    componentDidMount() {
        this.unsubscribe = NetInfo.addEventListener(state => {
            const isConnected = state.isConnected;

            this.setState({ info: isConnected ? 'connected' : 'none' }, () => {
                // Animate bubble visibility
                Animated.timing(this.state.animatedValue, {
                    toValue: isConnected ? 0 : 1,
                    duration: 1000,
                    useNativeDriver: true,
                    easing: Easing.ease,
                }).start();

                // Animate background color
                Animated.timing(this.state.backgroundColorValue, {
                    toValue: isConnected ? 0 : 1, // 0 for white, 1 for red
                    duration: 1000,
                    useNativeDriver: false, // Use native driver for layout but not for color
                }).start();
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const { info } = this.state;
        const isConnected = info !== 'none';

        // Interpolate background color
        const animatedBackgroundColor = this.state.backgroundColorValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['white', 'red'], // Color change
        });

        // Use backgroundColorValue to set the status bar color
        const statusBarBackgroundColor = isConnected ? 'white' : 'red';

        const statusBar = (
            <RNStatusBar
                backgroundColor={statusBarBackgroundColor} // Set to white or red based on connection
                barStyle={isConnected ? 'dark-content' : 'light-content'}
                animated={false}
            />
        );

        const translateY = this.state.animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, 0],
        });

        const bubbleStyle = {
            opacity: this.state.animatedValue,
            transform: [{ translateY }], // Slide animation
        };

        const messageContainer = (
            <View style={styles.messageContainer} pointerEvents={"none"}>
                {statusBar}
                {!isConnected && (
                    <Animated.View style={[styles.bubble, bubbleStyle]}>
                        <Text style={styles.text}>No network connection</Text>
                    </Animated.View>
                )}
            </View>
        );

        return (
            <Animated.View style={[styles.status, { backgroundColor: animatedBackgroundColor }]}>
                {messageContainer}
            </Animated.View>
        );
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
