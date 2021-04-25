import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Button,
} from 'react-native';
import {RNCamera} from 'react-native-camera'

const PendingView = () => (
  <View
  style={{
    flex: 1,
    justifyContent: "center",
    alignItem: "center"
  }}
  >
    <Text style={{fontSize: 30, color:'red'}}>Loading...</Text>
  </View>
)

const App = () => {
  const [image, setImage] = useState(null)

  const takePicture = async (camera) => {
    try {
      const options = {quality: 0.9, base64: false}
      const data = await camera.takePictureAsync(options)
      setImage(data.uri)
    } catch (error) {
      console.warn(error);
    }
  }

  return (
    <View style={styles.container}>
    {image ? (
      <View style={styles.preview}>
        <Text style={styles.camtext}>Here is your new profile pic</Text>
        <Image style={styles.clicked} source={{uri: image, width: '100%', height: '80%'}} />
        <Button
        title='Click new Image'
        onPress={() => {
          setImage(null)
        }}
        ></Button>
      </View>
    ) : (
      <RNCamera
      style={styles.preview}
      type={RNCamera.Constants.Type.back}
      captureAudio={false}
      flashMode={RNCamera.Constants.FlashMode.auto}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'Longer text to use camera',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel'
      }}
      androidRecordAudioPermissionOptions={{
        title: 'Permission to use audio',
        message: 'Longer text to use audio',
        buttonPositive: 'OK',
        buttonNegative: 'Cancel'
      }}
      >
        {({camera, status}) => {
          if(status !== 'READY') return <PendingView/>
          return(
            <View
            style={{
              flex: 0,
              flexDirection: 'row',
              justifyContent: 'center'
            }}
            >
              <TouchableOpacity
              style={styles.capture}
              onPress={() => takePicture(camera)}
              >
                <Text>SNAP</Text>
              </TouchableOpacity>
            </View>
          )
        }}
      </RNCamera>
    )}
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#0a79df'
  },
  preview: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: 'orange',
    padding: 20,
    alignSelf: 'center',
  },
  camtext: {
    backgroundColor: '#3498db',
    color: '#ffffff',
    marginBottom: 10,
    width: '100%',
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 25
  },
  clicked: {
    width: 300,
    height: 300,
    borderRadius: 150
  }
});

export default App;