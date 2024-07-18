import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, BackHandler, Button } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from '../assets/styles/styles';
import * as ScreenOrientation from 'expo-screen-orientation';
import CustomButton from '../components/CustomButton';

const ScoreScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { results } = route.params;
  const trueCount = results.filter(result => result.response).length;
  const [isDisabled, setIsDisabled] = useState(false)

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

  useEffect(() => {
    const backAction = () => {
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      gestureEnabled: false,
    });
  }, [navigation]);

  return (
    <View style={{flex: 1, backgroundColor: '#0c2545'}}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
        <Text style={styles.header}>Final Score</Text>
        <CustomButton
          title="Go Back"
          disabled={isDisabled}
          onPress={() => {navigation.navigate('Home'); setIsDisabled(true)}}
        />
        <Text style={styles.header}>{trueCount}/{results.length}</Text>
        <View style={scoreSheet.answerView}>
          {results.map((result, index) => (
            <Text key={index} style={[styles.text, scoreSheet.answerTrue, !result.response && scoreSheet.answerFalse]}>{result.value}</Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default ScoreScreen;

const scoreSheet = StyleSheet.create({
  answerView: {
    flex: 1,
    alignItems: 'center',
  },
  answerTrue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  answerFalse: {
    color: '#888',
    textDecorationLine: 'line-through',
  }
});
