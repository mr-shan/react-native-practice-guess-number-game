import { View, Text, StyleSheet, Image, Dimensions, useWindowDimensions } from "react-native";

import COLORS from "../helpers/colors";
import PrimaryButton from "../components/PrimaryButton";

const deviceDims = Dimensions.get('window');

export default ({ selectedNumber, onRestart, guessRequired }) => {
  const { width, height } = useWindowDimensions();

  const desiredDim = Math.min(width, height);

  const headerStyle = desiredDim > 380 ? { fontSize: 48 } : { fontSize: 36 }

  let imageSize = desiredDim > 380 ? 300 : 250;
  
  if (height < width) imageSize = 150;

  const imageContainerStyle = {
    borderRadius: imageSize / 2,
    width: imageSize,
    height: imageSize,
    borderWidth: desiredDim > 380 ? 3 : 2,
  }
  const startOverButtonStyle = {
    fontSize: desiredDim > 380 ? 24 : 20,
    paddingVertical: desiredDim > 380 ? 8 : 6,
    paddingHorizontal: desiredDim > 380 ? 18 : 14,
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.header, headerStyle]}>Game Over!</Text>

      <View style={[styles.imgContainer, imageContainerStyle]}>
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
        <PrimaryButton onPress={onRestart} style={[styles.startOverButton, startOverButtonStyle]}>
          Start Again!
        </PrimaryButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 20 : 40,
    justifyContent: 'space-evenly'
  },
  header: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
  imgContainer: {
    overflow: "hidden",
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
