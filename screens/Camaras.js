import { View, Text, Button, Alert } from "react-native";
import React, { useRef, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { Camera } from "expo-camera";
import { Context } from "../App";
import Bg from "../helpers/Bg";

export default function Camaras() {
  const [image, setimage] = useContext(Context);
  const [Status, setStatus] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const cameraRef = useRef();
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    if (!result.cancelled) {
      await AsyncStorage.setItem("bg", result.uri);
      setimage(result.uri);
    }
  };
  let takePic = async () => {
    try {
      let options = {
        quality: 1,
        base64: true,
        exif: false,
      };
      setStatus(false);
      let newPhoto = await cameraRef.current.takePictureAsync(options);
      await MediaLibrary.saveToLibraryAsync(newPhoto.uri);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission =
        await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);
  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }
  if (Status)
    return (
      <Camera
        ref={cameraRef}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Button title="Tomar foto" onPress={takePic} />
      </Camera>
    );
  return (
    <Bg>
      <View>
        <Button title="Seleccionar Imagen" onPress={pickImage} />
        <Button title="Tomar Imagen" onPress={() => setStatus(true)} />
      </View>
    </Bg>
  );
}
