import { View, Text, Pressable, StyleSheet, Platform } from "react-native";

import COLORS from "../helpers/colors";

export default (props) => {
  const getStyles = ({ pressed }) => {
    const styleList = [styles.innerContainer];
    pressed && Platform.OS === 'ios' && styleList.push(styles.pressed)
    return styleList
  }

  return (
    <View style={styles.outerContainer}>
      <Pressable
        style={getStyles}
        android_ripple={{ color: COLORS.ACCENT_600 }}
        onPress={props.onPress}
      >
        {props.children}
      </Pressable>
    </View>
  );
};;

const buttonDim = 75;

const styles = StyleSheet.create({
  outerContainer: {
    overflow: "hidden",
    borderRadius: 50,
    borderColor: COLORS.SHADE_900,
    borderWidth: 1,
    width: buttonDim,
    height: buttonDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    backgroundColor: COLORS.ACCENT_500,
    padding: 20,
    width: buttonDim,
    height: buttonDim,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 48,
    color: COLORS.SHADE_900,
    textAlign: 'center',
  },
  pressed: {
    backgroundColor: COLORS.ACCENT_600
  }
});
