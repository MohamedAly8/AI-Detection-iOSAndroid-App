import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Switch, StyleSheet } from 'react-native';

const Settings = () => {
  const [toggle1, setToggle1] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <TouchableOpacity style={styles.settingOption} onPress={() => setToggle1(!toggle1)}>
        <Text style={styles.settingOptionText}>Toggle Setting 1</Text>
        <Switch value={toggle1} onValueChange={(value) => setToggle1(value)} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingOption} onPress={() => setToggle2(!toggle2)}>
        <Text style={styles.settingOptionText}>Toggle Setting 2</Text>
        <Switch value={toggle2} onValueChange={(value) => setToggle2(value)} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingOption} onPress={() => setToggle3(!toggle3)}>
        <Text style={styles.settingOptionText}>Toggle Setting 3</Text>
        <Switch value={toggle3} onValueChange={(value) => setToggle3(value)} />
      </TouchableOpacity>
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
  settingsList: {
    marginBottom: 20,
  },
  settingOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  settingOptionText: {
    fontSize: 18,
  },
});

export default Settings;