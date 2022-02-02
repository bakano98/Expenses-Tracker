import { useState, useEffect } from "react";
import { SafeAreaView, Text, StyleSheet, TouchableOpacity } from "react-native";
import { FAB } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
// AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ExpandableListView } from "react-native-expandable-listview";
import { CustomModal } from "../components";

const BUTTON_KEY = "@button_key";
let lastPressedItem = null;
const Categories = ({ navigation, route }) => {
  // hooks. This is our FlatList data.
  const [init, setInit] = useState([
    {
      id: "00",
      categoryName: "Entertainment",
      subCategory: [
        {
          id: "0",
          name: "test1",
        },
        {
          id: "1",
          name: "test2",
        },
        {
          id: "adder",
          name: "Add new subcategory",
        },
      ],
    },
    {
      id: "01",
      categoryName: "Food",
      subCategory: [
        {
          id: "0",
          name: "test1",
        },
        {
          id: "1",
          name: "test2",
        },
        {
          id: "adder",
          name: "Add new subcategory",
        },
      ],
    },
    {
      id: "02",
      categoryName: "Transport",
      subCategory: [
        {
          id: "0",
          name: "test1",
        },
        {
          id: "1",
          name: "test2",
        },
        {
          id: "adder",
          name: "Add new subcategory",
        },
      ],
    },
    {
      id: "03",
      categoryName: "Utilities",
      subCategory: [
        {
          id: "0",
          name: "test1",
        },
        {
          id: "1",
          name: "test2",
        },
        {
          id: "adder",
          name: "Add new subcategory",
        },
      ],
    },
  ]);
  const [show, setShow] = useState(false); // show subcat modal
  const [showOther, setShowOther] = useState(false); // show cat modal
  // route stuff. We use this as a callback function to set category name
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

  const handleInnerPress = (item) => {
    lastPressedItem = item;
    const index = item.innerItemIndex;
    let currentItem = item.item.subCategory[index];
    if (currentItem.id !== "adder") {
      setter(currentItem.name);
      navigation.goBack();
    } else {
      // Show modal
      setShow(true);
    }
  };

  const subCatAdder = (text) => {
    const subCat = lastPressedItem.item.subCategory;
    subCat.splice(subCat.length - 1, 0, { id: subCat.length - 1, name: text });
    const newThing = [...init];
    setInit(newThing);
  };

  const catAdder = (text) => {
    console.log(text);
    const newThing = [
      ...init,
      {
        id: init.length - 1,
        categoryName: text,
        subCategory: [
          {
            id: "adder",
            name: "Add new subcategory",
          },
        ],
      },
    ];
    setInit(newThing);
  };

  const showModal = () => {
    if (show) {
      return (
        <CustomModal
          handleConfirm={subCatAdder}
          showModal={setShow}
          name={"subcategory"}
        />
      );
    } else if (showOther) {
      return (
        <CustomModal
          handleConfirm={catAdder}
          showModal={setShowOther}
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
      <SafeAreaView style={{ flex: 1, marginTop: 20, marginBottom: 20 }}>
        <ExpandableListView
          data={init}
          ExpandableListViewStyles={styles.expandableListStyle}
          itemLabelStyle={styles.expandableListFont}
          onInnerItemClick={(item) => handleInnerPress(item)}
        />
      </SafeAreaView>
      <SafeAreaView
        style={{ marginTop: 20, marginRight: 10, marginBottom: 20 }}
      ></SafeAreaView>
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
        onPress={() => setShowOther(true)}
      />
      {showModal()}
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

  expandableListStyle: {},

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
