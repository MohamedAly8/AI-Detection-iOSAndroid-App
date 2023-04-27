import { StyleSheet, Text, View } from 'react-native';

import AboutScreen from './Screens/About';
import HomeScreen from './Screens/Home';
import AnalysisScreen from './Screens/Analysis';
import SettingsScreen from './Screens/Settings';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        activeColor="#fff"
        barStyle={{ backgroundColor: '#3f51b5' }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarColor: '#3f51b5',
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Analysis"
          component={AnalysisScreen}
          options={{
            tabBarLabel: 'Analysis',
            tabBarColor: '#3f51b5',
            tabBarIcon: ({ color }) => (
              <Ionicons name="analytics" color={color} size={26} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{

            tabBarLabel: 'Settings',
            tabBarColor: '#3f51b5',
            tabBarIcon: ({ color }) => (
              <Ionicons name="settings" color={color} size={26} />
              ),
              }}
              />

        <Tab.Screen
          name="About"
          component={AboutScreen}

          options={{
            tabBarLabel: 'About',
            tabBarColor: '#3f51b5',
            tabBarIcon: ({ color }) => (
              <Ionicons name="information-circle" color={color} size={26} />
              ),

              }}
              />


      </Tab.Navigator>
      </NavigationContainer>

  );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
