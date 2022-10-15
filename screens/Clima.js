import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import MensajeUsuario from "../helpers/MensajeUsuario";

export default function Clima() {
  const [location, setLocation] = useState(false);
  const [Clima, setClima] = useState(false)

  useEffect(() => {
    const Api = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          MensajeUsuario("Permission to access location was denied");
          return;
        }
        let reslocation = await Location.getCurrentPositionAsync({});
        setLocation(reslocation);
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${reslocation.coords.latitude}&lon=${reslocation.coords.longitude}&lang=sp&appid=467eb2e2a1738c82e813a30610d7c354`
        );
        const data = await res.json();
        setClima(data.weather[0].main)
      } catch (error) {
        console.log(error);
        MensajeUsuario(error);
      }
    };
    Api();
  }, []);
  return (
    <View>
      {location && (
        <Text>
          Coordenadas: lat: {location.coords.latitude} lon:{" "}
          {location.coords.longitude}
        </Text>
      )}
      {Clima && (
        <Text>
          Clima: {Clima}
        </Text>
      )}
    </View>
  );
}
