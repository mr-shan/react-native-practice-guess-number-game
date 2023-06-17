import { useState } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";

import PrimaryButton from "../components/PrimaryButton";
import COLORS from "../helpers/colors";

export default (props) => {
  const [enteredNum, setEnteredNumber] = useState("");

  const numberChangeHandler = (event) => {
    setEnteredNumber(event);
  };

  const confirmButtonHandler = () => {
    const parsedNum = parseInt(enteredNum);

    if (isNaN(parsedNum) || parsedNum <= 0 || parsedNum > 99) {
      Alert.alert(
        "Invalid number",
        "Please enter a correct number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetButtonHandler }]
      );
      return;
    }

    props.onNumberSelection(parsedNum);
  };

  const resetButtonHandler = () => {
    setEnteredNumber("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text style={styles.header}>Guess My Number ! </Text>
        <Text style={{ color: COLORS.SHADE_100, fontSize: 20 }}>Enter a number.</Text>
        <TextInput
          maxLength={2}
          style={styles.input}
          keyboardType="number-pad"
          value={enteredNum}
          onChangeText={numberChangeHandler}
        />
        <View style={styles.buttons}>
          <View style={{ flex: 1 }}>
            <PrimaryButton onPress={resetButtonHandler}>Reset</PrimaryButton>
          </View>
          <View style={{ flex: 1 }}>
            <PrimaryButton onPress={confirmButtonHandler}>
              Confirm
            </PrimaryButton>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 5 : 30,
  },
  inputWrapper: {
    backgroundColor: COLORS.PRIMARY_500,
    padding: 30,
    paddingBottom: 20,
    margin: 10,
    borderRadius: 16,
    alignItems: "center",
    elevation: 16,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 10,
  },
  header: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.ACCENT_600,
    marginBottom: 12,
  },
  input: {
    width: 100,
    borderBottomWidth: 1,
    borderColor: "white",
    color: COLORS.ACCENT_500,
    fontSize: 64,
    textAlign: "center",
    padding: 5,
    fontWeight: "bold",
    marginVertical: 35
  },
  buttons: {
    marginVertical: 2,
    flexDirection: "row",
    gap: 10,
  },
});
