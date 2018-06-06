import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    buttons: {
        marginBottom: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%'
    },
    TouchableOpacityStyles: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    backgroundColorContentWhite: {
        backgroundColor: '#fff'
    },
    layoutRow: {
        flexDirection: 'row'
    },
    layoutColumn: {
        flexDirection: 'column'
    },
    // leftPaddingText: {
    //     paddingLeft: 10
    // },
    shadowContainer: {
        shadowColor: '#000',
        shadowOffset: {height: 0.5},
        shadowOpacity: 0.1,
        shadowRadius: 0.5,
        elevation: 4
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
    spaceBetweenText: {
        justifyContent: 'space-between',
        // alignItems: 'start',
    },
    paddingClass: {
        paddingLeft: 10,
        paddingVertical: 7
    },
    containerProcess: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles
