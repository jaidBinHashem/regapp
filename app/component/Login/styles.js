import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 20
    },
    smsIcon: {
        width: 110,
        height: 70,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 30,
        marginTop: 90
    },
    smsText: {
        color: "#25cc30",
        fontSize: 20,
        textAlign: 'center',
        height: 28,
    },
    smsDescription: {
        textAlign: 'center',
        fontSize: 15,
        lineHeight: 23,
        color: "#9e9e9e",
        paddingVertical: 10,
        marginBottom: 50,
    },
    mobileNumberTitle: {
        color: '#000000',
        fontSize: 16,
        paddingBottom: 8,
    },
    mobileNumberTextInputContainer: {
        borderColor: 'lightgray',
        justifyContent: "center",
        borderWidth: 2,
        borderRadius: 3,
    },
    mobileNumberTextInput: {
        fontSize: 15,
        paddingLeft: 15
    },
    submitText: {
        color: 'white',
        fontSize: 20,
    },
    resendSmsText: {
        color: "#19b023",
        fontSize: 20,
        textAlign: 'center',
        textDecorationLine: 'underline',
        marginTop: 30
    },
    submitContainer: {
        height: 70,
        marginBottom: 16,
        marginTop: 51,
        borderRadius: 2,
        backgroundColor: '#19B023',
        justifyContent: 'center',
        alignItems: 'center'
    }

})