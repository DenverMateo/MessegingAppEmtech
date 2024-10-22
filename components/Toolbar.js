import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Toolbar = () => {
    return(
        <View style = {styles.ToolbarContainer}>
            <Text>
                Toolbar
            </Text>
        </View>
    );
};

export default Toolbar;

const styles = StyleSheet.create({
    ToolbarContainer: {
      padding: 10,
      alignItems: 'center',
      flex: 1,
    },
  });


