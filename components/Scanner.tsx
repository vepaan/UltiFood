import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StyleSheet, Text, Image, SafeAreaView, Pressable } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import {RequestInit} from "@/types/custom";


function Scanner() {
  // State to hold the selected image
  const [image, setImage] = useState<null| string>(null);
  // State to hold extracted text
  const [extractedText, setExtractedText] = useState("");

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

  // textnikalne
  const performOCR = (file: ImagePicker.ImagePickerAsset) => {
    let myHeaders = new Headers();
    myHeaders.append("apikey", process.env.EXPO_PUBLIC_OCR_API_KEY || "");
    myHeaders.append("Content-Type", "multipart/form-data");


    const requestOptions: RequestInit = {
      method: "POST",
      redirect: "follow",
      headers: myHeaders,
      body: file as any,
    };

    // ocr api
    fetch("https://api.apilayer.com/image_to_text/upload", requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        // Set the extracted text in state
        if (result["all_text"] !== undefined){
          setExtractedText(result["all_text"]);
          await saveTextToFile(result["all_text"]);
        }else{
          setExtractedText("No text found");
          await saveTextToFile("No text found");
        }
        
        //? Testing
        // console.log(result["all_text"]);
      })
      .catch((error) => console.log("error", error));
  };


  // text save hann
  const saveTextToFile = async (text:string) => {
    const directory = `${FileSystem.documentDirectory}`;
    const fileUri = `${directory}food_label_details.txt`;

    try {
      // Ensure the directory exists
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });

      // Write to the file
      await FileSystem.writeAsStringAsync(fileUri, text);
      console.log("Text saved to file successfully");
    } catch (error) {
      console.error("Error saving text to file:", error);
    }
  };

  return (
    <SafeAreaView>
      <Pressable onPress={pickImageCamera} style={styles.button}>
        <Text style={{ color: "white" }}>📷</Text>
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
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 10,
  },
});

export { Scanner };
