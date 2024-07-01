import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Pressable, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '../components/Card';
import styles from '../assets/styles/styles';
import leagues from '../assets/data/leagues.json';

export default function LeaguesScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={[styles.appContainer, {paddingTop: 100}]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
        {leagues.map((cat, index) => (
          <View key={index} style={styles.cardWrapper}>
            <Card
              title={cat.name}
              content={cat.content.length}
              icon={cat.icon}
              onPress={() => navigation.navigate('Game', { gameContent: shuffleArray(cat.content) })}
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
