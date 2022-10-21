import { View, Text ,TextInput} from 'react-native'
import React, { useState } from 'react'
import Video from 'react-native';
import { StyleSheet, ImageBackground } from "react-native";
import { WebView } from 'react-native-webview';


export default function VideoFavorito() {
    const [url,setUrl] = useState("");
  
  return (
    <>
    <View>
      <TextInput style={styles.input} onChangeText={(text) => setUrl(text)}/>
    </View>
          <WebView
    style={{flex:1}}
    javaScriptEnabled={true}
    source={{uri: url}}
/>
    </>



  )
  
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});