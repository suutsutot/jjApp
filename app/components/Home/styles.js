import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    TouchableOpacityStyles: {
        margin: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    layoutRow: {
        flexDirection: 'row'
    },
    layoutColumn: {
        flexDirection: 'column'
    },
    blackColorText: {
        color: '#000',
        fontSize: 14,
        // fontFamily: 'Roboto',
    },
    grayColorText: {
        color: '#78909c',
        fontSize: 14,
        // fontFamily: 'Roboto',
    },
    leftPaddingText: {
        paddingLeft: 10
    },

    scroll: {
        backgroundColor: '#FFF',
    },
    container: {
        flex: 1,
    },
    cardContainer: {
        flex: 1,
    },
    headerBackgroundImage: {
        paddingBottom: 20,
        paddingTop: 35,
    },
    headerContainer: {
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    userRow: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        marginBottom: 12,
    },
    userImage: {
        borderRadius: 60,
        height: 110,
        marginBottom: 10,
        width: 110,
    },
    userNameRow: {
        marginBottom: 10,
    },
    userNameText: {
        color: '#fff',
        textShadowColor: '#000',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    userPlaceRow: {
        marginLeft: 40,
        marginRight: 40,
    },
    userPlaceText: {
        color: '#fff',
        textShadowColor: '#000',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 10,
        fontSize: 13.5,
        textAlign: 'center',
    },
    socialRow: {
        flexDirection: 'row',
    },
    iconSize: {
        height: 26,
        width: 26,
    },
    socialIcon: {
        marginLeft: 14,
        marginRight: 14,
    },
    tabContainer: {
        flex: 1,
        marginBottom: 12,
    },
    indicatorTab: {
        backgroundColor: 'transparent',
    },
    tabBar: {
        backgroundColor: '#EEE',
    },
    tabLabelText: {
        color: 'black',
        fontSize: 22.5,
        fontWeight: '600',
        textAlign: 'center',
    },
    tabLabelNumber: {
        color: 'gray',
        fontSize: 12.5,
        textAlign: 'center',
    },
    containerProcess: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backgroundColorContentWhite: {
        backgroundColor: '#fff'
    },
    shadowContainer: {
        // shadowColor: '#000',
        // shadowOffset: { height: 0.5 },
        // shadowOpacity: 0.1,
        // shadowRadius: 0.5,
        // elevation: 4,
        // marginBottom: 20
        shadowColor: '#000',
        shadowOffset: { height: 0.5 },
        shadowOpacity: 0.1,
        shadowRadius: 0.5,
        elevation: 4
    }
});

export default styles
