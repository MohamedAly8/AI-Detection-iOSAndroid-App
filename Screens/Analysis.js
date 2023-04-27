import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  insights: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    margin: 10,
  },
  insightheader: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  insighttext: {
    fontSize: 16,
    marginBottom: 3,
  },
  insightscolor: {
    marginTop: 10,
  },
  insightentry: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    backgroundColor:  '#CBC3E3',
  },
  insightentrytext: {
    fontSize: 16,
  },
  insightentrydata: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const insightsData = [
  {
    id: 1,
    date: '2022-04-22',
    time: '12:30 PM',
    numSkittles: 50,
    numDefect: 2,
    numGreen: 10,
    numYellow: 20,
    numRed: 15,
    numOrange: 5,
  },
  {
    id: 2,
    date: '2022-04-23',
    time: '2:45 PM',
    numSkittles: 40,
    numDefect: 1,
    numGreen: 5,
    numYellow: 10,
    numRed: 20,
    numOrange: 5,
  },
    {
    id: 3,
    date: '2022-04-24',
    time: '1:30 PM',
    numSkittles: 60,
    numDefect: 3,
    numGreen: 15,
    numYellow: 10,
    numRed: 20,
    numOrange: 15,
    },
    {
    id: 4,
    date: '2022-04-25',
    time: '12:30 PM',
    numSkittles: 50,
    numDefect: 2,
    numGreen: 10,
    numYellow: 20,
    numRed: 15,
    numOrange: 5,
    },
    {
    id: 5,
    date: '2022-04-26',
    time: '12:30 PM',
    numSkittles: 50,
    numDefect: 2,
    numGreen: 10,
    numYellow: 20,
    numRed: 15,
    numOrange: 5,
    },
];

const Analysis = () => {
  return (
    <View style={styles.insights}>
      <Text style={styles.insightheader}>Insights</Text>
      {insightsData.map((entry) => (
        <View key={entry.id} style={styles.insightentry}>
          <View>
            <Text style={styles.insightentrytext}>Date: {entry.date}</Text>
            <Text style={styles.insightentrytext}>Time: {entry.time}</Text>
          </View>
          <View>
            <Text style={styles.insightentrydata}>Skittles: {entry.numSkittles}</Text>
            <Text style={styles.insightentrydata}>Defected: {entry.numDefect}</Text>
            <View style={styles.insightscolor}>
              <Text style={styles.insightentrydata}>Green: {entry.numGreen}</Text>
              <Text style={styles.insightentrydata}>Yellow: {entry.numYellow}</Text>
              <Text style={styles.insightentrydata}>Red: {entry.numRed}</Text>
              <Text style={styles.insightentrydata}>Orange: {entry.numOrange}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

export default Analysis;
