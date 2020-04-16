import React from 'react';

import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import HomeComponent from './components/HomeComponent'
import ScannerComponent from './components/ScannerComponent';

function HomeScreen() {
  return (
    <HomeComponent/>
  );
}

function ScannerScreen() {
  return (
    <ScannerComponent/>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Scanner" component={ScannerScreen} />
      </Stack.Navigator>
      </PaperProvider>
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
