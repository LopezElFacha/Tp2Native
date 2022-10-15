import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MensajeUsuario from "../helpers/MensajeUsuario";
import Bg from "../helpers/Bg";

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

  useEffect(() => {
    getData();
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
