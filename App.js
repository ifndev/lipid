import React from 'react';

import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import HomeComponent from './components/HomeComponent'
import ScannerComponent from './components/ScannerComponent';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeComponent} options={{ headerShown: false }} />
          <Stack.Screen name="Scanner" component={ScannerComponent} />
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}