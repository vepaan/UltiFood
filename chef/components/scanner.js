import { StatusBar } from "expo-status-bar"; 
import { useState } from "react"; 
import { Button, StyleSheet, Text, Image, SafeAreaView, Pressable } from "react-native"; 
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

function Scanner() {
  // State to hold the selected image 
  const [image, setImage] = useState(null); 
  // State to hold extracted text 
  const [extractedText, setExtractedText] = useState(""); 

  // Function to pick an image from the device's gallery 
  const pickImageGallery = async () => { 
    let result = await ImagePicker.launchImageLibraryAsync({ 
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true, 
      base64: true, 
      allowsMultipleSelection: false, 
    }); 
    if (!result.canceled) { 
      // Perform OCR on the selected image 
      performOCR(result.assets[0]); 
      // Set the selected image in state 
      setImage(result.assets[0].uri); 
    } 
  }; 

  // Function to capture an image using the device's camera 
  const pickImageCamera = async () => { 
    let result = await ImagePicker.launchCameraAsync({ 
      mediaTypes: ImagePicker.MediaTypeOptions.Images, 
      allowsEditing: true, 
      base64: true, 
      allowsMultipleSelection: false, 
    }); 
    if (!result.canceled) { 
      // Perform OCR on the captured image 
      // Set the captured image in state 
      performOCR(result.assets[0]); 
      setImage(result.assets[0].uri); 
    } 
  }; 

  // Function to perform OCR on an image and extract text 
  const performOCR = (file) => { 
    let myHeaders = new Headers(); 
    myHeaders.append("apikey", "FEmvQr5uj99ZUvk3essuYb6P5lLLBS20");
    myHeaders.append("Content-Type", "multipart/form-data");

    let raw = file; 
    let requestOptions = { 
      method: "POST", 
      redirect: "follow", 
      headers: myHeaders, 
      body: raw, 
    }; 

    // Send a POST request to the OCR API 
    fetch("https://api.apilayer.com/image_to_text/upload", requestOptions) 
      .then((response) => response.json()) 
      .then(async (result) => { 
        // Set the extracted text in state 
        setExtractedText(result["all_text"]); 
        // Save the extracted text to a file
        await saveTextToFile(result["all_text"]);
      }) 
      .catch((error) => console.log("error", error)); 
  }; 

  // Function to save text to a file
  const saveTextToFile = async (text) => {
    const fileUri = `.\components\food_label_details.txt`;
    try {
      await FileSystem.writeAsStringAsync(fileUri, text);
      console.log("Text saved to file successfully");
    } catch (error) {
      console.error("Error saving text to file:", error);
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
      <StatusBar style="auto" /> 
	  <Text style={styles.text1}>{extractedText}</Text>
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

export { Scanner };
