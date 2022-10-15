import { Alert, Vibration } from "react-native";

export default function(msg){
    Vibration.vibrate()
    Alert.alert(msg)
}