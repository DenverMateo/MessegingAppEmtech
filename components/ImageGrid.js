import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ImaeGrid = () => {
    return(
        <View style = {styles.ImaeGridContainer}>
            <Text>
                Image Grid
            </Text>
        </View>
    );
};

export default ImaeGrid;

const styles = StyleSheet.create({
    ImaeGridContainer: {
      padding: 10,
      alignItems: 'center',
      flex: 1,
    },
  });


