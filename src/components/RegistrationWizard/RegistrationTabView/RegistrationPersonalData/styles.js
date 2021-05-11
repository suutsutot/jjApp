import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff'
  },
  mainContainer: {
    paddingHorizontal: 30
  },
  generalInformationView: {
    paddingVertical: 15
  },
  generalInformationText: {
    fontSize: 18,
    fontWeight: '500'
  },
  nextButton: {
    paddingTop: 25,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  dateView: {
    flex: 1,
    paddingTop: 15
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
    fontSize: 16,
    paddingBottom: 10,
    color: '#707070'
  }
});

export default styles;
