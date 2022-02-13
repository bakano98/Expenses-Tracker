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
    color: "#FEE1C7",
    legendFontColor: "#FEE1C7",
    legendFontSize: 15
  },
  {
    color: "#FA7E61",
    legendFontColor: "#FA7E61",
    legendFontSize: 15
  },
  {
    color: "#F44174",
    legendFontColor: "#F44174",
    legendFontSize: 15
  },
  {
    color: "#98C1D9",
    legendFontColor: "#98C1D9",
    legendFontSize: 15,
  },
  {
    color: "#37FF8B",
    legendFontColor: "#37FF8B",
    legendFontSize: 15
  }, 
  {
    color: "#F2E94E",
    legendFontColor: "#F2E94E",
    legendFontSize: 15,
  },
  {
    color: "#4C1A57",
    legendFontColor: "#4C1A57",
    legendFontSize: 15,
  },
  {
    color: "#6874E8",
    legendFontColor: "#6874E8",
    legendFontSize: 15,
  },
  {
    color: "#5B3758",
    legendFontColor: "#5B3758",
    legendFontSize: 15,
  },
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
    backgroundColor: "#424B54",
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