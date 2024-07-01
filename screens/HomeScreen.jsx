import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Pressable, Modal, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from '../components/Card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import categories from '../assets/data/categories.json';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import styles from '../assets/styles/styles';

export default function HomeScreen() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  // useEffect(() => {
  //   const checkAndSetRoundTime = async () => {
  //     try {
  //       const roundTimeValue = await AsyncStorage.getItem('roundtime');
  //       console.log(roundTimeValue); // REMOVE FUNCTION LATER
  //       if (roundTimeValue !== null) {
  //         await AsyncStorage.setItem('roundtime', '60');
  //       }
  //     } catch (error) {
  //       console.error('Error accessing AsyncStorage:', error);
  //     }
  //   };

  //   checkAndSetRoundTime();
  // }, []);

  return (
    <View style={styles.appContainer}>
      <Text style={styles.header}>HeadsUp</Text>

      {/* Gear Icon to Open Modal */}
      <Pressable
        // onPress={() => setModalVisible(true)}
        onPress={() => navigation.navigate('Settings')}
        android_ripple={{ color: 'lightgrey' }}
        style={({ pressed }) => [
          styles.gearIcon,
          { opacity: pressed ? 0.5 : 1 }, // Adjust opacity on press
        ]}
      >
        <FontAwesome6 name="gear" size={24} color="white" />
      </Pressable>

      {/* Modal Component */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Modal Content Here</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* ScrollView for Category Cards */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.categoryContainer}>
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
