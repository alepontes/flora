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

    const [loading, setLoading] = useState(true);

    const [title, setTitle] = useState('');
    const [info, setInfo] = useState('');


    const { getContentByImage, selectLabel, getInfo } = (new Services());

    useEffect(() => {
      getContentByImage(photo)
      .then(selectLabel)
      .then(getInfo)
      .then((response: any) => {
          const { title, extract } = response;
          setTitle(title);
          setInfo(extract);
          setLoading(false);
      })
      .then(error => {
          console.log('ERRO AO CHAMAR WIKIPEDIA');
          console.log(error);
      });
    });

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

            { loading ? loadingComponent() : content(title, '99', info) }

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    imageContainer: {
        zIndex: 10,
        backgroundColor: 'red',
    },
    image: {
        width: '100%',
        height: 300,
    },
    content: {
        flex: 2,
    },
    header: {
        flexDirection: 'row',
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