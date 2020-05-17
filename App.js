import React from 'react';
import { DefaultTheme as PaperDefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// Navigation
import 'react-native-gesture-handler';
import { NavigationContainer, DarkTheme as NavDarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Redux
import { Provider } from 'react-redux';
import { getStore, getPersistor } from './redux/configureStore';

//Redux persist
import { PersistGate } from 'redux-persist/integration/react'

// Components
import HomeComponent from './components/HomeComponent';
import ScannerComponent from './components/ScannerComponent';

const Stack = createStackNavigator();

const theme = {
  ...PaperDefaultTheme,
  dark: false,
  roundness: 20,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#81c784',
    accent: '#a5d6a7',
    background: '#fff',
    backdrop: '#FFFFFFAA'
  },
};

export default function App() {
  const store = getStore();
  const persistor = getPersistor();

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={NavDarkTheme}>
          <PaperProvider theme={theme}>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="Home" component={HomeComponent} options={{ headerShown: false }} />
              <Stack.Screen name="Scanner" component={ScannerComponent} />
            </Stack.Navigator>
          </PaperProvider>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}