import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Image, SafeAreaView, View, Pressable, ScrollView, useColorScheme } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { BottomNavigator } from "./bottomnavigator";
import Icon from 'react-native-vector-icons/Ionicons'

function Scanner() {
  const colorScheme = useColorScheme();
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [processing, setProcessing] = useState(false); // State for showing processing indicator

  const pickImageGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      base64: true,
      allowsMultipleSelection: false,
    });
    if (!result.canceled) {
      performOCR(result.assets[0]);
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
      performOCR(result.assets[0]);
      setImage(result.assets[0].uri);
    }
  };

  const performOCR = (file) => {
    setProcessing(true); // Show processing indicator

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

    fetch("https://api.apilayer.com/image_to_text/upload", requestOptions)
      .then((response) => response.json())
      .then(async (result) => {
        setExtractedText(result["all_text"]);
        await saveTextToFile(result["all_text"]);
        console.log(result["all_text"]);
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setProcessing(false); // Hide processing indicator after OCR is completed
      });
  };

  const saveTextToFile = async (text) => {
    const directory = `${FileSystem.documentDirectory}components`;
    const fileUri = `${directory}/food_label_details.txt`;

    try {
      await FileSystem.makeDirectoryAsync(directory, { intermediates: true });
      await FileSystem.writeAsStringAsync(fileUri, text);
      console.log("Text saved to file successfully");
    } catch (error) {
      console.error("Error saving text to file:", error);
    }
  };
  

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.imageContainer}>
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
        </View>
        <Text style={styles.processingText}>{processing ? "Processing..." : ""}</Text>
        <Text style={styles.extractedText}>{!processing && extractedText}</Text>
      </ScrollView>
        <Pressable onPress={pickImageCamera} style={styles.button}>
          <Icon name='scan' style={{fontSize: 25}}/>
        </Pressable>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flex: 1,
    marginTop: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 60,
  },
  imageContainer: {
    marginBottom: 20,
  },
  processingText: {
    fontSize: 16,
    marginBottom: 10,
    color: "black",
    fontWeight: "bold",
  },
  extractedText: {
    fontSize: 16,
    marginBottom: 10,
    color: "black",
    fontWeight: "bold",
  },
  button: {
    position: 'absolute',
    backgroundColor: "#ffaa59",
    padding: 10,
    borderRadius: 70,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    zIndex: 3,
    bottom: 20,
    left: -25,
  },
});

export { Scanner };
