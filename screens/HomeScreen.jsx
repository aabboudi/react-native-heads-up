import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import Card from '../components/Card';
import styles from '../assets/styles/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import categories from '../assets/data/categories.json';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

export default function HomeScreen() {
  const navigation = useNavigation();

    useEffect(() => {
    const checkAndSetRoundTime = async () => {
      try {
        const roundTimeValue = await AsyncStorage.getItem('roundtime');
        console.log(roundTimeValue); // REMOVE FUNCTION LATER
        if (roundTimeValue !== null) {
          await AsyncStorage.setItem('roundtime', '60');
        }
      } catch (error) {
        console.error('Error accessing AsyncStorage:', error);
      }
    };

    checkAndSetRoundTime();
  }, []);

  // useEffect(() => {
  //   let isMounted = true;

  //   async function lockScreenOrientation() {
  //     if (isMounted) {
  //       await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
  //     }
  //   }

  //   lockScreenOrientation();

  //   return () => {
  //     isMounted = false;
  //     async function unlockScreenOrientation() {
  //       await ScreenOrientation.unlockAsync();
  //     }
  //     unlockScreenOrientation();
  //   };
  // }, []);

  return (
    <View style={styles.appContainer}>
      <Text style={styles.header}>HeadsUp</Text>
      {/* <Card
        title="Settings"
        onPress={() => {
          navigation.navigate('Settings');
        }}
      />
      <FontAwesome6 name="gear" size={24} color="white" /> */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
        {categories.map((cat, index) => (
          <View key={index} style={styles.cardWrapper}>
            <Card
              title={cat.name}
              content={cat.content.length}
              icon={cat.icon}
              onPress={() => {
                navigation.navigate('Game', { gameContent: shuffleArray(cat.content) })
              }}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
