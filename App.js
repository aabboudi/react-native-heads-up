import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import GameScreen from './screens/GameScreen';
import LeaguesScreen from './screens/LeaguesScreen';
import ScoreScreen from './screens/ScoreScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerTitleAlign: 'center' }} >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ headerShown: true }} />
        <Stack.Screen name="Game" component={GameScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Leagues" component={LeaguesScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Score" component={ScoreScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      <StatusBar style="light" hidden />
    </NavigationContainer>

  );
}
