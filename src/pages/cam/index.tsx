import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';
// import { Camera } from 'expo-camera';
import Camera from 'expo-camera/build/Camera';

export default function Cam({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  let camera: any;


  useEffect(() => {
    (async () => {
      if (Platform.OS === 'web') {
        setHasPermission(true);
      } else {
        const { status } = await Camera.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      }
    })();
  }, []);

  const snap = async () => {
    if (camera) {
      let photo = await camera.takePictureAsync();
      navigation.navigate('Resume', {
        photo,
      });
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera style={{ flex: 1 }} type={type}   ref={ref => { camera = ref; }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              // flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'transparent',
              height: 90,
              width: 90,
              borderRadius: 50,
              borderColor: '#A8EC8F',
              borderWidth: 2,
              // borderColor
            }}
            onPress={() => snap()}>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
