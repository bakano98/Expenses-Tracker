import { SafeAreaView, Text, StyleSheet, Button } from "react-native";
import React, { useContext } from "react";
import mainContext from "../contexts/mainContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

// use context to store and pass around the prices, descriptions, etc arrays
const Overview = ({ navigation }) => {
  const { content } = useContext(mainContext);
  console.log("Checking content from Overview: " + content);
  return (
    <SafeAreaView style={styles.container}>
      <Text>Placeholder</Text>
      <Button
        title="Add items"
        onPress={() => navigation.navigate("Personal Expenses")}
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
