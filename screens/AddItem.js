import {
  SafeAreaView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import contentContext from "../contexts/contentContext";
import { format } from "date-fns";
// Custom components
import { Button } from "../components";

const PLACEHOLDER = "";

const underlinedTextInput = (text, changeTextFunction, keyboardType) => {
  return (
    <TextInput
      value={text === "default" ? "" : text}
      onChangeText={(text) => {
        keyboardType === "numeric"
          ? changeTextFunction(text.replace(/[^0-9]/g, "")) // removes non-number text
          : changeTextFunction(text);
      }}
      placeholder={PLACEHOLDER}
      keyboardType={keyboardType}
      placerholderTextColor="grey"
      style={styles.inputContainer}
    />
  );
};

const AddItem = ({ navigation }) => {
  // define hooks
  const [price, setPrice] = useState("default");
  // this will actually lead to categories page
  const [cat, setCat] = useState("");
  const [desc, setDesc] = useState("default");
  const { content, setContent } = useContext(contentContext);

  // custom functions
  const categoriesRedirection = (text) => {
    return (
      <TouchableOpacity
        style={styles.inputContainer}
        onPress={() => navigation.navigate("Categories", { catSetter: setCat })}
      >
        <Text style={{ textAlign: "left" }}>{text}</Text>
      </TouchableOpacity>
    );
  };

  // Use context
  const handleConfirm = () => {
    if (price === "default") {
      alert("Price not inputted");
      return;
    } else if (cat === "") {
      alert("Category not selected");
      return;
    }

    const passable = {
      price: price,
      category: cat,
      date: new Date(),
      description: desc,
    };

    if (content[0].category === "") {
      setContent([passable]);
    } else {
      setContent([...content, passable]);
    }
    navigation.goBack();
  };

  // make the boxes
  const priceBox = underlinedTextInput(price, setPrice, "numeric");
  const catBox = categoriesRedirection(cat);
  const descBox = underlinedTextInput(desc, setDesc, "default");

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={{ position: "absolute", top: 30 }}>
        <SafeAreaView style={styles.boxView}>
          <Text style={styles.boxText}>Price:</Text>
          {priceBox}
        </SafeAreaView>
        <SafeAreaView style={styles.boxView}>
          <Text style={styles.boxText}>Category:</Text>
          {catBox}
        </SafeAreaView>
        <SafeAreaView style={styles.boxView}>
          <Text style={styles.boxText}>Description:</Text>
          {descBox}
        </SafeAreaView>
      </SafeAreaView>
      <SafeAreaView style={{ position: "absolute", bottom: 40 }}>
        <SafeAreaView
          style={{
            flexDirection: "row",
          }}
        >
          <Button title={"Back"} action={() => navigation.goBack()} />
          <Button title={"Confirm"} action={() => handleConfirm()} />
        </SafeAreaView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C1DEAE",
    alignItems: "center",
    justifyContent: "center",
  },

  boxText: {
    fontSize: 20,
    padding: 5,
    color: "black",
  },
  boxView: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
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
    textAlign: "left",
    justifyContent: "center",
  },
});

export default AddItem;
