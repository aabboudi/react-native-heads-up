import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert, Button, BackHandler } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { DeviceMotion } from 'expo-sensors';
import * as ScreenOrientation from 'expo-screen-orientation';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screen = Dimensions.get('window');
const countdown = 3;

const getRemainingTime = (time) => ({
  min: ('0' + Math.floor(time / 60)).slice(-2),
  sec: ('0' + time % 60).slice(-2)
});

export default function Game() {
  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });
  const [remainingSec, setRemainingSec] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const { min, sec } = getRemainingTime(remainingSec);
  const [gamma, setGamma] = useState(0);
  const [gameState, setGameState] = useState(0);
  const [gameMsg, setMsg] = useState('Place on Forehead');
  const [index, setIndex] = useState(0);
  const [stater, setStater] = useState(-1);
  const [correctWords, setCorrect] = useState(0);
  const [passedWords, setPass] = useState(0);
  const [countround, setCountround] = useState(60);
  const [results, setResults] = useState([]); // State to store the results
  const navigation = useNavigation();

  const route = useRoute();
  const { gameContent } = route.params;

  useEffect(() => {
    const subscription = DeviceMotion.addListener((motionData) => {
      if (motionData.rotation) {
        setOrientation(motionData.rotation);
        setGamma(Math.abs(motionData.rotation.gamma));
      }
    });

    DeviceMotion.setUpdateInterval(50);

    return () => {
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function lockScreenOrientation() {
      if (isMounted) {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT);
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

  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedMinutes = await AsyncStorage.getItem('@minutes');
        const savedSeconds = await AsyncStorage.getItem('@seconds');
        if (savedMinutes !== null && savedSeconds !== null) {
          setCountround(parseInt(savedMinutes) * 60 + parseInt(savedSeconds));
        }
      } catch (e) {
        Alert.alert('Error', 'Failed to load settings.');
      }
    };

    loadSettings();
  }, []);

  useEffect(() => {
    if (gameState === 0) {
      if (gamma > .8 && gamma < 2.2) {
        setGameState(1);
        setRemainingSec(countdown);
        setIsActive(true);
      }
    } else if (gameState === 1 && remainingSec === 0) {
      setGameState(2);
      setRemainingSec(countround);
      setIsActive(true);
    } else if (gameState === 2 && remainingSec === 0) {
      endGame();
    }
  }, [gameState, gamma, remainingSec]);

  useEffect(() => {
    let interval = null;
    if (isActive && remainingSec > 0) {
      interval = setInterval(() => {
        setRemainingSec((sec) => sec - 1);
      }, 1000);
    } else if (!isActive) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, remainingSec]);

  useEffect(() => {
    if (stater === 0) {
      setMsg(gameContent[index]);
    } else {
      if (stater === 1) {
        setMsg("Correct!");
        setCorrect((words) => words + 1);
        setIndex((idx) => (idx >= gameContent.length - 1 ? 0 : idx + 1));
        saveResult(gameContent[index], true);
      } else if (stater === 2) {
        setMsg("Pass!");
        setPass((words) => words + 1);
        setIndex((idx) => (idx >= gameContent.length - 1 ? 0 : idx + 1));
        saveResult(gameContent[index], false);
      }
    }
  }, [stater]);

  useEffect(() => {
    if (gameState === 2) {
      if (gamma > .8 && gamma < 2.2 && stater !== 0) {
        setStater(0);
      } else if (gamma > 2.2 && stater !== 1) {
        setStater(1);
      } else if (gamma < .8 && stater !== 2) {
        setStater(2);
      }
    }
  }, [gamma, gameState]);

  const saveResult = (value, response) => {
    setResults((prevResults) => [...prevResults, { value, response }]);
  };

  const endGame = () => {
    setGameState(3);
    setIsActive(false);
    setTimeout(() => {
      setMsg(`Game Over!\nCorrect Words: ${correctWords}\nPassed Words: ${passedWords}`);
      navigation.navigate('Score', { results });
    }, 500); // Delay navigation by 0.5 seconds
  };

  useEffect(() => {
    const backAction = () => {
      return true; // Prevent default behavior
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
    <View style={styles.container}>
      <Text style={styles.text}>{`${gameMsg}`}</Text>
      <Text style={styles.textTimer}>{`${min}:${sec}`}</Text>
      {gameState === 2 && (
        <Button title="Finish" onPress={endGame} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 5,
    backgroundColor: '#0c2545',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 60,
    fontWeight: 'bold',
    margin: 5,
    color: "#fff",
    textAlign: "center",
  },
  textTimer: {
    fontSize: 20,
    margin: 5,
    color: "#fff",
    textAlign: "center",
  },
});
