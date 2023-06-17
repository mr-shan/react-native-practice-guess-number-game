import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, FlatList, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "./../helpers/colors";
import NumberButton from "../components/NumberButton";
import OpponentGuessItem from "../components/OpponentGuessItem";

import { generateRandomBetween } from "../helpers/helper";

let minBoundary = 1;
let maxBoundary = 100;

const deviceDims = Dimensions.get('window');

export default ({ selectedNumber, onGameOver }) => {
  const [currentGuess, setCurrentGuess] = useState("");
  const [guessMade, setGuessMade] = useState([]);

  const buttonClickHandler = (direction) => {
    if (!validateGuess(direction)) return;

    if (direction === "LOW") maxBoundary = currentGuess;
    else minBoundary = currentGuess + 1;

    const newGuess = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    ); 

    if (newGuess === selectedNumber) {
      onGameOver(guessMade.length + 1);
    } else {
      setGuessData(newGuess);
    }
  };

  const validateGuess = (direction) => {
    if (
      (direction === "LOW" && currentGuess < selectedNumber) ||
      (direction === "HIGH" && currentGuess > selectedNumber)
    ) {
      Alert.alert("Come On!!", "Don't Lie! You know that this is wrong...", [
        { text: "Try Again!", style: "cancel" },
      ]);

      return false;
    }
    return true;
  };

  const setGuessData = (newGuess) => {
    setCurrentGuess(newGuess);
    setGuessMade((oldGuess) => [...oldGuess, newGuess]);
  };

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
    const initialGuess = generateRandomBetween(1, 100, selectedNumber);
    setGuessData(initialGuess);
  }, []);

  return (
    <View style={styles.container}>
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
              <Ionicons name="md-remove" size={42} color="white" />
            </NumberButton>
          </View>
          <View style={styles.buttonWrapper}>
            <NumberButton onPress={buttonClickHandler.bind(this, "HIGH")}>
              <Ionicons name="md-add" size={42} color="white" />
            </NumberButton>
          </View>
        </View>
      </View>

      <View style={styles.guessMadeContainer}>
        <FlatList
          style={{ paddingTop: 5 }}
          data={guessMade}
          renderItem={(item) => (
            <OpponentGuessItem
              id={guessMade.length - item.index}
              guessValue={guessMade[guessMade.length - 1 - item.index]}
            />
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 20 : 50,
    flex: 1,
  },
  numberCard: {
    alignSelf: "center",
    elevation: 5,
    shadowColor: COLORS.SHADE_900,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    borderRadius: 20,
    backgroundColor: COLORS.PRIMARY_500,
    paddingVertical: deviceDims.width > 380 ? 20 : 18,
    paddingHorizontal: deviceDims.width > 380 ? 14 : 8,
    justifyContent: "center",
    alignItems: "center",
    height: "58%",
    marginBottom: 20,
  },

  header: {
    color: COLORS.SHADE_100,
    fontSize: 24,
    padding: 20,
    textAlign: "center",
    fontWeight: "bold",
  },

  guessedNumberWrapper: {
    padding: deviceDims.width > 380 ? 32 : 24,
    borderRadius: 20,
    backgroundColor: COLORS.PRIMARY_400,
    width: 200,
    marginVertical: 12,
    elevation: 5,
    shadowColor: COLORS.SHADE_900,
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },

  guessedNumberText: {
    color: COLORS.ACCENT_500,
    fontSize: deviceDims.width > 380 ? 64 : 48,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
  },

  instruction: {
    marginTop: 24,
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
    marginVertical: 16,
  },

  guessMadeContainer: {
    paddingHorizontal: 10,
    height: "40%",
  },
});
