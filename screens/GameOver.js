import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

import COLORS from "../helpers/colors";
import PrimaryButton from "../components/PrimaryButton";

const deviceDims = Dimensions.get('window');

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

const imageSize = deviceDims.width > 380 ? 300 : 250;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 40,
    justifyContent: 'space-evenly'
  },
  header: {
    textAlign: "center",
    fontSize: deviceDims.width > 380 ? 48 : 36,
    fontWeight: "bold",
    color: "white",
  },
  imgContainer: {
    borderRadius: imageSize / 2,
    width: imageSize,
    height: imageSize,
    overflow: "hidden",
    borderWidth: deviceDims.width > 380 ? 3 : 2,
    alignSelf: "center",
  },
  img: {
    width: "100%",
    height: "100%",
  },
  summary: {
    marginTop: 20,
    textAlign: "center",
    color: "black",
    fontSize: deviceDims.width > 380 ? 22 : 20,
    paddingHorizontal: 20,
    lineHeight: 30,
    fontWeight: 500,
  },
  highlight: {
    color: COLORS.PRIMARY_300,
    fontWeight: "bold",
    fontSize: deviceDims.width > 380 ? 24 : 22,
  },
  buttons: {
    width: 250,
    alignSelf: "center",
  },
  startOverButton: {
    fontWeight: "bold",
    fontSize: deviceDims.width > 380 ? 24 : 20,
    paddingVertical: deviceDims.width > 380 ? 8 : 6,
    paddingHorizontal: deviceDims.width > 380 ? 18 : 14,
  },
});
