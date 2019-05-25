import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff'
  },
  auth_content: {
    paddingHorizontal: 30
  },
  buttonText: {
    color: '#fff'
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
  logo_title: {
    color: '#546e7a',
    textAlign: 'center',
    marginBottom: 10,
    alignSelf: 'center',
    fontSize: 20
  },
  buttons: {
    marginBottom: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  login_button: {
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00bcd4'
  },
  errorView: { height: 14 },
  errorText: { color: 'red', textAlign: 'center' },
  arrowBackIcon: {
    position: 'absolute',
    top: 15,
    left: 15,
    width: 30,
    height: 30
  }
});

export default styles;
