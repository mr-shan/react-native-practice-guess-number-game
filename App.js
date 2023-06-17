import { useState } from "react";

import { StatusBar } from "expo-status-bar";
import { StyleSheet, ImageBackground, SafeAreaView, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import NumberInput from "./screens/NumberInput";
import MainGame from "./screens/MainGame";
import GameOver from "./screens/GameOver";

import COLORS from "./helpers/colors";

export default function App() {
  const [selectedNum, setSelectedNum] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [guessRequired, setGuessRequired] = useState(0)

  const onGameOverHandler = (result) => {
    setIsGameOver(true);
    setGuessRequired(result);
  };

  const restartGameHandler = () => {
    setSelectedNum(null);
    setIsGameOver(false);
  };

  let currentScreen = <NumberInput onNumberSelection={setSelectedNum} />;

  if (selectedNum && !isGameOver) {
    currentScreen = (
      <MainGame selectedNumber={selectedNum} onGameOver={onGameOverHandler} />
    );
  }

  if (isGameOver) {
    currentScreen = (
      <GameOver 
        selectedNumber={selectedNum} 
        onRestart={restartGameHandler} 
        guessRequired={guessRequired}
      />
    );
  }

  return (
    <LinearGradient
      colors={[COLORS.PRIMARY_500, COLORS.ACCENT_500]}
      style={styles.container}
    >
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
