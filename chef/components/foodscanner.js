import { StatusBar } from "expo-status-bar"; 
import { useState } from "react"; 
import { Button, StyleSheet, Text, Image, SafeAreaView, Pressable } from "react-native"; 
import * as ImagePicker from "expo-image-picker";
import TesseractOcr, { LANG_ENGLISH } from 'react-native-tesseract-ocr';

function FoodScanner() {
  const [image, setImage] = useState(null); 
  const [extractedText, setExtractedText] = useState(""); 
  
  const pickImageCamera = async () => { 
    let result = await ImagePicker.launchCameraAsync({ 
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true, 
      base64: true, 
      allowsMultipleSelection: false, 
    }); 
    if (!result.canceled) { 
      setImage(result.uri); 
      performOCR(result.uri); 
    } 
  }; 

const performOCR = async (uri) => {
  try {
    if (TesseractOcr) { // Check if TesseractOcr is available
      const result = await TesseractOcr.recognize(uri, LANG_ENGLISH);
      setExtractedText(result);
    } else {
      console.warn("TesseractOcr is not yet initialized");
    }
  } catch (err) {
    console.error(err);
  }
};

  return ( 
    <SafeAreaView > 
      <Pressable
        onPress={pickImageCamera}
        style={styles.button}
      >
        <Text style={{ color: 'white' }}>📷</Text>
      </Pressable>
      {image && ( 
        <Image 
          source={{ uri: image }} 
          style={{ 
            width: 400, 
            height: 300, 
            objectFit: "contain", 
          }} 
        /> 
      )} 
	  <Text style={styles.text1}>{extractedText}</Text>
      <StatusBar style="auto" /> 
    </SafeAreaView> 
  ); 
} 

const styles = StyleSheet.create({ 
  text1: { 
    fontSize: 16, 
    marginBottom: 10, 
    color: "black", 
    fontWeight: "bold", 
  }, 
  button: {
	backgroundColor: 'blue',
	padding: 10,
	borderRadius: 10,
  }
});

export { FoodScanner };
