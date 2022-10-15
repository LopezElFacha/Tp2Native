import { StyleSheet, ImageBackground } from "react-native";
import React, { useState, useContext } from "react";
import { Context } from "../App";

export default function Bg({ children }) {
  const [image, setimage] = useContext(Context);
  return (
    <ImageBackground
      source={{ uri: image }}
      resizeMode="contain"
      style={styles.image}
    >
      {children}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
    image: {
      flex: 1,
      justifyContent: "center",
      width: "100%",
      height: "100%",
    },
  });
  