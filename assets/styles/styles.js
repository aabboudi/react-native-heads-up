import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#0c2545',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    paddingBottom: 25,
    paddingTop: 60,
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

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    minWidth: 100,
    alignItems: 'center',
    backgroundColor: '#007AFF', // Example button color
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
