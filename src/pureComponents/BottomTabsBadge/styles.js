import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  badgeView: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: 'red',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 1
  },
  badgeText: { color: 'white', fontSize: 10 }
});
