import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const vh = height / 100;
const vw = width / 100;

export default Card = ({ title, content, onPress, style }) => {
  const textColor = 'white';

  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress} activeOpacity={0.75}>
      <View style={styles.cardContent}>
        <View style={styles.textContent}>
          {title && <Text style={styles.horizontalTitle}>{title}</Text>}
          {content && <Text style={styles.desc}>{content}</Text>}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    maxWidth: 50 * vw,
    height: 40 * vw,
    padding: .5 * vh,
    backgroundColor: '#004F98',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { height: 2, width: 0 },
  },
  horizontalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  desc: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
  },
  textContent: {
    flex: 1,
    margin: 1.2 * vh,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
});
