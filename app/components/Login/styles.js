// - Import react components
import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        backgroundColor: '#fff',
        margin: 20,
        borderRadius: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2
    },
    auth_content: {
        paddingHorizontal: 30
    },
    buttonText: {
        color: '#fff'
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
    createAccountText: {
        color: '#9da3a9',
        fontWeight: '400'
    },
    createAccountButton: {
        marginTop: 8
    },
});

export default styles