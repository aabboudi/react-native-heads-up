import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import styles from '../assets/styles/styles';

const SettingsScreen = () => {
  const navigation = useNavigation();
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  useEffect(() => {
    // Load saved settings when the component mounts
    const loadSettings = async () => {
      try {
        const savedMinutes = await AsyncStorage.getItem('@minutes');
        const savedSeconds = await AsyncStorage.getItem('@seconds');
        if (savedMinutes !== null) setMinutes(savedMinutes);
        if (savedSeconds !== null) setSeconds(savedSeconds);
      } catch (e) {
        Alert.alert('Error', 'Failed to load settings.');
      }
    };

    loadSettings();
  }, []);

  const saveSettings = async () => {
    try {
      if (Number(minutes) > 59 || Number(seconds) > 59) {
        Alert.alert('Invalid Input', 'Minutes and seconds should be less than 60.');
        return;
      }
      await AsyncStorage.setItem('@minutes', minutes);
      await AsyncStorage.setItem('@seconds', seconds);
      Alert.alert('Success', 'Settings saved successfully.', [{ text: 'OK', onPress: () => { setMinutes(''); setSeconds(''); } }]);
    } catch (e) {
      Alert.alert('Error', 'Failed to save settings.');
    }
  };

  return (
    <View style={styles.appContainer}>
      <Text style={styles.header}>Settings</Text>
      <Text style={styles.text}>Time per round</Text>
      <TextInput
        style={styles.input}
        placeholder="Minutes"
        keyboardType="numeric"
        value={minutes}
        onChangeText={text => setMinutes(text.replace(/[^0-9]/g, ''))}
        maxLength={2}
      />
      <TextInput
        style={styles.input}
        placeholder="Seconds"
        keyboardType="numeric"
        value={seconds}
        onChangeText={text => setSeconds(text.replace(/[^0-9]/g, ''))}
        maxLength={2}
      />
      <Button title="Save" onPress={saveSettings} />
    </View>
  );
};

export default SettingsScreen;


const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '80%',
    borderRadius: 5,
  },
});
