import { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
// AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Local imports
import { Button } from "../components";

const BUTTON_KEY = "@button_key";
const Categories = ({ navigation, route }) => {
  // The more elegant way to handle this would be to use Context. But I'm feeling lazy.
  const touchableButton = (text) => {
    return (
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          setter(text);
          navigation.goBack();
        }}
      >
        <Text>{text}</Text>
      </TouchableOpacity>
    );
  };

  // hooks
  const [init, setInit] = useState(["test1", "test2", "test3", "test4"]);

  // route stuff
  const setter = route.params.catSetter;

  const saveInit = async () => {
    try {
      await AsyncStorage.setItem(BUTTON_KEY, JSON.stringify(init));
    } catch (e) {
      console.log(e);
    }
  };

  const readInit = async () => {
    try {
      const res = await AsyncStorage.getItem(BUTTON_KEY);
      if (res !== null) {
        setInit(JSON.parse(res));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    readInit();
  }, []);

  useEffect(() => {
    saveInit();
  }, [init]);

  const renderButtons = () => {
    return init.map((name) => {
      return touchableButton(name);
    });
  };

  // This should open up a Modal. Then, use the Modal to add new components
  const addCustomCategory = () => {
    let someText = "aa";
    const newArr = [...init, someText];
    setInit(newArr);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
    >
      <SafeAreaView>
        <Text style={styles.headerText}>Select a Category</Text>
        <SafeAreaView style={{ marginTop: 50 }}>{renderButtons()}</SafeAreaView>
      </SafeAreaView>
      <SafeAreaView
        style={{ marginTop: 20, marginRight: 10, marginBottom: 20 }}
      >
        <Button title="More" action={() => addCustomCategory()} />
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C1DEAE",
  },

  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

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

export default Categories;
