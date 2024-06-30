import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../assets/styles/styles';

const SettingsScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.appContainer}>
      <Text style={styles.header}>Settings</Text>
      <Text style={styles.text}>Time per round</Text>
    </View>
  );
};

export default SettingsScreen;
