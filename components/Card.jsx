import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const { width, height } = Dimensions.get('window');
const vh = height / 100;
const vw = width / 100;

export default Card = ({ title, content, icon, onPress, style }) => {

  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress} activeOpacity={0.75}>
      <View style={styles.cardContent}>
        <View style={styles.textContent}>
          {icon && <Text style={styles.horizontalTitle}><FontAwesome6 name={icon} size={50} color="white" /></Text>}
          {content && <Text style={styles.desc}>{content} {title}</Text>}
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
    backgroundColor: '#3a9ad9',
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
    marginTop: 8,
  },
  textContent: {
    flex: 1,
    margin: 1.2 * vh,
    alignItems: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    height: 60,
    width: 60,
  },
});
