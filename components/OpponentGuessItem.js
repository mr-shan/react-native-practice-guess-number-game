import { View, Text, StyleSheet } from "react-native";

import COLORS from "../helpers/colors";

export default ({ id, guessValue }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}># {id}</Text>
      <Text style={styles.text}>Oppnent's guess: {guessValue}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    borderColor: COLORS.PRIMARY_700,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: COLORS.ACCENT_500,
    marginBottom: 10
  },

  text: {
    fontSize: 18,
    color: COLORS.PRIMARY_700
  },
});
