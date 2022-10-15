import { View, Text, Image, Button } from "react-native";
import React, { useState, useEffect } from "react";
import MensajeUsuario from "../helpers/MensajeUsuario";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function Qr() {
  const [Status, setStatus] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState();
  useEffect(() => {
    (async () => {
      const cameraPermission = await BarCodeScanner.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
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
      <BarCodeScanner
        style={{width: "100%", height:"100%"}}
        onBarCodeScanned={({ type, data }) => {
          MensajeUsuario(data);
          setStatus(false);
        }}
      />
    );
  return (
    <View>
      <Image source={require("../assets/qrcode.png")} style={{width: 200, height:200}}/>
      <Button title="scan" onPress={() => setStatus(true)} />
    </View>
  );
}
