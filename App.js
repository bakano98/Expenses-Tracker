// Main
import { useState, useEffect } from "react";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Context
import mainContext from "./contexts/mainContext";

// AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Custom imports for the screens
import { Overview, AddItem, Categories } from "./screens";

const Stack = createNativeStackNavigator();

// to be used for AsyncStorage later.
const CONTENT_KEY = "@content_key";

const App = () => {
  const [content, setContent] = useState([]);

  const saveContent = async () => {
    try {
      await AsyncStorage.setItem(CONTENT_KEY, JSON.stringify(content));
    } catch (e) {}
  };

  const readContent = async () => {
    try {
      const res = await AsyncStorage.getItem(CONTENT_KEY);
      if (res !== null) {
        setContent(JSON.parse(res));
      }
    } catch (e) {}
  };

  useEffect(() => {
    readContent();
  }, []);

  useEffect(() => {
    saveContent();
  }, [content]);

  return (
    <mainContext.Provider value={{ content, setContent }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Overview" component={Overview} />
          <Stack.Screen name="Personal Expenses" component={AddItem} />
          <Stack.Screen name="Categories" component={Categories} />
        </Stack.Navigator>
      </NavigationContainer>
    </mainContext.Provider>
  );
};

export default App;
