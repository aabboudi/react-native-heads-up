import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, Link, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
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

  return (
    <View style={styles.appContainer}>
      <Text style={styles.header}>HeadsUp</Text>

      <Pressable onPress={() => {navigation.navigate('Settings');}}>
        <Text>
          <FontAwesome6 name="gear" size={24} color="white" />
        </Text>
      </Pressable>

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
        <View style={styles.cardWrapper}>
          <Card
            title=""
            content="Random"
            icon="shuffle"
            onPress={() => {
              navigation.navigate('Game', { gameContent: shuffleArray(categories.flatMap(category => category.content)) })
            }}
          />
        </View>
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
