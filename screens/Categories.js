import { useState, useContext } from "react";
import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FAB } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import dataContext from "../contexts/dataContext";

import { CustomModal, CustomList } from "../components";

const Categories = ({ route }) => {
  // route stuff. We use this as a callback function to set category name
  const setter = route.params.catSetter;
  const { data, setData } = useContext(dataContext);
  const [modal, setModal] = useState(false);

  const catAdder = (text) => {
    const newThing = [
      ...data,
      {
        isExpanded: false,
        categoryName: text,
        subcategory: [
          {
            id: "adder",
            val: "Add new subcategory",
          },
        ],
      },
    ];
    setData(newThing);
  };

  const showModal = () => {
    if (modal) {
      return (
        <CustomModal
          handleConfirm={catAdder}
          showModal={setModal}
          name={"category"}
        />
      );
    } else {
      return;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={{ alignItems: "center" }}>
        <Text style={styles.headerText}>Select a Category</Text>
      </SafeAreaView>
      <SafeAreaView style={{ flex: 1 }}>
        <CustomList onPressInner={setter} />
      </SafeAreaView>
      <SafeAreaView
        style={{ marginTop: 20, marginRight: 10, marginBottom: 20 }}
      >
        {showModal()}
      </SafeAreaView>
      <FAB
        title="New"
        placement="right"
        buttonStyle={{
          backgroundColor: "#FF6363",
          borderRadius: 200,
          borderWidth: 1,
          elevation: 1,
          height: "100%",
        }}
        upperCase={true}
        icon={<Ionicons name="add-circle" size={24} color="white" />}
        onPress={() => setModal(true)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C1DEAE",
    justifyContent: "center",
  },

  expandableListFont: {
    color: "green",
    fontSize: 20,
  },

  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  buttonStyle: {
    margin: 10,
    marginLeft: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    height: 50,
    width: "80%",
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
