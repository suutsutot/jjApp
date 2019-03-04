import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  mainContainer: {
    paddingHorizontal: 30
  },
  generalInformationView: {
    paddingVertical: 15
  },
  generalInformationText: {
    fontSize: 18,
    fontWeight: '400'
  },
  nextButton: {
    paddingTop: 25,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  dateView: {
    flex: 1,
    paddingTop: 5
  },
  birthdayView: {
    flexDirection: 'column',
    paddingBottom: 10
  },
  birthdayText: {
    fontSize: 12,
    marginBottom: 3
  },
  birthdayDate: {
    color: '#000000',
    fontSize: 15
  },
  chooseDateText: {
    fontSize: 15,
    paddingBottom: 10
  }
});

export default styles;
