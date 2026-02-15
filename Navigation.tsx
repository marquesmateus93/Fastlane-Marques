import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import App from './App';
import ThankYouScreen from './ThankYouScreen.tsx';
import IDontCareScreen from './IDontCareScreen';

const Stack = createStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={App} />
        <Stack.Screen name="You Are Amazing!" component={ThankYouScreen} />
        <Stack.Screen name="Ignored!" component={IDontCareScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}