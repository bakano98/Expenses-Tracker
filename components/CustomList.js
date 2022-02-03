import { useEffect, useState, useContext } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  LayoutAnimation,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import dataContext from "../contexts/dataContext";
import { CustomModal } from "../components";

// starting number of items. Each time we add, +1. This is to give unique keys to each item.
let numItems = 6;

// custom alert with two buttons.
const customAlert = (acceptHandler, categoryName) => {
  Alert.alert("Delete?", "Delete " + categoryName + "?", [
    {
      text: "No",
      onPress: () => console.log("cancelled, do nothing else"),
      style: "cancel",
    },
    {
      text: "Yes! Please delete",
      onPress: acceptHandler,
    },
  ]);
};

const ExpandableComponent = ({
  item,
  onPress,
  onPressInner,
  outerIndex,
  itemSetter,
  data,
}) => {
  const navigation = useNavigation();
  const [layoutHeight, setLayoutHeight] = useState(0);
  const [subcatModal, setSubcatModal] = useState(false);
  useEffect(() => {
    if (item.isExpanded) {
      setLayoutHeight(null);
    } else {
      setLayoutHeight(0);
    }
  }, [item.isExpanded]);

  const handlePress = (item) => {
    if (item.id === "adder") {
      // should open up modal
      console.log("do something!!!");
      // pass down the function
      setSubcatModal(true);
    } else {
      onPressInner(item.val);
      navigation.goBack();
    }
  };

  const showModal = () => {
    if (subcatModal) {
      return (
        <CustomModal
          handleConfirm={subcatAdder}
          showModal={setSubcatModal}
          name={"subcategory"}
        />
      );
    } else {
      return;
    }
  };

  const subcatAdder = (text) => {
    const subcatArray = data[outerIndex].subcategory;
    subcatArray.splice(subcatArray.length - 1, 0, {
      id: numItems++,
      val: text,
    });
    const newArray = [...data];
    itemSetter(newArray);
  };

  const handleLongOuter = (outerIndex) => {
    console.log(outerIndex + " pressed");
    data.splice(outerIndex, 1);
    const newArray = [...data];
    itemSetter(newArray);
  };

  const handleLongInner = (innerIndex) => {
    console.log(innerIndex + " pressed");
    if (innerIndex === data.length) {
      console.log("add pressed, do nothing");
    } else {
      const subcatArray = data[outerIndex].subcategory;
      subcatArray.splice(innerIndex, 1);
      const newArray = [...data];
      itemSetter(newArray);
    }
  };

  return (
    <SafeAreaView style={{ width: "100%", backgroundColor: "#86BBD8" }}>
      <TouchableOpacity
        onPress={onPress}
        onLongPress={() =>
          customAlert(
            () => handleLongOuter(outerIndex),
            data[outerIndex].categoryName
          )
        }
        style={{
          alignItems: "center",
        }}
      >
        <Text style={styles.outerItem}>{item.categoryName}</Text>
      </TouchableOpacity>
      <SafeAreaView
        style={{
          height: layoutHeight,
          overflow: "hidden",
          backgroundColor: "#F8F272",
          width: "100%",
        }}
      >
        {item.subcategory.map((item, key) => (
          <TouchableOpacity
            // key is the index of the item being pressed
            key={key}
            onPress={() => {
              handlePress(item);
            }}
            onLongPress={() => {
              customAlert(
                () => handleLongInner(key),
                data[outerIndex].subcategory[key].val
              );
            }}
          >
            <Text style={styles.innerItem}>{item.val}</Text>
            <SafeAreaView style={styles.lineSeparator} />
          </TouchableOpacity>
        ))}
      </SafeAreaView>
      <SafeAreaView style={styles.lineSeparator} />
      {showModal()}
    </SafeAreaView>
  );
};

const CustomList = (props) => {
  const { data, setData } = useContext(dataContext);
  const updateLayout = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    const array = [...data];
    array[index]["isExpanded"] = !array[index]["isExpanded"];
    setData(array);
  };

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={{ justifyContent: "center", alignItems: "center" }}
    >
      <Text>Test</Text>
      {data.map((item, key) => (
        <ExpandableComponent
          key={item.categoryName}
          item={item}
          onPress={() => updateLayout(key)}
          onPressInner={props.onPressInner}
          outerIndex={key}
          data={data}
          itemSetter={setData}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  outerItem: {
    fontSize: 26,
  },

  innerItem: {
    fontSize: 18,
    color: "#1D1E2C",
    paddingLeft: 20,
    padding: 5,
  },

  lineSeparator: {
    width: "100%",
    height: 0.5,
    backgroundColor: "black",
  },
});

export default CustomList;
