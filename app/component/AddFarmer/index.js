import React, { Component } from 'react'
import { View, StatusBar, TextInput, ScrollView, Text, TouchableOpacity } from 'react-native';
import BusyIndicator from 'react-native-busy-indicator';
import Toast from 'react-native-simple-toast';
import Location from './Location';
import LandInfo from './LandInfo';
import DropDown from '../DropDown';

import { postService } from '../../network';

import styles from './styles';

const mobileNoRegx = new RegExp("^01([3-9])\\d{8}$");

class AddFarmer extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: 'Add Farmer',
        headerStyle: {
            backgroundColor: '#19B023'
        },
        headerTintColor: '#fff',
    });

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            mobile: '',
            age: '',
            gender: { id: 1, name: 'Male' },
            devisionId: null,
            districtId: null,
            upazillaId: null,
            unionId: null,
            locationSet: false,
            majorCrops: [],
            landSize: {
                id: '1.5_to_2.49_acre',
                name: '1.5 to 2.49 Acre'
            },
            error: false,
            errorMessage: null
        }
    }

    setLocation = (devisionId, districtId, upazillaId, unionId) => this.setState({
        devisionId, districtId, upazillaId, unionId, locationSet: true
    });

    setMajorCrops = majorCrops => this.setState({ majorCrops });

    setLandSize = landSize => this.setState({ landSize });

    validateFarmer = () => {
        if ((this.state.name.length >= 1) && (mobileNoRegx.test(this.state.mobile)) && (this.state.age > 0) && this.state.locationSet && (this.state.majorCrops.length > 0 && this.state.majorCrops.length < 4) && (this.state.landSize != null)) {
            return true;
        } else {
            return false;
        }
    }

    addFarmer = async () => {
        if (this.validateFarmer()) {
            let request = {
                endPoint: '/api/v3/auth/farmer/register',
                showLoader: true,
                params: {
                    "mobile_no": this.state.mobile,
                    "name": this.state.name,
                    "gender": this.state.gender.name,
                    "devision_id": this.state.devisionId,
                    "district_id": this.state.districtId,
                    "upazila_id": this.state.upazillaId,
                    "union_id": this.state.unionId,
                    "major_crops": this.state.majorCrops
                },
                authenticate: true
            }
            let response = await postService(request);
            console.log(response, "here is the reponse");
            !response.success && this.setState({ error: true, errorMessage: response.data.errors[Object.keys(response.data.errors)[0]] });
            response.success && (Toast.show("Farmer added successfully"), this.props.navigation.goBack());
        } else {
            this.setState({ error: true, errorMessage: null });
        }
    }


    render() {
        return (
            <View style={[styles.container]}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{ margin: 20 }}>
                        <Text style={{ fontSize: 20, marginBottom: 10 }}>Farmer's Information</Text>
                        <View style={{ backgroundColor: '#fff', marginBottom: 20, padding: 20, elevation: 5 }}>
                            <TextInput
                                style={styles.textInputContainer}
                                placeholder='নাম'
                                placeholderTextColor="lightgray"
                                underlineColorAndroid="lightgray"
                                selectionColor="blue"
                                returnKeyType="next"
                                value={this.state.name}
                                onChangeText={name => this.setState({ name })}
                            />
                            <TextInput
                                style={styles.textInputContainer}
                                placeholder='মোবাইল নাম্বার'
                                placeholderTextColor="lightgray"
                                underlineColorAndroid="lightgray"
                                selectionColor="blue"
                                returnKeyType="next"
                                value={this.state.mobile}
                                keyboardType='numeric'
                                onChangeText={mobile => this.setState({ mobile })}
                            />
                            <TextInput
                                style={styles.textInputContainer}
                                placeholder='বয়স'
                                placeholderTextColor="lightgray"
                                underlineColorAndroid="lightgray"
                                selectionColor="blue"
                                returnKeyType="next"
                                keyboardType='numeric'
                                value={this.state.age}
                                onChangeText={age => this.setState({ age })}
                            />
                            <DropDown
                                options={[{ id: 1, name: 'Male' }, { id: 2, name: 'Female' }]}
                                selectedObject={this.state.gender}
                                selectObject={(gender) => this.setState({ gender })}
                            />
                        </View>
                        <Text style={{ fontSize: 20, marginBottom: 10 }}>Farmer's Location</Text>
                        <Location
                            setLocation={this.setLocation}
                        />
                        <Text style={{ fontSize: 20, marginBottom: 10 }}>Land Information</Text>
                        <LandInfo
                            setMajorCrops={this.setMajorCrops}
                            setLandSize={this.setLandSize}
                        />
                        {this.state.error && (<Text style={{ fontSize: 12, marginBottom: 10, color: 'red' }}>{this.state.errorMessage === null ? "***Please insert valid info for all the fields" : this.state.errorMessage}</Text>)}
                        <TouchableOpacity
                            onPress={() => this.addFarmer()}
                            style={{ backgroundColor: '#19B023', justifyContent: 'center', height: 60, elevation: 5 }}>
                            <Text style={{ textAlign: 'center', color: '#fff', fontSize: 20 }}>Add Farmer</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <BusyIndicator />
            </View>
        )
    }
}


export default AddFarmer;