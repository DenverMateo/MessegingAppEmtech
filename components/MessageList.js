// MessageList.js
import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, Text, StyleSheet, Image, TouchableOpacity, Alert, BackHandler, Modal, Dimensions } from 'react-native';
import { MessageShape } from '@/utils/MessageUtils';
import MapView, { Marker } from 'react-native-maps';

const keyExtractor = (item) => item.id.toString();
const { width, height } = Dimensions.get('window');

export default class MessageList extends React.Component {
    static propTypes = {
        messages: PropTypes.arrayOf(MessageShape).isRequired,
        onPressMessage: PropTypes.func,
        onDeleteMessage: PropTypes.func.isRequired,
    };

    static defaultProps = {
        onPressMessage: () => {},
    };

    state = {
        messages: this.props.messages,
        fullscreenImageId: null,
    };

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        if (this.state.fullscreenImageId !== null) {
            this.dismissFullscreenImage();
            return true;
        }
        return false;
    };

    handleImagePress = (id) => {
        this.setState({ fullscreenImageId: id });
    };

    dismissFullscreenImage = () => {
        this.setState({ fullscreenImageId: null });
    };

    pressMessage = (item) => {
        const { type, id } = item;

        if (type === 'text') {
            Alert.alert(
                'Delete Message',
                'Are you sure you want to delete this message?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Delete', onPress: () => this.props.onDeleteMessage(id) },
                ],
                { cancelable: true }
            );
        } else if (type === 'image') {
            this.handleImagePress(id);
        }
    };

    renderMessageItem = ({ item }) => {
        const { onPressMessage } = this.props;
        return (
            <View style={styles.messageRow}>
                <TouchableOpacity onPress={() => {
                    this.pressMessage(item);
                }}>
                    {this.renderMessageBody(item)}
                </TouchableOpacity>
            </View>
        );
    };

    renderMessageBody = ({ type, text, uri, coordinate }) => {
        switch (type) {
            case 'text':
                return (
                    <View style={styles.messageBubble}>
                        <Text style={styles.messageText}>{text}</Text>
                    </View>
                );
            case 'image':
                return <Image style={styles.image} source={{ uri }} />;
            case 'location':
                return (
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            ...coordinate,
                            latitudeDelta: 0.08,
                            longitudeDelta: 0.04,
                        }}
                    >
                        <Marker coordinate={coordinate} />
                    </MapView>
                );
            default:
                return null;
        }
    };

    render() {
        const { messages } = this.props;
        const { fullscreenImageId } = this.state;
        const fullscreenImageUri = messages.find(message => message.id === fullscreenImageId)?.uri;

        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.list}
                    inverted
                    data={messages}
                    renderItem={this.renderMessageItem}
                    keyExtractor={keyExtractor}
                    keyboardShouldPersistTaps="handled"
                />
                {/* Fullscreen Modal */}
                <Modal
                    visible={fullscreenImageId !== null}
                    transparent={true}
                    onRequestClose={this.dismissFullscreenImage}
                >
                    <View style={styles.modalContainer}>
                        <TouchableOpacity style={styles.modalBackground} onPress={this.dismissFullscreenImage}>
                            <Image
                                style={styles.fullscreenImage}
                                source={{ uri: fullscreenImageUri }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        flex: 1,
    },
    messageRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginLeft: 60,
        marginRight: 10,
        marginVertical: 3,
    },
    messageBubble: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 15,
    },
    messageText: {
        color: 'white',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 8,
    },
    map: {
        width: 150,
        height: 100,
        borderRadius: 8,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalBackground: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fullscreenImage: {
        width: width,
        height: height,
        borderRadius: 0,
    },
});
