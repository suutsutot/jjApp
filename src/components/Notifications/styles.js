import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 10,
    alignItems: 'flex-start'
  },
  layoutRow: {
    flexDirection: 'row'
  },
  layoutColumn: {
    flex: 1,
    flexDirection: 'column'
  },
  blackColorText: {
    color: '#000',
    fontSize: 14,
    flexWrap: "wrap"
  },
  grayColorText: {
    color: '#78909c',
    fontSize: 14,
    flexWrap: "wrap"
  },
  leftPaddingText: {
    paddingLeft: 10
  },
  backgroundColorContentWhite: {
    backgroundColor: '#fff'
  },
  backgroundColorContentGray: {
    backgroundColor: '#f0eff4'
  },
  marginFooter: {
    // marginVertical: 25
  },
  marginBottom: {
    marginBottom: 25
  },
  picker: {
    width: 100
  },
  shadowContainer: {
    shadowColor: '#000',
    shadowOffset: { height: 0.5 },
    shadowOpacity: 0.1,
    shadowRadius: 0.5,
    elevation: 4
  },
  containerProcess: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  notificationIcon: {
    height: 40,
    width: 40,
    borderRadius: 20
  },
  actionsView: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  actionButton: {
    width: 160
  }
});

export default styles;
