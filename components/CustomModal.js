import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";

const CustomModal = (props) => {
  const [text, setText] = useState("");
  const setter = props.handleConfirm;
  const setVisibility = props.showModal;
  return (
    <View style={styles.centeredView}>
      <Modal animationType="slide" transparent={true} visible={true}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Name of the {props.name}</Text>
            <TextInput
              value={text}
              onChangeText={(text) => setText(text)}
              style={styles.inputContainer}
            />
            <View style={styles.doubleButtons}>
              <TouchableOpacity
                style={[{ marginRight: 20 }, styles.buttonStyle]}
                onPress={() => setVisibility(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[{ marginLeft: 20 }, styles.buttonStyle]}
                onPress={() => {
                  setter(text);
                  setVisibility(false);
                }}
              >
                <Text style={styles.buttonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 50,
    alignItems: "center",
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    textAlign: "center",
    marginBottom: 30,
  },

  inputContainer: {
    fontSize: 14,
    borderWidth: 2,
    color: "black",
    borderColor: "grey",
    borderRadius: 10,
    backgroundColor: "white",
    height: 40,
    width: 200,
    paddingLeft: 10,
    marginBottom: 20,
    textAlign: "left",
    justifyContent: "center",
  },

  doubleButtons: {
    flexDirection: "row",
  },
  buttonStyle: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    height: 40,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6363",
    elevation: 4,
  },

  buttonText: {
    fontSize: 16,
    color: "white",
  },
});

export default CustomModal;
