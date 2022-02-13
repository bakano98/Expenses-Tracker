import React, { Component } from 'react';
import { StyleSheet, ScrollView, StatusBar, Text, View, Dimensions } from 'react-native';
import {

} from "date-fns";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

const Visualisation = (props) => {
  const PASSED_DATA = props.data;
  const todayDate = new Date();
  const todayMonth = todayDate.getMonth() + 1;
  const todayYear = todayDate.getFullYear();
  const numDays = new Date(todayYear, todayMonth, 0).getDate();

  const getLabel = () => {
    const temp = [];
    for (let i = 0; i < numDays; i++) {
      temp.push(i);
    }
    return temp
  }
  const makeData = () => {
    const temp = [];
    const size = PASSED_DATA.length;
    let ptr = size > 1 ? 1 : 0
    if (ptr == 0) {
      for (let i = 0; i < numDays; i++) {
        temp.push(0);
      }
    } else {
      for (let i = 1; i <= numDays; i++) {
        if (i === Number(PASSED_DATA[ptr].date)) {
          temp.push(Number(PASSED_DATA[ptr].price));
          if (ptr + 1 < size) {
            ptr++;
          }
        } else {
          temp.push(0);
        }
      }
    }
    return temp;
  }

  const data = makeData();
  const label = getLabel()


  return (
    <View>
      <LineChart
        data={{
          labels: label,
          datasets: [
            {
              data: data
            }
          ]
        }}
        width={Dimensions.get("window").width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: "#e26a00",
          backgroundGradientFrom: "#fb8c00",
          backgroundGradientTo: "#ffa726",
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        bezier
        style={{
          marginVertical: 10,
          borderRadius: 16
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    margin: 10
  }
});

export default Visualisation;