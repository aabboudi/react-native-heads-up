import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DeviceMotion } from 'expo-sensors';
import { useNavigation } from '@react-navigation/native';
import * as ScreenOrientation from 'expo-screen-orientation';
import Card from '../components/Card';

import categories from '../assets/data/categories.json';

const screenWidth = Dimensions.get('window').width;

export default function HomeScreen() {
  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const navigation = useNavigation();

  useEffect(() => {
    const subscription = DeviceMotion.addListener((motionData) => {
      if (motionData.rotation) {
        setOrientation(motionData.rotation);
      }
    });

    DeviceMotion.setUpdateInterval(3000);

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function lockScreenOrientation() {
      if (isMounted) {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
      }
    }

    lockScreenOrientation();

    return () => {
      isMounted = false;
      async function unlockScreenOrientation() {
        await ScreenOrientation.unlockAsync();
      }
      unlockScreenOrientation();
    };
  }, []);

  return (
    <View style={styles.appContainer}>
      <Text style={styles.header}>HeadsUp</Text>
      <View style={styles.container}>
        <Text style={styles.text}>Alpha: {orientation.alpha?.toFixed(2)}</Text>
        <Text style={styles.text}>Beta: {orientation.beta?.toFixed(2)}</Text>
        <Text style={styles.text}>Gamma: {orientation.gamma?.toFixed(2)}</Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
        {categories.map((cat, index) => (
          <View key={index} style={styles.cardWrapper}>
            <Card
              title={cat.name.toUpperCase()}
              content={cat.content.length}
              onPress={() => {
                navigation.navigate('Game');
              }}
            />
          </View>
        ))}
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#0c2545',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff'
  },
  text: {
    color: '#fff',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: (screenWidth - 60) / 2,
    padding: 10,
  },
});
