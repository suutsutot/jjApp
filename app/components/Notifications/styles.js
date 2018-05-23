import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    TouchableOpacityStyles: {
        margin: 10,
        height: 40,
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
    },
    grayColorText: {
        color: '#78909c',
        fontSize: 14,
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
        width: 100,
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
        alignItems: 'center',
    },
});

export default styles
