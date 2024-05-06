import React, { useRef } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { TextDetector } from 'react-native-text-detector';

const CameraScanner = () => {
  const cameraRef = useRef(null);

  const handleTextDetection = async () => {
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);

      try {
        const { textBlocks } = await TextDetector.detectFromUri(data.uri);
        console.log('Detected Text:', textBlocks);
      } catch (error) {
        console.error('Text detection error:', error);
      }
    }
  };

  const handleButtonPress = () => {
    handleTextDetection(); // You can add any other logic you want to execute when the button is pressed
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleButtonPress}>
        <RNCamera
          ref={cameraRef}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.auto}
          autoFocus={RNCamera.Constants.AutoFocus.on}
          onTextRecognized={handleTextDetection}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          }}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

export default CameraScanner;
