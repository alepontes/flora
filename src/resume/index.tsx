import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';


export default function DetailsScreen({ route }) {

    const { photo } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={{
                    uri: photo.uri
                  }}          
                />
            </View>

            <View style={styles.header}>
                <Text>Tulipa</Text>
                <Text>87%</Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        // alignItems: 'center', 
        // justifyContent: 'center' 
    },
    image: {
        // flex: 1, 
        // alignItems: 'center', 
        // justifyContent: 'center',
        // backgroundColor: 'red',
        width: '100%',
        height: '100%',
    },
    header: {
        flex: 1,
        // justifyContent: 'center'
    },
    imageContainer: {
        backgroundColor: 'red',
        width: '100%',
        height: '30%',
    },
    title: {},
    subtitle: {},
});