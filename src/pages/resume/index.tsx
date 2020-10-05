import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Services } from '../../services/service';

const loadingComponent = () => {
    return (
        <View style={styles.loadingConteiner}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
}

const content = (title: string, percentage: string, info: string) => {
    return (
        <View style={styles.content}>
            <View style={styles.header}>
                <Text style={styles.title}>{ title }</Text>
                <Text style={styles.subtitle}>{percentage}%</Text>
            </View>

            <Text style={styles.info}>
              { info }
            </Text>
        </View>
    );
}


export default function DetailsScreen({ route }) {

    const { photo } = route.params;

    const service = new Services();
    const labels = service.getContentByImage(photo);
    const label = service.selectLabel(labels);

    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState('');
    const [info, setInfo] = useState('');

    service.getInfo(label)
        .then(({ title, extract }) => {
            setTitle(title);
            setInfo(extract);
            setLoading(false);
        })
        .then(response => {
            console.log('ERRO');
        })

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

            { loading ? loadingComponent() : content(title, label.Confidence.toFixed(), info) }

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
    },
    loadingConteiner: {
        flex: 1,
        justifyContent: 'center',
    }
});