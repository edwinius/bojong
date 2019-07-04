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
    TextInput,
    Dimensions,
} from 'react-native';

import LoadingScreen from './common/LoadingScreen';

import BackBtn from './common/BackBtn';

const dimensions = Dimensions.get('window');
const dWidth = dimensions.width;


export default class Galeri extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            galeriRow: [],
            galeriColumn: [],
            isLoading: true,
            search: "",
        }
    }

    async getToken() {
        try {
            const navigation = this.props.navigation;

            // Fetch home data
            fetch(`${global.api}fetch_data`,
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        appToken: global.appToken,
                        table: 'app-galeri-home',
                        data: ''
                    })
                }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);

                    if (responseJson['status'] == '200') {
                        if (this.mounted) {
                            this.setState({
                                isLoading: false,
                                galeriRow: responseJson['data']['galeriRow'],
                                galeriColumn: responseJson['data']['galeriColumn']
                            });
                        }
                    }
                }).catch((error) => {
                    console.error(error);
                });

        } catch (error) {
            console.log(error);
        }
    }

    componentDidMount() {
        this.mounted = true;
        this.getToken();
    }

    _HorizontalScroll() {
        const navigation = this.props.navigation;

        const btn = this.state.galeriRow.map
            (function (item, index) {
                return (
                    <TouchableOpacity
                        key={index}
                        style={{
                            width: 190,
                            height: 160
                        }}
                        onPress={() => navigation.navigate('GaleriDetail',
                            {
                                pid: item.galeri_album_pid
                            }
                        )}
                    >
                        <View
                            style={{
                                marginHorizontal: 5,
                                paddingHorizontal: 10,
                                paddingTop: 8
                            }}
                        >
                            <Image
                                style={{ width: 150, height: 100 }}
                                source={{ uri: `${global.s3}galeri/${item.galeri_album_pid}/${item.galeri_img}` }}
                            />
                        </View>
                        <View
                            style={{
                                marginTop: 15,
                                marginHorizontal: 10,
                                alignItems: "center",
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 11,
                                    color: "#444444",
                                    textAlign: "center"
                                }}
                            >
                                {item.galeri_album_name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            });

        return (btn);
    }

    _VerticalScroll() {
        const navigation = this.props.navigation;

        const btn = this.state.galeriColumn.map
            (function (item, index) {
                return (
                    <TouchableOpacity
                        key={index}
                        style={{
                            width: dWidth * 0.5,
                            height: 150
                        }}
                        onPress={() => navigation.navigate('GaleriDetail',
                            {
                                pid: item.galeri_album_pid
                            }
                        )}
                    >
                        <View
                            style={{
                                paddingHorizontal: 10
                            }}
                        >
                            <Image
                                style={{ width: "100%", height: 100 }}
                                source={{ uri: `${global.s3}galeri/${item.galeri_album_pid}/${item.galeri_img}` }}
                            />
                        </View>
                        <View
                            style={{
                                marginTop: 10,
                                marginHorizontal: 10,
                                alignItems: "center",
                                paddingHorizontal: 10
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 13,
                                    color: "#444444",
                                    textAlign: "center"
                                }}
                            >
                                {item.galeri_album_name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            });

        return (btn);
    }

    render() {
        const navigation = this.props.navigation;
        const { search } = this.state;

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
                                    paddingTop: 20,
                                    paddingBottom: 15,
                                    paddingHorizontal: 30
                                }}
                            >
                                <TextInput
                                    value={search}
                                    onChangeText={search => this.setState({ search })}
                                    placeholder="Cari Album..."
                                    style={{
                                        flex: 1,
                                        padding: 6,
                                        borderRadius: 19,
                                        borderColor: "#333333",
                                        borderWidth: 0.7,
                                    }}
                                >

                                </TextInput>
                            </View>
                            <View
                                style={{
                                    paddingLeft: 10,
                                    marginVertical: 14
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: "bold"
                                    }}
                                >Album Terbaru Bulan Ini:</Text>
                            </View>
                            <ScrollView
                                style={{
                                    height: 160,

                                }}
                                horizontal={true}
                            >
                                {this._HorizontalScroll()}

                            </ScrollView>

                            <View
                                style={{
                                    paddingLeft: 10,
                                    marginBottom: 14,
                                    marginTop: 5
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: "bold"
                                    }}
                                >Album MyBoget:</Text>
                            </View>

                            <View
                                style={{
                                    flexDirection: "row"
                                }}
                            >
                                {this._VerticalScroll()}
                            </View>
                        </View>

                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}