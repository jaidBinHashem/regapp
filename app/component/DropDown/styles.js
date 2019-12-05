import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    container: {
        flex: 1,
    },





    rootView: {
        flex: 5,
        paddingLeft: 8,
        justifyContent: "center"
    },
    dropdownStyle: {
        minWidth: 150,
        maxHeight: 140,
        maxWidth: 150
    },
    childView: {
        width: 300,
        flexDirection: "row"
    },
    SelectedTextView: {
        flex: 1,
        // width: 300
    },
    selectedText: {
        paddingTop: 4,
        color: 'gray'
        // width: 300
    },
    IconView: {
        alignSelf: "flex-end",
    },
    renderView: {
        padding: 8
    },
    renderText: {
        color: "mediumaquamarine"
    }











});
