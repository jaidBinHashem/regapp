import React, { Fragment, useState, useEffect } from "react";
import { Dimensions, StatusBar, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import Accordion from 'react-native-collapsible/Accordion';
import moment from 'moment';

import { getService } from '../../network';
import styles from './styles';

const { width, height } = Dimensions.get('window');

const FarmersList = props => {
    const [farmers, setFarmers] = useState([]);
    const [activeSections, setSection] = useState([]);

    // component did mount
    useEffect(() => {
        const fetchFarmers = async () => {
            let request = {
                endPoint: '/api/v3/auth/farmer/referral',
                authenticate: true,
                showLoader: true,
            }
            let response = await getService(request);
            let farmers = response.data.data.referral.data;
            let farmersArrays = [];
            do {
                let tempArr = farmers;
                let key = farmers[0].created_at;
                farmersArrays.push(tempArr.filter(data => data.created_at == key));
                farmers = tempArr.filter(data => data.created_at != key);
            } while (farmers.length > 0);
            setFarmers(farmersArrays);
        };
        fetchFarmers();
    }, []);

    _renderHeader = (section, index, isActive) => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{section.name}</Text>
                <Icon name={isActive ? "chevron-thin-up" : "chevron-thin-down"} type="entypo" color="lightgray" />
            </View>
        );
    };

    _renderContent = section => {
        return (
            <View style={styles.content}>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={styles.lightGray}>মোবাইল নং: </Text>
                    <Text style={styles.lightGray}>{section.mobile_no}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={styles.lightGray}>তারিখ: </Text>
                    <Text style={styles.lightGray}>{moment(section.created_at).format("MMM Do, YYYY")}</Text>
                </View>
            </View>
        );
    };

    _updateSections = (activeSections, index) => {
        let state = [];
        state[index] = activeSections;
        setSection(state)
    };
    return (
        <Fragment>
            <StatusBar backgroundColor="#1da326" barStyle="light-content" translucent={false} />
            <ScrollView style={{ flex: 1 }}>
                {farmers.length > 0 && (
                    <Fragment>
                        {farmers.map((farmer, index) =>
                            (
                                <Fragment key={index}>
                                    <Text style={{ marginHorizontal: 20, marginTop: 10, fontSize: 20 }}>{moment(farmer[0].created_at).format("MMMM, YYYY")}</Text>
                                    <Accordion
                                        sections={farmer}
                                        activeSections={activeSections[index] ? activeSections[index] : []}
                                        renderHeader={_renderHeader}
                                        renderContent={_renderContent}
                                        onChange={(section) => _updateSections(section, index)}
                                        touchableComponent={TouchableOpacity}
                                        sectionContainerStyle={{ borderBottomColor: 'lightgray', borderBottomWidth: 1, padding: 10 }}
                                        containerStyle={{ backgroundColor: '#fff', margin: 20 }}
                                    />
                                </Fragment>
                            )
                        )}
                    </Fragment>
                )}
            </ScrollView>
        </Fragment>
    )
}

FarmersList.navigationOptions = {
    title: 'Farmers List',
    headerStyle: {
        backgroundColor: '#19B023'
    },
    headerTintColor: '#fff',
}

export default FarmersList;