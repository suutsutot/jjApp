import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    stepIndicator: {
        marginVertical: 50,
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    description: {
        backgroundColor: '#e0f7fa',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    style_row_view: {
        flex: 1,
        flexDirection: 'row',
        height: 57,
        backgroundColor: '#FFFFFF',
    },
    style_text: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: '#333333',
        alignSelf: 'center',
    },
    containerProcess: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles
