import { SafeAreaView, Text, StyleSheet, Button } from "react-native";
import React, { useContext } from "react";
import { FAB } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import contentContext from "../contexts/contentContext";
import dataContext from "../contexts/dataContext";
import dateSpendingContext from "../contexts/dateSpendingContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  differenceInCalendarDays,
  isSameDay,
  isSameMonth,
  parseJSON,
} from "date-fns";
import { Visualisation } from "../components";
import { isSameYear } from "date-fns/esm";


// use context to store and pass around the prices, descriptions, etc arrays
const Overview = ({ navigation }) => {
  const { content, setContent } = useContext(contentContext);
  // Now we can fetch all the data
  const { data } = useContext(dataContext);
  const { spendingContent, setSpendingContent } = useContext(dateSpendingContext);
  console.log(spendingContent);
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
  // This works, but we might not have any use for this.
  const renderAsText = () => {
    return categoryNames.map((name, key) => (
      <SafeAreaView style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 24 }}>{name}</Text>
        <SafeAreaView>
          <Text style={{ fontSize: 18, textAlign: "center" }}>
            {data[key].subcategory.map((innerObject, innerKey) => {
              if (innerKey !== data[key].subcategory.length - 1) {
                return innerObject.val + "\n";
              }
            })}
          </Text>
        </SafeAreaView>
      </SafeAreaView>
    ));
  };
  const handleDelete = () => {
    const temp = [...content];
    let temp2 = [...spendingContent];
    // popping returns the object
    const item = temp.pop();
    const pricePopped = item.price;
    temp2[temp2.length-1].price -= Number(pricePopped);
    setSpendingContent(temp2);
    if (temp.length === 0) {
      temp.push({
        category: "",
        date: "",
        description: "",
        price: "",
      })
    }
    setContent(temp);
  }


  // console.log("Checking content from Overview: " + content);
  /* Shape of each object in content: { 
    category: ""
    description: ""
    price: ""
  }
  */
  const lastItem = content[content.length - 1];
  // console.log(content.length);
  /* Helper functions to get the objects based on months */
  const getAllObjects = () => {
    return content;
  };

  const getSameDayObject = (date) => {
    const res = content.filter((item) => isSameDay(date, parseJSON(item.date)));
    return res;
  };

  const getSameMonthObject = (date) => {
    const res = content.filter((item) =>
      isSameMonth(date, parseJSON(item.date))
    );
    return res;
  };

  const getLastThirtyDaysObject = () => {
    const res = content.filter(
      (item) => differenceInCalendarDays(new Date(), parseJSON(item.date)) <= 30
    );
    return res;
  };

  const getSameYearObject = (date) => {
    const res = content.filter((item) =>
      isSameYear(date, parseJSON(item.date))
    );
    return res;
  };

  /* End of helper functions to get based on months */

  /* Helper functions for getting spent amount */
  const getTotalSpent = () => {
    let totalPrice = 0;
    const allObjects = getAllObjects();
    allObjects.forEach((item) => (totalPrice += Number(item.price)));
    return totalPrice;
  };

  const getTodaySpent = () => {
    let todaySpent = 0;
    const todayObject = getSameDayObject(new Date());
    todayObject.forEach((item) => {
      todaySpent += Number(item.price);
    });
    return todaySpent;
  };

  const getLastThirtySpent = () => {
    let lastThirtySpent = 0;
    const lastThirtySpentObject = getLastThirtyDaysObject();

    lastThirtySpentObject.forEach((item) => {
      lastThirtySpent += Number(item.price);
    });

    return lastThirtySpent;
  };

  const getThisMonthSpent = () => {
    let thisMonthSpent = 0;
    const thisMonthObject = getSameMonthObject(new Date());
    thisMonthObject.forEach((item) => {
      thisMonthSpent += Number(item.price);
    });
    return thisMonthSpent;
  };

  const getThisYearSpent = () => {
    let thisYearSpent = 0;
    const thisYearObject = getSameYearObject(new Date());

    thisYearObject.forEach((item) => {
      thisYearSpent += Number(item.price);
    });

    return thisYearSpent;
  };

  // if (todayDate == spendingContent[])

  /* End of helper functions */
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={{ width: "100%" }}>
        <SafeAreaView
          style={[
            styles.topDivider,
            { borderColor: "#86BBD8", borderTopWidth: 5 },
          ]}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "bold",
              textAlign: "center",
              paddingBottom: 10,
              paddingTop: 10,
            }}
          >
            Summary of spendings
          </Text>
        </SafeAreaView>
        <SafeAreaView style={styles.topDivider}>
          <Text style={styles.topDividerText}>
            Total spent: ${getTotalSpent()}
          </Text>
        </SafeAreaView>
        <SafeAreaView style={styles.topDivider}>
          <Text style={styles.topDividerText}>Today: ${getTodaySpent()}</Text>
        </SafeAreaView>
        <SafeAreaView style={styles.topDivider}>
          <Text style={styles.topDividerText}>
            Over last 30 days: ${getLastThirtySpent()}
          </Text>
        </SafeAreaView>
        <SafeAreaView style={styles.topDivider}>
          <Text style={styles.topDividerText}>
            This month: ${getThisMonthSpent()}
          </Text>
        </SafeAreaView>
        <SafeAreaView style={styles.topDivider}>
          <Text style={styles.topDividerText}>
            This year: ${getThisYearSpent()}
          </Text>
        </SafeAreaView>
        <SafeAreaView style={styles.topDivider}>
          <Text style={styles.topDividerText}>
            You last added: {lastItem.description}, {lastItem.category}
          </Text>
        </SafeAreaView>
      </SafeAreaView>

      <SafeAreaView
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text>Visual representation of spendings</Text>
        <Visualisation data={spendingContent} />
      </SafeAreaView>
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
      <SafeAreaView style={{ position: "absolute", bottom: 0 }}>
        <Button
          title="Clear storage"
          onPress={async () => {
            await AsyncStorage.clear();
            console.log("success");
          }}
        />
      </SafeAreaView>
      <SafeAreaView style={{flex: 1, left: 0,}}>
        <Button
          title="See breakdown"
          onPress={() => {
            navigation.navigate("Breakdown")
          }}
        />
      </SafeAreaView>
      <SafeAreaView style={{position: "absolute", flex: 1, right: 0,}}>
        <Button
          title="Delete last"
          onPress={() => {
            handleDelete()
          }}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C1DEAE",
    alignItems: "center",
  },

  topDivider: {
    borderBottomWidth: 5,
    height: null,
    borderColor: "#D89A9E",
  },

  topDividerText: {
    fontSize: 18,
    textAlign: "left",
    padding: 5,
    paddingLeft: 20,
  },
});

export default Overview;
