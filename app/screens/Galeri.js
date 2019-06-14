import React from 'react';
import {
    Alert,
    AsyncStorage,
    Text,
    View,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';

import LoadingScreen from './common/LoadingScreen';

import BackBtn from './common/BackBtn';

export default class Galeri extends React.Component {

    _HorizontalScroll() {
        const navigation = this.props.navigation;

        const buttons = [
            "1", "2"
        ];
        const btn = buttons.map
            (function (item, index) {
                return (
                    <TouchableOpacity
                        key={index}
                        style={{
                            backgroundColor: "yellow",
                            width: 50,
                            height: 80
                        }}
                    >

                    </TouchableOpacity>
                )
            });

        return (btn);
    }

    render() {
        const navigation = this.props.navigation;

        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: 'rgb(52,73,100)',
                    ...Platform.select({
                        android: {
                            paddingTop: 30
                        }
                    })
                }}
            >
                <StatusBar barStyle="light-content" />

                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'white'
                    }}
                >
                    <BackBtn
                        title="Galeri"
                        navigation={navigation}
                        back={false}
                    />

                    <ScrollView
                    >
                        <View
                            style={{
                                flex: 1
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor: "red",
                                    height: 100,
                                    width: 50
                                }}
                            >

                            </View>
                            <ScrollView
                                style={{
                                    backgroundColor: "green",
                                    height: 140,

                                }}
                                horizontal={true}
                            >
                                <View
                                    style={{
                                        backgroundColor: "red",
                                        width: 250,
                                    }}
                                >
                                    {this._HorizontalScroll()}
                                </View>

                            </ScrollView>

                            <View
                                style={{
                                    flexDirection: "row"
                                }}
                            >
                                <View
                                    style={{
                                        flex: 0.25,
                                        backgroundColor: "blue",
                                        height: 180,
                                        width: 40
                                    }}
                                >

                                </View>
                                <View
                                    style={{
                                        flex: 0.25,
                                        backgroundColor: "yellow",
                                        height: 180,
                                        width: 40
                                    }}
                                >

                                </View>
                                <View
                                    style={{
                                        flex: 0.25,
                                        backgroundColor: "blue",
                                        height: 180,
                                        width: 40
                                    }}
                                >

                                </View>
                                <View
                                    style={{
                                        flex: 0.25,
                                        backgroundColor: "yellow",
                                        height: 180,
                                        width: 40
                                    }}
                                >

                                </View>
                            </View>
                        </View>

                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}