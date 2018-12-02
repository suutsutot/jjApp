import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
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
    alignItems: 'center',

  },
  icon_aria: {
    height: 38,
    width: 38,
    backgroundColor: "#fff",
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
  },
  social_button: {
    height: 48,
    borderRadius: 2,
    paddingLeft: 5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  login_button: {
    height: 40,
    borderRadius: 20,
    backgroundColor: '#00bcd4'
  }

});

export default styles
