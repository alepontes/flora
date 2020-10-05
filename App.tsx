// In App.js in a new project

import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'
import Cam from './src/cam';
import Resume from './src/resume';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Cam} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Resume" 
          component={Resume} 
          options={{ headerShown: false }}
        />       
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
