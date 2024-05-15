import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Image, SafeAreaView, View, Pressable, ScrollView} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useColorScheme } from "nativewind";


function Scanner() {
  const { colorScheme } = useColorScheme();
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
        <View>
          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: 400,
                height: 300,
                objectFit: "contain",
                zIndex: 10,
              }}
            />
          )}
        </View>
        <Text style={styles.processingText}>{processing ? "Processing..." : ""}</Text>
        <Text style={styles.extractedText}>{!processing && extractedText}</Text>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <View className="bg-gray-300 dark:bg-gray-900" style={styles.semicircleStyle}></View>
        <Pressable onPress={pickImageCamera} style={[styles.button, {shadowColor: colorScheme === "dark"? "white" : "black"}]}>
          <Text style={{ color: "white", fontSize: 20 }}>📷</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
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
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    paddingBottom: -10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    borderWidth: 10
  },
  button: {
    position: "absolute",
    borderRadius: 70,
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 70,
    backgroundColor: "#ffaa59",
    elevation: 20,
  },
  semicircleStyle: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: 85,
    height: 42.5, // Half of the original height
    borderBottomLeftRadius: 42.5, // Half of the width
    borderBottomRightRadius: 42.5, // Half of the width
    bottom: -42,
  }
  
});

export { Scanner };
