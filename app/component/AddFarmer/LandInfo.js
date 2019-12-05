import React, { Component } from 'react';
import { View, StatusBar, TouchableHighlight, TextInput } from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { Icon } from 'react-native-elements';
import BusyIndicator from 'react-native-busy-indicator';
import DropDown from '../DropDown';
import { getService } from '../../network';

import styles from './styles';

const LAND_SIZES = [
    {
        id: '1.5_to_2.49_acre',
        name: '1.5 to 2.49 Acre'
    },
    {
        id: '2.5_to_7.49_acre',
        name: '2.5 to 7.49 Acre'
    },
    {
        id: '50_to_149_decimal',
        name: '50 to 149 Decimal'
    },
    {
        id: 'more_than_7.5_acre',
        name: 'More than 7.5 Acre'
    },
    {
        id: 'upto_49_decimal',
        name: 'Upto 49 Decimal'
    },
]

class LandInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            crops: [],
            selectedCrops: [],
            selectedLandSize: {
                id: '1.5_to_2.49_acre',
                name: '1.5 to 2.49 Acre'
            },
        }

    }

    async componentDidMount() {
        let request = {
            endPoint: '/get/all/crop/info',
            showLoader: true
        };
        let response = await getService(request);
        response.success && this.setState({ crops: response.data.data.data.crops })
    }

    selectLandSize = (landSize) => {
        this.setState({
            selectedLandSize: {
                id: landSize.id,
                name: landSize.name
            }
        });
        this.props.setLandSize(landSize);
    }



    render() {
        return (
            <View style={{ backgroundColor: '#fff', marginBottom: 20, padding: 20, elevation: 5 }}>
                {this.state.crops.length > 0 && (
                    <MultiSelect
                        hideSubmitButton={true}
                        autoFocusInput={false}
                        single={false}
                        items={this.state.crops}
                        uniqueKey="value"
                        onSelectedItemsChange={(selectedCrops) => {
                            this.setState({ selectedCrops });
                            this.props.setMajorCrops(selectedCrops);
                        }}
                        selectedItems={this.state.selectedCrops}
                        selectText="Pick Items (At most 3)"
                        tagBorderColor="#19B023"
                        tagTextColor="#19B023"
                        selectedItemTextColor="#19B023"
                        selectedItemIconColor="#19B023"
                        displayKey="text"
                        searchInputStyle={{ color: '#CCC' }}
                        submitButtonColor="#19B023"
                        submitButtonText="OK"
                    />)}
                <DropDown
                    options={LAND_SIZES}
                    selectedObject={this.state.selectedLandSize}
                    selectObject={this.selectLandSize}
                />
            </View>
        )
    }
}


export default LandInfo;