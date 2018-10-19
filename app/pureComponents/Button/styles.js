import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  buttonText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonView: {
    alignSelf: 'stretch',
    marginLeft: 5,
    marginRight: 5
  }
});

const specificStyles = {
  primary: StyleSheet.create({
    buttonText: {
      color: '#fff'
    },
    buttonView: {
      backgroundColor: '#00bcd4',
      borderRadius: 30,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.12,
      shadowRadius: 1
    }
  }),
  text: StyleSheet.create({
    buttonText: {
      color: '#ccc'
    },
    buttonView: {}
  })
};

export const getSpecificStyles = type => specificStyles[type];
