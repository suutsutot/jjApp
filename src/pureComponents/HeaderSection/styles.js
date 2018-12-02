import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  containerStyle: {
    borderBottomWidth: 0,
    height: Platform.OS === 'ios' ? 70 : 70 - 24
  },
  header: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 22
  }
});
