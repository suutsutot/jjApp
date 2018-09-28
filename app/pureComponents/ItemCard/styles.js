import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    jjCard: {
        shadowColor: '#000',
        shadowOffset: {height: 0.5},
        shadowOpacity: 0.1,
        shadowRadius: 0.5,
        elevation: 4,
        flexDirection: 'column',
        backgroundColor: '#fff',
        minHeight: 235,
        flex: 1,
        padding: 24,
        margin: 10
    },
    cardAvatar: {
        width: 64,
        height: 64,
        borderRadius: 50,
        resizeMode: 'cover',
        marginRight: 15
    },
    cardHeader: {
        fontSize: 14,
        color: '#37474f'
    },
    cardSubHeader: {
        fontSize: 14,
        color: '#b0bec5'
    },
    cardIcon: {
        color: '#cfd8dc'
    },
    textMargin: {
        marginLeft: 8
    },
    cardEventDay: {
        marginTop: 15,
        marginBottom: 25
    },
    inviteButton: {
        width: 120,
        height: 32,
        borderRadius: 16,
        borderStyle: 'solid',
        borderColor: '#00bcd4',
        backgroundColor: '#ffffff',
        borderWidth: 1
    },
    joinButton: {
        width: 120,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#00bcd4',

    },
    rejectButton:{
        color: '#78909c',
        fontSize: 14,
        fontWeight: '400',
        marginRight: 40
    },
    repeatedDaysFooter: {
        backgroundColor: '#e0f7fa',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 25,
        paddingTop: 12,
        paddingBottom: 12
    },
    repeatedDaysList: {
        flexDirection: 'row'
    },
    showEventsButton: {
        color: '#00bcd4'
    },
    blackText: {
        color: '#000000'
    },
    repeatedEventList: {
        borderTopColor: '#eceff1',
        borderTopWidth: 1,
    },
    repeatedEventItem: {
        paddingTop: 24,
        paddingBottom: 24,
        marginLeft: 80,
    },
    dateString: {
        flexDirection: 'row',
        marginTop: 4,
        marginBottom: 4
    }
});

export default styles
