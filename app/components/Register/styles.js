import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#fff',
    },
    auth_content: {
        paddingHorizontal: 30
    },
    logo: {
        alignSelf: 'center',
        borderRadius: 100,
        height: 80,
        paddingVertical: 20,
        marginTop: 20,
        width: 80
    },
    logo_title: {
        color: '#00bcd4',
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 10,
        alignSelf: 'center',
        fontSize: 30
    },
    buttons: {
        marginBottom: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',

    },
});

export default styles
