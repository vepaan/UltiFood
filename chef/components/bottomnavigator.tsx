import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { useColorScheme } from 'nativewind';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import FeatherIcon from 'react-native-vector-icons/Feather'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import IonIcon from 'react-native-vector-icons/Ionicons'
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useNavigation } from '@react-navigation/native';
import { Recommended, Header} from './home';


function BottomNavigator(){
  const {colorScheme, setColorScheme} = useColorScheme();
  const [bgColorsemicircle, setbgColorsemicircle] = useState(colorScheme === 'dark' ? '#111827' : '#d1d5db');
  const [bgColorrectangle, setbgColorrectangle] = useState(colorScheme === 'dark' ? '#374151' : '#eff0f4')
  const [coloricons, setcoloricons] = useState(colorScheme === 'dark' ? '#ffdec4' : 'black')
  const [key, setKey] = useState(0);
  const [image, setImage] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [processing, setProcessing] = useState(false); // State for showing processing indicator

  const navigation = useNavigation();

  const handlePress = () => {
    pickImageCamera();
    navigation.navigate('Scanner');
  };


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

  useEffect(() => {
    setbgColorsemicircle(colorScheme === 'dark' ? '#111827' : '#d1d5db');
    setbgColorrectangle(colorScheme === 'dark' ? '#374151' : '#eff0f4');
    setcoloricons(colorScheme === 'dark' ? '#ffdec4' : 'black');
  }, [colorScheme]);

  return (
    <View style={styles.container}>
      <Recommended />
      <View style={{ ...styles.rectangle, backgroundColor: bgColorrectangle}}></View>
      <View style={{ ...styles.semicircle, backgroundColor: bgColorsemicircle }}></View>
      <View style={styles.circle}></View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonGroup}>
          <FontistoIcon name="home" style={{ ...styles.icon, left:20, color:coloricons}} />
          <FeatherIcon name="heart" style={{ ...styles.icon, left:90, color:coloricons}} />
          <FeatherIcon name="book-open" style={{ ...styles.icon, right:90, color:coloricons}} />
          <FontAwesomeIcon name="user" style={{ ...styles.icon, right:20, color:coloricons}} />
        </View>
      </View>
      <Pressable onPress={handlePress} style={styles.scannerbutton}>
          <IonIcon name='scan' style={{fontSize: 25}}/>
      </Pressable>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  rectangle: {
    width: '100%',
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  semicircle: {
    position: 'absolute',
    height: 43,
    width: 87,
    borderBottomLeftRadius: 43,
    borderBottomRightRadius: 43,
    bottom: 12,
    zIndex: 2,
  },
  circle: {
    position: 'absolute',
    height: 75,
    width: 75,
    borderRadius: 90,
    bottom: 17.5,
    backgroundColor: '#ffdec4',
    zIndex:2,
  },
  buttonsContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  scannerbutton: {
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
    left: 161.3,
  },
  icon: {
    position: 'absolute',
    fontSize: 20,
    bottom:9,
    zIndex: 1,
  }
});

export {BottomNavigator};
