import React, { Fragment, useState, useEffect, useRef } from "react";
import { TouchableOpacity, StatusBar, Image, Text, View, KeyboardAvoidingView, TextInput, ScrollView } from 'react-native';
import BusyIndicator from 'react-native-busy-indicator';
import { Icon } from 'react-native-elements';
import RectangleView from "./RectangleView";
import styles from './styles';
import { useSelector, useDispatch } from "react-redux";

const Dashboard = props => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.user.userState);
    const userRanking = useSelector(state => state.user.userRanking);




    useEffect(() => {
        dispatch({ type: 'user/getUserRankingAsync' });
    }, []);

    return (
        <Fragment>
            <StatusBar backgroundColor="#1da326" barStyle="light-content" translucent={false} />
            <View style={{ flex: 1 }}>
                <View style={{ height: 130, backgroundColor: "#19B023", flexDirection: "row", paddingTop: 45 }}                >
                    <Text style={{ color: "white", flex: 1, fontSize: 20, textAlign: 'center' }}>আমার একাউন্ট</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: -40 }}>
                    <View style={{ marginHorizontal: 15, marginBottom: 20 }}>
                        <View style={{ backgroundColor: "white", height: 90, elevation: 10, }}                        >
                            <View style={{ flex: 1, paddingLeft: 18, justifyContent: "center", paddingTop: 18 }}>
                                <Text style={{ color: "#000000", fontSize: 17 }}>{user.name}</Text>
                                <Text style={{ flex: 1, fontSize: 15, color: "#9e9e9e", marginTop: 6 }}>{user.union_name}, {user.upazila_name}, {user.district_name}</Text>
                            </View>
                        </View>


                        <View
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 25,
                                marginBottom: 28
                            }}
                        >
                            <View>
                                <Text style={{ color: "#9e9e9e", fontSize: 17 }}>
                                    আপনার ইউনিয়নে আপনার অবস্থান
                                </Text>
                                <View style={styles.pc}>
                                    <Text
                                        style={{ color: "#19B023", fontSize: 30, textAlign: "center" }}
                                    >
                                        {userRanking && userRanking.position} মোট{" "}
                                        {userRanking && userRanking.total_users}
                                    </Text>
                                    <Text
                                        style={{ color: "#9e9e9e", fontSize: 17, textAlign: "center" }}
                                    >
                                        জনের  মধ্যে
                                    </Text>
                                </View>
                            </View>
                            <Text
                                style={{
                                    marginBottom: 8,
                                    marginTop: 30,
                                    color: "#000000",
                                    fontSize: 19
                                }}
                            >
                                বর্তমান মাসের স্কোর
                            </Text>
                            <View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: 100,
                                    height: 100,
                                    borderRadius: 50,
                                    backgroundColor: "#19B023"
                                }}
                            >
                                <Text style={{
                                    fontSize: 30,
                                    color: "white",
                                    textAlign: "center"
                                }}>{userRanking && userRanking.current_month_score}</Text>
                            </View>
                        </View>
                        <RectangleView
                            title="Add Farmer"
                            {...props}
                        />
                        <RectangleView
                            title="Registration History"
                            {...props}
                        />
                    </View>
                </ScrollView>
            </View>
        </Fragment>
    );
}

export default Dashboard;