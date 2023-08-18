import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useCameraDevices, Camera } from 'react-native-vision-camera';

export default function App() {
  const devices = useCameraDevices();
  const device = devices.front;

  if (device == null) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
      <View style={styles.overlay}>
        <View style={styles.transparentMask} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transparentMask: {
    width: 200, // Adjust the size of the transparent center mask as needed
    height: 200, // Adjust the size of the transparent center mask as needed
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'white',
  },
});
