import React, { useEffect, useState, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Accelerometer } from "expo-sensors";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Principal from "./screens/Principal";
import Qr from "./screens/Qr";
import VideoFavorito from "./screens/VideoFavorito";
import NumeroEmergencia from "./screens/NumeroEmergencia";
import Clima from "./screens/Clima";
import Contactos from "./screens/Contactos";
import Camaras from "./screens/Camaras";
import MensajeUsuario from "./helpers/MensajeUsuario";

const Stack = createNativeStackNavigator();

export const Context = createContext();

export default function App() {
  const [image, setimage] = useState(null);
  const [subscription, setSubscription] = useState(null);
  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener(async (accelerometerData) => {
        const aceleracion = Math.sqrt(
          accelerometerData.x * accelerometerData.x +
            accelerometerData.y * accelerometerData.y +
            accelerometerData.z * accelerometerData.z
        );
        const sensibilidad = 1.8;
        if (aceleracion >= sensibilidad) {
          const isAvailable = await SMS.isAvailableAsync();
          if (isAvailable) {
            await SMS.sendSMSAsync("1122787212", "Me agitaron xd");
          } else {
            MensajeUsuario("No te funkan los SMS");
          }
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
    const Imagen = async () => {
      setimage(await AsyncStorage.getItem("bg"));
    };
    Imagen();
    return () => _unsubscribe();
  }, []);
  console.log(image);
  return (
    <Context.Provider value={[image, setimage]}>
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Principal" component={Principal} />
            <Stack.Screen name="Qr" component={Qr} />
            <Stack.Screen name="VideoFavorito" component={VideoFavorito} />
            <Stack.Screen
              name="NumeroEmergencia"
              component={NumeroEmergencia}
            />
            <Stack.Screen name="Clima" component={Clima} />
            <Stack.Screen name="Contactos" component={Contactos} />
            <Stack.Screen name="Camaras" component={Camaras} />
        </Stack.Navigator>
      </NavigationContainer>
    </Context.Provider>
  );
}
