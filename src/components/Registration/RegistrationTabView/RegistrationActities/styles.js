import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff'
  },
  notActiveTitleStyle: {
    fontSize: 15
  },
  activeTitleStyle: {
    fontSize: 15,
    color: '#00bcd4'
  },
  activeView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    marginTop: 5,
    backgroundColor: '#e0f7fa'
  },
  notActiveView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    marginTop: 5,
    backgroundColor: '#fff'
  },
  notActiveLogo: {
    marginLeft: 20,
    marginRight: 20,
    color: '#333333'
  },
  activeLogo: {
    marginLeft: 20,
    marginRight: 20,
    color: '#00bcd4'
  },
});

export default styles;
