import { View, Text, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "./../helpers/colors";
import NumberButton from "../components/NumberButton";
import { useEffect, useState } from "react";

const generateRandomBetween = (min, max, exclude) => {
  console.log(min, max, exclude);

  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

let minBoundary = 1;
let maxBoundary = 100;

export default ({ selectedNumber, onGameOver }) => {
  const [currentGuess, setCurrentGuess] = useState("");

  const buttonClickHandler = (direction) => {
    if (
      (direction === "LOW" && currentGuess < selectedNumber) ||
      (direction === "HIGH" && currentGuess > selectedNumber)
    ) {
      Alert.alert("Come On!!", "Don't Lie! You know that this is wrong...", [
        { text: "Try Again!", style: "cancel" },
      ]);

      return;
    }

    if (direction === "LOW") maxBoundary = currentGuess;
    else minBoundary = currentGuess;

    const newGuess = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );

    setCurrentGuess(newGuess);

    if (newGuess === selectedNumber) {
      onGameOver(true);
    }
  };

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
    const initialGuess = generateRandomBetween(1, 100, selectedNumber);
    setCurrentGuess(initialGuess);
  }, []);

  return (
    <View style={styles.numberCard}>
      <Text style={styles.header}>Let me guess the number...</Text>

      <View style={styles.guessedNumberWrapper}>
        <Text style={styles.guessedNumberText}>{currentGuess}</Text>
      </View>

      <View style={styles.instruction}>
        <Text style={styles.instructionText}>Higher or Lower?</Text>
      </View>

      <View style={styles.buttons}>
        <View style={styles.buttonWrapper}>
          <NumberButton onPress={buttonClickHandler.bind(this, "LOW")}>
            <Ionicons name="md-remove" size={36} />
          </NumberButton>
        </View>
        <View style={styles.buttonWrapper}>
          <NumberButton onPress={buttonClickHandler.bind(this, "HIGH")}>
            <Ionicons name="md-add" size={36} />
          </NumberButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    color: COLORS.SHADE_100,
    fontSize: 24,
    padding: 20,
    textAlign: "center",
    fontWeight: "bold",
  },

  numberCard: {
    margin: 8,
    marginTop: Platform.OS === "ios" ? 20 : 50,
    alignSelf: "center",
    elevation: 5,
    shadowColor: COLORS.SHADE_900,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderRadius: 20,
    backgroundColor: COLORS.PRIMARY_500,
    paddingVertical: 20,
    paddingHorizontal: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  guessedNumberWrapper: {
    padding: 36,
    borderRadius: 20,
    backgroundColor: COLORS.PRIMARY_400,
    width: 200,
    marginVertical: 20,
    elevation: 5,
    shadowColor: COLORS.SHADE_900,
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },

  guessedNumberText: {
    color: COLORS.ACCENT_500,
    fontSize: 64,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
  },

  instruction: {
    marginTop: 40,
  },

  instructionText: {
    textAlign: "center",
    color: COLORS.SHADE_100,
    fontSize: 18,
    fontWeight: "bold",
  },

  buttons: {
    flexDirection: "row",
    width: 200,
    alignSelf: "center",
  },

  buttonWrapper: {
    flex: 1,
    alignItems: "center",
    marginVertical: 20,
  },
});
