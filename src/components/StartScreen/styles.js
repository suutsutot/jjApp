import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#fff'
  },
  section: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    marginBottom: 10
  },
  lastSection: {
    marginBottom: 40
  },
  logo: {
    alignSelf: 'center',
    height: 50,
    width: 190,
    resizeMode: 'contain',
    paddingVertical: 20,
    marginTop: 30,
    marginBottom: 10
  },
  loginTipText: {
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 20
  },
  button: {
    width: '100%'
  }
});

export default styles;
