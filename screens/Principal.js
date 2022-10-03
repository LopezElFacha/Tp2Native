import { View, Text, Button } from 'react-native'
import React from 'react'

export default function Principal({navigation, route}) {

  return (
    <View style={{flex:1, alignItems: "center", justifyContent: "space-around"}}>
      <Button title='Qr' onPress={()=>navigation.navigate("Qr")} />
      <Button title='Video Favorito' onPress={()=>navigation.navigate("VideoFavorito")} />
      <Button title='Numero Emergencia' onPress={()=>navigation.navigate("NumeroEmergencia")} />
      <Button title='Clima' onPress={()=>navigation.navigate("Clima")} />
      <Button title='Contacto' onPress={()=>navigation.navigate("Contacto")} />
    </View>
  )
}