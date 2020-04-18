import React from 'react';
import { DarkTheme as PaperDarkTheme, Provider as PaperProvider } from 'react-native-paper';
import store from './redux/Store';

// Navigation
import 'react-native-gesture-handler';
import { NavigationContainer, DarkTheme as NavDarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import productReducer from './redux/reducers/ProductReducer';

// Components
import HomeComponent from './components/HomeComponent';
import ScannerComponent from './components/ScannerComponent';

const Stack = createStackNavigator();

const theme = {
  ...PaperDarkTheme,
  dark: true,
  roundness: 2,
  colors: {
    ...PaperDarkTheme.colors,
    primary: '#81c784',
    accent: '#a5d6a7',
    background: '#102027',
    backdrop: '#102027'
  },
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={NavDarkTheme}>
        <PaperProvider theme={theme}>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomeComponent} options={{ headerShown: false }} />
            <Stack.Screen name="Scanner" component={ScannerComponent} />
          </Stack.Navigator>
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
}