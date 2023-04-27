import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const About = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>By Mohamed Aly </Text>
      <Text style={styles.description}>
        This app is a proof of concept for video analytics. Its main purpose is to analyze the camera feed and provide real-time data on the skittles present in the video. The app provides the following information:
      </Text>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>Total Number of Skittles</Text>
        <Text style={styles.info}>Color of Skittles</Text>
        <Text style={styles.info}>Any dis-formed (without color, half bitten, etc.,) Skittles</Text>
        <Text style={styles.info}>Real-time Analytics</Text>
        <Text style={styles.info}>Add or delete Skittles updates the summary of numbers and colors and dis-formed Skittles</Text>
        <Text style={styles.info}>Back or front camera view in the app should be (as video updates the numbers) in one collective formation or in assembly line formation</Text>
      </View>
      <Text style={styles.disclaimer}>
        Note: This app is a proof of concept and is not intended for commercial use. Its purpose is to demonstrate the capabilities of video analytics and provide a starting point for further development.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  disclaimer: {
    fontSize: 12,
    fontStyle: 'italic',
  },
});

export default About;