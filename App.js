import React, { useEffect, useState, createContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Principal from "./screens/Principal";
import Qr from "./screens/Qr";
import VideoFavorito from "./screens/VideoFavorito";
import NumeroEmergencia from "./screens/NumeroEmergencia";
import Clima from "./screens/Clima";
import Contactos from "./screens/Contactos";
import Camaras from "./screens/Camaras";

const Stack = createNativeStackNavigator();

export const Context = createContext();

export default function App() {
  const [image, setimage] = useState(null);
  
  useEffect(() => {
    
    const Imagen = async () => {
      setimage(await AsyncStorage.getItem("bg"));
    };
    Imagen();
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
