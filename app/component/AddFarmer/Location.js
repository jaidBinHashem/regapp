import React, { Component } from 'react';
import { View, StatusBar, TouchableHighlight, Text } from 'react-native';
import ModalDropdown from "react-native-modal-dropdown";
import { Icon } from 'react-native-elements';
import BusyIndicator from 'react-native-busy-indicator';
import DropDown from '../DropDown';
import { getService } from '../../network';

import styles from './styles';

filterDataBy = (dataArr, filterBy, value) => dataArr.filter((obj) => obj[filterBy] == value);

class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: null,
            selectedDivision: {
                devisionId: null,
                name: "বিভাগ নির্বাচন করুন"
            },
            selectedDistrict: {
                districtId: null,
                name: "জেলা নির্বাচন করুন"
            },
            selectedUpazilla: {
                upazillaId: null,
                name: "উপজেলা নির্বাচন করুন"
            },
            selectedUnion: {
                unionId: null,
                name: "উপজেলা নির্বাচন করুন"
            },
            districtOptions: [],
            upazillaOptions: [],
            unionOptions: []
        }

    }

    async componentDidMount() {
        let request = {
            endPoint: '/get/locations',
            showLoader: true
        };
        let response = await getService(request);
        response.success && this.setState({ locations: response.data.data.data })
    }


    selectDivision = (division) => {
        this.setState({
            selectedDivision: {
                devisionId: division.id,
                name: division.name
            },
            selectedDistrict: {
                districtId: null,
                name: "জেলা নির্বাচন করুন"
            },
            selectedUpazilla: {
                upazillaId: null,
                name: "উপজেলা নির্বাচন করুন"
            },
            selectedUnion: {
                unionId: null,
                name: "উপজেলা নির্বাচন করুন"
            },
        });
        let districtOptions = [...this.state.districtOptions];
        districtOptions = filterDataBy(this.state.locations.districts, "division_id", division.id);
        this.setState({
            districtOptions
        })
    }

    selectDistrict = (district) => {
        this.setState({
            selectedDistrict: {
                districtId: district.id,
                name: district.name
            },
            selectedUpazilla: {
                upazillaId: null,
                name: "উপজেলা নির্বাচন করুন"
            },
            selectedUnion: {
                unionId: null,
                name: "উপজেলা নির্বাচন করুন"
            },
        });
        let upazillaOptions = [...this.state.upazillaOptions];
        upazillaOptions = filterDataBy(this.state.locations.upazilas, "district_id", district.id);
        this.setState({
            upazillaOptions
        })
    }

    selectUpazilla = (upazilla) => {
        this.setState({
            selectedUpazilla: {
                upazillaId: upazilla.id,
                name: upazilla.name
            },
            selectedUnion: {
                unionId: null,
                name: "উপজেলা নির্বাচন করুন"
            },
        });
        let unionOptions = [...this.state.unionOptions];
        unionOptions = filterDataBy(this.state.locations.unions, "upazila_id", upazilla.id);
        this.setState({
            unionOptions
        })
    }

    selectUnion = (union) => {
        this.setState({
            selectedUnion: {
                unionId: union.id,
                name: union.name
            }
        });
        this.props.setLocation(this.state.selectedDivision.devisionId, this.state.selectedDistrict.districtId, this.state.selectedUpazilla.upazillaId, union.id);
    }


    render() {
        // console.log(this.state)
        return (
            <View style={{
                backgroundColor: '#fff',
                marginBottom: 20,
                elevation: 5
            }}>
                {this.state.locations && (
                    <DropDown
                        options={this.state.locations.divisions}
                        selectedObject={this.state.selectedDivision}
                        selectObject={this.selectDivision}
                    />
                )}
                {this.state.districtOptions.length > 0 && (
                    <DropDown
                        options={this.state.districtOptions}
                        selectedObject={this.state.selectedDistrict}
                        selectObject={this.selectDistrict}
                    />
                )}
                {this.state.upazillaOptions.length > 0 && (
                    <DropDown
                        options={this.state.upazillaOptions}
                        selectedObject={this.state.selectedUpazilla}
                        selectObject={this.selectUpazilla}
                    />
                )}
                {this.state.unionOptions.length > 0 && (
                    <DropDown
                        options={this.state.unionOptions}
                        selectedObject={this.state.selectedUnion}
                        selectObject={this.selectUnion}
                    />
                )}
                {/* <BusyIndicator/> */}
            </View>
        )
    }
}


export default Location;