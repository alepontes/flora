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

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Tulipa</Text>
                    <Text style={styles.subtitle}>87%</Text>
                </View>

                <Text style={styles.info}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </Text>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // position: 'relative',
        flex: 1, 
        // flexDirection: 'row',
        // alignItems: 'center', 
        // justifyContent: 'center' 
    },
    imageContainer: {
        // flex: 1,
        zIndex: 10,
        backgroundColor: 'red',
        // width: '100%',
        // height: 30,
    },
    image: {
        // flex: 1, 
        // alignItems: 'center', 
        // justifyContent: 'center',
        // backgroundColor: 'red',
        width: '100%',
        height: 300,
    },
    content: {
        flex: 2,
        // backgroundColor: '#E8B391',
        // zIndex: 10,
        // flex: 1,
        // flexDirection: 'row',
        // justifyContent: 'center'
    },
    header: {
        // flex: 1,
        flexDirection: 'row',
        // backgroundColor: '#5488FF',
        padding: 10,
        alignItems: 'baseline',
    },
    title: {
        fontSize: 30,
        marginRight: 10,
    },
    subtitle: {
        fontSize: 40,
    },
    info: {
        fontSize: 20,
        paddingLeft: 10,
        paddingRight: 10,
    }
});