import { Platform, StyleSheet } from 'react-native';

export default StyleSheet.create({
  containerStyle: {
    borderBottomWidth: 0,
    height: Platform.select({
      ios: 70,
      android: 70 - 24
    })
  },
  header: {
    color: '#fff',
    fontSize: 18,
    marginBottom: Platform.select({
      ios: 0,
      android: 22
    })
  }
});
