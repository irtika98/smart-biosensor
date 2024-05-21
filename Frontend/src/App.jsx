// App.js
import React from 'react';
import { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

//Navigation
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

//screens
import HomePage from './screens/HomePage';
import LoginPage from './screens/LoginPage';
import MeasureHCG from './screens/MeasureHCG';
import GeneralInfo from './screens/GeneralInfo';
// type RootStackParamList = {
//   Home: undefined,
//   Details: { userName: string }
// };

const Stack = createNativeStackNavigator()
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginPage'>
        <Stack.Screen
          name='LoginPage'
          component={LoginPage}
        // options={{
        //   title: "Product Details"
        // }}
        />
        <Stack.Screen
          name='HomePage'
          component={HomePage}
        // options={{
        //   title: "Trending Products"
        // }}
        />
        <Stack.Screen
          name='MeasureHCG'
          component={MeasureHCG}
        // options={{
        //   title: "Trending Products"
        // }}
        />
        <Stack.Screen
          name='GeneralInfo'
          component={GeneralInfo}
        // options={{
        //   title: "Trending Products"
        // }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
