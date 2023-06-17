import { View, Text, StyleSheet, Image } from "react-native";

import COLORS from "../helpers/colors";
import PrimaryButton from "../components/PrimaryButton";

export default ({ selectedNumber, onRestart, guessRequired }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Game Over!</Text>

      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={require("./../assets/images/success.png")}
        />
      </View>

      <Text style={styles.summary}>
        We guessed it right! It took <Text style={styles.highlight}>{guessRequired}</Text>{" "}
        attempts to guess the number{" "}
        <Text style={styles.highlight}>{selectedNumber}</Text>
      </Text>

      <View style={styles.buttons}>
        <PrimaryButton onPress={onRestart} style={styles.startOverButton}>
          Start Again!
        </PrimaryButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    paddingTop: Platform.OS === "ios" ? 20 : 40,
    justifyContent: 'space-evenly'
  },
  header: {
    textAlign: "center",
    fontSize: 48,
    fontWeight: "bold",
    color: "white",
    // marginBottom: 50,
  },
  imgContainer: {
    borderRadius: 150,
    width: 300,
    height: 300,
    overflow: "hidden",
    borderWidth: 3,
    alignSelf: "center",
    // marginBottom: 50,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  summary: {
    marginTop: 20,
    textAlign: "center",
    color: "black",
    fontSize: 22,
    paddingHorizontal: 20,
    lineHeight: 30,
    fontWeight: 500,
    // marginBottom: 50,
  },
  highlight: {
    color: COLORS.PRIMARY_300,
    fontWeight: "bold",
    fontSize: 24,
  },
  buttons: {
    width: 250,
    alignSelf: "center",
  },
  startOverButton: {
    fontWeight: "bold",
    fontSize: 24,
    paddingVertical: 8,
    paddingHorizontal: 18,
  },
});
