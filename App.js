import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Principal from './screens/Principal';
import Qr from './screens/Qr';
import VideoFavorito from './screens/VideoFavorito';
import NumeroEmergencia from './screens/NumeroEmergencia';
import Clima from './screens/Clima';
import Contactos from './screens/Contactos';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Principal" component={Principal} />
        <Stack.Screen name="Qr" component={Qr} />
        <Stack.Screen name="VideoFavorito" component={VideoFavorito} />
        <Stack.Screen name="NumeroEmergencia" component={NumeroEmergencia} />
        <Stack.Screen name="Clima" component={Clima} />
        <Stack.Screen name="Contactos" component={Contactos} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
