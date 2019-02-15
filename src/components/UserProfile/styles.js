import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    mainContent: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 20
    },
    nameBlock: {
        fontSize: 20,
        lineHeight: 25
    },
    textBlock: {
        fontSize: 16,
        lineHeight: 25,
        color: '#707271'
    },
    blackTextBlock: {
        fontSize: 16,
        lineHeight: 25,
    }
});

export default styles;
