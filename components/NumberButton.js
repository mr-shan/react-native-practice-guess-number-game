import { View, Pressable, StyleSheet, Platform } from "react-native";

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

const buttonDim = 60;

const styles = StyleSheet.create({
  outerContainer: {
    overflow: "hidden",
    borderRadius: 50,
    borderColor: COLORS.SHADE_100,
    borderWidth: 2,
    width: buttonDim,
    height: buttonDim,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    backgroundColor: COLORS.PRIMARY_400,
    width: buttonDim,
    height: buttonDim,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 4
  },
  pressed: {
    backgroundColor: COLORS.ACCENT_600
  }
});
