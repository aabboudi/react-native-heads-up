import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DeviceMotion } from 'expo-sensors';
import * as ScreenOrientation from 'expo-screen-orientation';

export default function Game() {
  const [orientation, setOrientation] = useState({ alpha: 0, beta: 0, gamma: 0 });

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

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Alpha: {orientation.alpha?.toFixed(2)}</Text>
      <Text style={styles.text}>Beta: {orientation.beta?.toFixed(2)}</Text>
      <Text style={styles.text}>Gamma: {orientation.gamma?.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0c2545',
  },
  text: {
    color: '#fff',
  },
});
