import React, { useContext } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BreakdownVisual } from '../components'
import dateSpendingContext from '../contexts/dateSpendingContext';
import contentContext from "../contexts/contentContext";
import {

  isSameMonth,
  parseJSON,
} from "date-fns";

import {
  PieChart,
} from "react-native-chart-kit";

const Pie = (data) => {
  return (
    <View>
      <PieChart
        data={data}
        width={Dimensions.get("window").width}
        height={220}
        chartConfig={{
          backgroundGradientFrom: "#1E2923",
          backgroundGradientFromOpacity: 0,
          backgroundGradientTo: "#08130D",
          backgroundGradientToOpacity: 0.5,
          color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
          strokeWidth: 2, // optional, default 3
          barPercentage: 0.5,
          useShadowColorFromDataset: false // optional
        }}
        accessor={"price"}
        backgroundColor={"transparent"}
        paddingLeft={"15"}
      />
    </View>)
}

const legendStuff = [
  {
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    color: "#ffffff",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  },
  {
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15
  }
]

const Breakdown = () => {
  const { spendingContent } = useContext(dateSpendingContext);
  const { content } = useContext(contentContext);

  const getSameMonthObject = (date) => {
    const res = content.filter((item) =>
      isSameMonth(date, parseJSON(item.date))
    );
    return res;
  };

  // now we have this month's object
  const thisMonthObject = getSameMonthObject(new Date());
  const categoriesInThisMonth = [];
  const getCategoresInThisMonth = () => thisMonthObject.forEach(item => {
    if (!categoriesInThisMonth.includes(item.category)) {
      categoriesInThisMonth.push(item.category);
    }
  })

  getCategoresInThisMonth();
  // so categoriesInThisMonth now contains only the unique categories

  // now, get the amount of spending in each category
  const getSpendingByCategory = () => {
    const tempObj = [];
    for (let i = 0; i < categoriesInThisMonth.length; i++) {
      tempObj.push({
        name: categoriesInThisMonth[i],
        price: 0,
        color: legendStuff[i].color,
        legendFontColor: legendStuff[i].legendFontColor,
        legendFontSize: legendStuff[i].legendFontSize,
      });

      thisMonthObject.forEach(item => {
        if (item.category === categoriesInThisMonth[i]) {
          tempObj[i].price += Number(item.price);
        }
        // otherwise just skip
      })
    }
    return tempObj;
  }

  const categorySpendingObject = getSpendingByCategory();

  console.log(categorySpendingObject)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>A breakdown of your spendings for this month</Text>
      {Pie(categorySpendingObject)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C1DEAE",
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    fontSize: 24,
    padding: 20,
    fontWeight: 'bold',
  }
})

export default Breakdown