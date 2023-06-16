import { View, TextInput, Text, StyleSheet, Alert, Platform } from "react-native";

import PrimaryButton from "../components/PrimaryButton";
import { useState } from "react";

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

    props.onNumberSelection(parsedNum)
  };

  const resetButtonHandler = () => {
    setEnteredNumber("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Text style={styles.header}>Please enter a number!</Text>
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
    paddingTop: Platform.OS === 'ios' ? 5 : 30,
  },
  inputWrapper: {
    backgroundColor: "#6b001e",
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
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 16,
  },
  input: {
    width: 60,
    borderBottomWidth: 1,
    borderColor: "white",
    color: "#ff8000",
    fontSize: 42,
    textAlign: "center",
    padding: 5,
    marginBottom: 30,
    fontWeight: 'bold'
  },
  buttons: {
    flexDirection: "row",
    gap: 10,
  },
});
