import { View, Text ,TextInput} from 'react-native'
import React, { useEffect,useState } from 'react'
import Video from 'react-native';
import { StyleSheet, ImageBackground } from "react-native";
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function VideoFavorito({route,navigation}) {
    const [url,setUrl] = useState("");

    
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("favUrl");
        if (value !== null) {
          setUrl(value);
        }
      } catch (e) {
        MensajeUsuario(e);
      }
    };
    const storeData = async (value) => {
      try {
        await AsyncStorage.setItem('favUrl', value)
      } catch (e) {
        // saving error
      }
    }
    useEffect(() => {
      getData()
  },[]);

    useEffect(() => {
        storeData(url)
        setUrl(url)
    },[url]);
  
  return (
    <>
    <View>
      <TextInput style={styles.input} onChangeText={(text) => setUrl(text)} value={url}/>
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