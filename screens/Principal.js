import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MensajeUsuario from "../helpers/MensajeUsuario";
import { Accelerometer } from "expo-sensors";
import Bg from "../helpers/Bg";
import * as SMS from 'expo-sms';

export default function Principal({ navigation, route }) {
  const [numEmergencia, setNumEmergencia] = useState(null);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("numEmergencia");
      if (value !== null) {
        setNumEmergencia(value);
      }
    } catch (e) {
      MensajeUsuario(e);
    }
  };
  const [subscription, setSubscription] = useState(null);
  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(async (accelerometerData) => {
        try {
          const aceleracion = Math.sqrt(
            accelerometerData.x * accelerometerData.x +
              accelerometerData.y * accelerometerData.y +
              accelerometerData.z * accelerometerData.z
          );
          const sensibilidad = 1.8;
          if (aceleracion >= sensibilidad) {
            const isAvailable = await SMS.isAvailableAsync();
            if (isAvailable) {
              await SMS.sendSMSAsync(await AsyncStorage.getItem("numEmergencia"), "Me agitaron xd");
            } else {
              MensajeUsuario("No te funkan los SMS");
            }
          }
        } catch (error) {
          console.log.log(error)
        }
      })
    );
  };
  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    Accelerometer.setUpdateInterval(1000);
    getData();
    
    return () => _unsubscribe();
  }, []);

  return (
    <Bg>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Button title="Qr" onPress={() => navigation.navigate("Qr")} />
        <Button
          title="Video Favorito"
          onPress={() => navigation.navigate("VideoFavorito")}
        />
        <Button
          title="Numero Emergencia"
          onPress={() =>
            navigation.navigate("NumeroEmergencia", { setNumEmergencia })
          }
        />
        <Button title="Clima" onPress={() => navigation.navigate("Clima")} />
        <Button
          title="Contactos"
          onPress={() => navigation.navigate("Contactos", { numEmergencia })}
        />
        <Button
          title="Camaras"
          onPress={() => navigation.navigate("Camaras")}
        />
      </View>
    </Bg>
  );
}
