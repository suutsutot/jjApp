import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  buttonView: {
    justifyContent: 'center',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    height: 40
  },
  buttonText: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold'
  }
});

const specificStyles = {
  primary: StyleSheet.create({
    buttonView: {
      backgroundColor: '#00bcd4',
      borderColor: '#00bcd4',
      borderWidth: 1,
      borderRadius: 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 1
    },
    buttonText: {
      color: '#fff'
    }
  }),
  secondary: StyleSheet.create({
    buttonView: {
      backgroundColor: 'transparent',
      borderColor: '#00bcd4',
      borderWidth: 1,
      borderRadius: 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 1
    },
    buttonText: {
      color: '#00bcd4'
    }
  }),
  text: StyleSheet.create({
    buttonView: {},
    buttonText: {
      color: '#ccc',
      fontWeight: 'normal'
    }
  })
};

export const getSpecificStyles = type => specificStyles[type];
