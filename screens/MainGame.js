import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Dimensions,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import COLORS from "./../helpers/colors";
import NumberButton from "../components/NumberButton";
import OpponentGuessItem from "../components/OpponentGuessItem";

import { generateRandomBetween } from "../helpers/helper";

let minBoundary = 1;
let maxBoundary = 100;

const deviceDims = Dimensions.get("window");

export default ({ selectedNumber, onGameOver }) => {
  const { width, height } = useWindowDimensions();
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

  const isLandscape = width > height;
  const containerStyle = { flexDirection: "column" };
  const cardHeight = { };
  const guessListHeight = { };
  if (isLandscape) {
    containerStyle.flexDirection = "row";
    containerStyle.justifyContent = 'space-around';
    containerStyle.gap = 10;
    guessListHeight.width = "46%";
    cardHeight.width = "46%";
  } else {
    cardHeight.marginBottom = 20;
    cardHeight.height = "58%";
    guessListHeight.height = "40%";
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={[styles.numberCard, cardHeight]}>
        <Text style={styles.header}>Let me guess the number...</Text>

        <View style={styles.guessedNumberWrapper}>
          <Text style={styles.guessedNumberText}>{currentGuess}</Text>
        </View>

        {!isLandscape && (
          <View style={styles.instruction}>
            <Text style={styles.instructionText}>Lower or Higher?</Text>
          </View>
        )}

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

      <View style={[styles.guessMadeContainer, guessListHeight]}>
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
  },
});
