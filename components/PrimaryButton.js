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
        android_ripple={{ color: COLORS.PRIMARY_300 }}
        onPress={props.onPress}
      >
        <Text style={[styles.text, props.style && props.style]}>{props.children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    overflow: "hidden",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.SHADE_100
  },
  innerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.PRIMARY_400
  },
  text: {
    fontSize: 18,
    color: COLORS.SHADE_100,
    textAlign: 'center',
    fontWeight: 600
  },
  pressed: {
    backgroundColor: COLORS.PRIMARY_300
  }
});
