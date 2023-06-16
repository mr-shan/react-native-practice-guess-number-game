import { View, Text, Pressable, StyleSheet, Platform } from "react-native";

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
        android_ripple={{ color: "#a40230" }}
        onPress={props.onPress}
      >
        <Text style={styles.text}>{props.children}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    overflow: "hidden",
    borderRadius: 50,
  },
  innerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#93012a'
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  pressed: {
    backgroundColor: '#a40230'
  }
});
