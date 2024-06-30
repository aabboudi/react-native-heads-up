import React, { useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../assets/styles/styles';

const answers = [
    {"name": "The Godfather", "value": false},
    {"name": "The Shawshank Redemption", "value": true},
    {"name": "The Godfather II", "value": true},
    {"name": "Inception", "value": true},
    {"name": "Fight Club", "value": false},
    {"name": "The Dark Knight", "value": true},
    {"name": "12 Angry Men", "value": true},
    {"name": "Lord of the Rings", "value": true},
    {"name": "The Matrix", "value": true},
    {"name": "Seven", "value": true},
    {"name": "Schindler's List", "value": true},
    {"name": "Raging Bull", "value": false},
    {"name": "Casablanca", "value": true},
    {"name": "Citizen Kane", "value": true},
    {"name": "Gone With The Wind", "value": true},
    {"name": "The Wizard of Oz", "value": true},
    {"name": "Lawrence of Arabia", "value": true}
]

const trueCount = answers.filter(answer => answer.value).length;

const ScoreScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.appContainer}>
      <Text style={styles.header}>Final Score</Text>
      <Text style={styles.header}>{trueCount}/{answers.length}</Text>
      <ScrollView contentContainerStyle={scoreSheet.answerView}>
        {answers.map((ans, index) => (
            <Text key={index} style={[styles.text, scoreSheet.answerTrue, !ans.value && scoreSheet.answerFalse]}>{ans.name}</Text>
        ))}
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
