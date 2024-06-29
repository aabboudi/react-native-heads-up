import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#0c2545',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff'
  },
  text: {
    color: '#fff',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: (screenWidth - 60) / 2,
    padding: 10,
  },
});
