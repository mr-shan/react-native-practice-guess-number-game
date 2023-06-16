import { useState } from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import NumberInput from "./screens/NumberInput";
import MainGame from "./screens/MainGame";

export default function App() {
  const [selectedNum, setSelectedNum] = useState(null);

  let currentScreen = <NumberInput onNumberSelection={setSelectedNum} />;

  if (selectedNum) currentScreen = <MainGame />;

  return (
    <LinearGradient colors={["#93012a", "#ff9f3f"]} style={styles.container}>
      <StatusBar style="light" />
      <ImageBackground
        source={require("./assets/images/dice.png")}
        style={styles.container}
        resizeMode="cover"
        imageStyle={{ opacity: 0.28 }}
      >
        <SafeAreaView style={styles.container}>{currentScreen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
