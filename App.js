// Main
import { useState, useEffect } from "react";

// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Context
import contentContext from "./contexts/contentContext";
import dataContext from "./contexts/dataContext";

// AsyncStorage
import AsyncStorage from "@react-native-async-storage/async-storage";

// Custom imports for the screens
import { Overview, AddItem, Categories } from "./screens";
import { MenuProvider } from "react-native-popup-menu";

const Stack = createNativeStackNavigator();

const DATA_KEY = "@data_key";
const ExpensesStack = () => {
  const initData = [
    {
      isExpanded: false,
      categoryName: "First",
      subcategory: [
        {
          id: 1,
          val: "First-First",
        },
        {
          id: 2,
          val: "First-Second",
        },
        {
          id: "adder",
          val: "Add new subcategory",
        },
      ],
    },
    {
      isExpanded: false,
      categoryName: "Second",
      subcategory: [
        {
          id: 3,
          val: "Second-First",
        },
        {
          id: 4,
          val: "Second-Second",
        },
        {
          id: "adder",
          val: "Add new subcategory",
        },
      ],
    },
    {
      isExpanded: false,
      categoryName: "Third",
      subcategory: [
        {
          id: 5,
          val: "Third-First",
        },
        {
          id: 6,
          val: "Third-Second",
        },
        {
          id: "adder",
          val: "Add new subcategory",
        },
      ],
    },
  ];

  const [data, setData] = useState(initData);

  const saveData = async () => {
    try {
      await AsyncStorage.setItem(DATA_KEY, JSON.stringify(data));
    } catch (e) {}
  };

  const readData = async () => {
    try {
      const res = await AsyncStorage.getItem(DATA_KEY);
      if (res !== null) {
        setData(JSON.parse(res));
      }
    } catch (e) {}
  };

  useEffect(() => {
    readData();
  }, []);

  useEffect(() => {
    saveData();
  }, [data]);

  return (
    <dataContext.Provider value={{ data, setData }}>
      <Stack.Navigator>
        <Stack.Screen
          name="AddItem"
          component={AddItem}
          options={{ title: "Personal Expenses" }}
        />
        <Stack.Screen name="Categories" component={Categories} />
      </Stack.Navigator>
    </dataContext.Provider>
  );
};

const CONTENT_KEY = "@content_key";
const App = () => {
  const [content, setContent] = useState([
    {
      price: "",
      category: "",
      description: "",
    },
  ]);

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
    <MenuProvider>
      <contentContext.Provider value={{ content, setContent }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Overview" component={Overview} />
            <Stack.Screen
              name="ExpensesStack"
              component={ExpensesStack}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </contentContext.Provider>
    </MenuProvider>
  );
};

export default App;
