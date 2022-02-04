import { SafeAreaView, Text, StyleSheet, Button } from "react-native";
import React, { useContext } from "react";
import { FAB } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import contentContext from "../contexts/contentContext";
import dataContext from "../contexts/dataContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

// use context to store and pass around the prices, descriptions, etc arrays
const Overview = ({ navigation }) => {
  const { content } = useContext(contentContext);
  // Now we can fetch all the data
  const { data } = useContext(dataContext);
  // Data shape:
  /* 
    ArrayName[
      {
        categoryName: ...
        isExpanded: boolean
        subcategory: [
          {
            id: integer
            val: string
          }
        ]
      },
      {
        ...
      },
      ...
    ]
  */
  // console.log(data);
  // First, get all category names
  const categoryNames = data.map((object) => object.categoryName);
  // Now, get all the subcategories. Note that the indexing is same as categoryNames, so
  // each subcategory's index corresponds to each categoryNames' index.
  const subcategories = data.map((object) => object.subcategory);
  console.log(subcategories);

  const renderAsText = () => {
    return categoryNames.map((name, key) => (
      <SafeAreaView style={{alignItems: "center", justifyContent: "center"}}>
        <Text style={{fontSize: 24}}>{name}</Text>
        <SafeAreaView style={{}}>
          <Text style={{fontSize: 18, textAlign: "center", }}>
            {data[key].subcategory.map((innerObject, innerKey) => {
              if (innerKey !== (data[key].subcategory).length-1) {
                return innerObject.val + "\n";
              }
            })}
          </Text>
        </SafeAreaView>
      </SafeAreaView>
    ));
  };

  // console.log("Checking content from Overview: " + content);
  const lastItem = content[content.length - 1];
  // console.log(content.length);
  return (
    <SafeAreaView style={styles.container}>
      <Text>
        Your last expense was a total of: ${lastItem.price}, for an item from:{" "}
        {lastItem.category}
      </Text>
      {renderAsText()}
      <Text>You described it as such: {lastItem.description}</Text>
      <FAB
        title="Add"
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
        onPress={() => navigation.navigate("ExpensesStack")}
      />
      <Button
        title="Clear storage"
        onPress={async () => {
          await AsyncStorage.clear();
          console.log("success");
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Overview;
