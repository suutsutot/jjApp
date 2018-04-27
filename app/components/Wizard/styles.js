// - Import react components
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    stageOne: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    personal: {
        backgroundColor: '#e0f7fa',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    container1: {
        flex: 1,
        padding: 10,
        backgroundColor: '#FFFFFF'
    },

    content: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },

    datePickerBox:{
        marginTop: 9,
        borderColor: '#ABABAB',
        borderWidth: 0.5,
        padding: 0,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        height: 38,
        justifyContent:'center'
    },
    datePickerText: {
        fontSize: 14,
        marginLeft: 5,
        borderWidth: 0,
        color: '#121212',
    },
});

export default styles