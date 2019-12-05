import React, { Fragment, useEffect } from "react";
import { StatusBar, Text, View, ScrollView } from 'react-native';
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
                                <Text style={{ color: "#000000", fontSize: 17 }}>{user && user.name}</Text>
                                {user && <Text style={{ flex: 1, fontSize: 15, color: "#9e9e9e", marginTop: 6 }}>{user.union_name}, {user.upazila_name}, {user.district_name}</Text>}
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
                                }}>{userRanking && userRanking}</Text>
                            </View>
                        </View>
                        <RectangleView
                            title="Add Farmer"
                            pageName="AddFarmer"
                            {...props}
                        />
                        <RectangleView
                            title="Registration History"
                            pageName="FarmersList"
                            {...props}
                        />
                    </View>
                </ScrollView>
            </View>
        </Fragment>
    );
}

Dashboard.navigationOptions = {
    headerStyle: {
        height: 0
    },
}

export default Dashboard;