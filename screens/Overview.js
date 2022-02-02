import { SafeAreaView, Text, StyleSheet, Button } from "react-native";
import React, { useContext } from "react";
import { FAB } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import mainContext from "../contexts/mainContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

// use context to store and pass around the prices, descriptions, etc arrays
const Overview = ({ navigation }) => {
  const { content } = useContext(mainContext);
  console.log("Checking content from Overview: " + content);
  const lastItem = content[content.length - 1];
  console.log(content.length);
  return (
    <SafeAreaView style={styles.container}>
      <Text>
        Your last expense was a total of: ${lastItem.price}, for an item from:{" "}
        {lastItem.category}
      </Text>
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
        onPress={() => navigation.navigate("AddItem")}
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
