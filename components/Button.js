import { TouchableOpacity, Text, StyleSheet } from "react-native";

const Button = (props) => {
  return (
    <TouchableOpacity style={styles.buttonStyle} onPress={props.action}>
      <Text style={styles.buttonText}>{props.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    marginRight: 40,
    marginLeft: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    height: 40,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6363",
    elevation: 4,
  },

  buttonText: {
    fontSize: 18,
    color: "white",
  },
});

export default Button;
