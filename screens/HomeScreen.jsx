import React, { useEffect } from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '../components/Card';
import categories from '../assets/data/categories.json';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import styles from '../assets/styles/styles';
import * as ScreenOrientation from 'expo-screen-orientation';

import CustomButton from '../components/Button';

export default function HomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const lockOrientation = async () => {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };

    lockOrientation();

    return () => {
      const unlockOrientation = async () => {
        await ScreenOrientation.unlockAsync();
      };

      unlockOrientation();
    };
  }, []);

  return (
    <View style={styles.appContainer}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', alignItems: 'center', position: 'relative'}}>
          <Text style={styles.header}>Anchita</Text>

          <Pressable
            onPress={() => navigation.navigate('Settings')}
            android_ripple={{ color: 'lightgrey' }}
            style={({ pressed }) => [
              // styles.gearIcon,
              { opacity: pressed ? 0.5 : 1 , position: 'absolute', right: 10, bottom: 37},
            ]}
          >
            <FontAwesome6 name="gear" size={24} color="white" />
          </Pressable>
        </View>

        <View style={styles.categoryContainer}>
          {categories.map((cat, index) => (
            <View key={index} style={styles.cardWrapper}>
              <Card
                title={cat.name}
                content={cat.content.length}
                icon={cat.icon}
                onPress={() => navigation.navigate('Game', { gameContent: shuffleArray(cat.content) })}
              />
            </View>
          ))}
          <View style={styles.cardWrapper}>
            <Card
              title=""
              content="Football Leagues"
              icon="soccer-ball"
              onPress={() => navigation.navigate('Leagues')}
            />
          </View>
          <View style={styles.cardWrapper}>
            <Card
              title=""
              content="Random"
              icon="shuffle"
              onPress={() => navigation.navigate('Game', { gameContent: shuffleArray(categories.flatMap(category => category.content)) })}
            />
          </View>
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
