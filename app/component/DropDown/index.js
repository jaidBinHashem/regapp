import React, { Component } from 'react';
import { View, StatusBar, TouchableHighlight, Text } from 'react-native';
import ModalDropdown from "react-native-modal-dropdown";
import { Icon } from 'react-native-elements';

import styles from './styles';

class DropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: null
        }

    }


    renderDropDownRow(rowData) {
        return (
            <TouchableHighlight underlayColor="cornflowerblue">
                <View style={{ padding: 8 }}>
                    <Text style={{ color: "gray" }}>
                        {rowData['name']}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }

    render() {
        return (
            <View style={{
                padding: 10
            }}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: 'lightgray',
                    marginBottom: 10,
                    height: 56
                }}>
                    <ModalDropdown
                        options={this.props.options}
                        renderRow={this.renderDropDownRow.bind(this)}
                        dropdownStyle={{ minWidth: 150, maxHeight: 140, maxWidth: 150 }}
                        onSelect = {(index, value) => this.props.selectObject(value)}
                    >
                        <View style={styles.childView}>
                            <View style={styles.SelectedTextView}>
                                <Text style={styles.selectedText}>{this.props.selectedObject.name}</Text>
                            </View>
                            <View style={styles.IconView}>
                                <Icon
                                    name="angle-down"
                                    type="font-awesome"
                                    color="lightgray"
                                    size={35}
                                    style={{ marginBottom: 0 }} />
                            </View>
                        </View>
                    </ModalDropdown>
                </View>
            </View>
        )
    }
}


export default DropDown;