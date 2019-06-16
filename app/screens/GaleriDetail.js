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


export default class GaleriDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            galeriDetail: [],
            galeriFoto: [],
            isLoading: true,
            search: "",
        }
    }

    async getToken() {
        try {
            const navigation = this.props.navigation;
            let pid = navigation.state.params.pid;

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
                        table: 'detail_galeri_album',
                        data: {
                            pid: pid
                        }
                    })
                }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);

                    if (responseJson['status'] == '200') {
                        if (this.mounted) {
                            this.setState({
                                isLoading: false,
                                galeriDetail: responseJson['data']['detail'],
                                galeriFoto: responseJson['data']['foto']
                            });
                        }
                        console.log(this.state);
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

    componentWillUnmount() {
        this.mounted = false;
    }

    _GaleriFoto() {
        const navigation = this.props.navigation;

        const btn = this.state.galeriFoto.map
            (function (item, index) {
                return (
                    <View
                        key={index}
                        style={{
                            width: 150,
                            height: 110,
                            marginHorizontal: 10
                        }}
                        onPress={() => navigation.navigate('GaleriDetail')}
                    >
                        <View>
                            <Image
                                style={{
                                    width: 150,
                                    height: 100,
                                }}
                                source={{ uri: `${global.s3}galeri/${item.galeri_album_pid}/${item.galeri_img}` }}
                            />
                        </View>
                    </View>
                )
            });

        return (btn);
    }

    render() {
        if (this.state.isLoading) {
            return (<LoadingScreen />);
        }

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
                        title="Album"
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
                                    paddingHorizontal: 15
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: 11,
                                        color: "#444444",
                                        textAlign: "center",
                                        paddingTop: 15,
                                        paddingBottom: 10,
                                        fontSize: 18ga,
                                        fontWeight: "bold"
                                    }}
                                >
                                    {this.state.galeriDetail[0].galeri_album_name}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 11,
                                        color: "#444444",
                                        textAlign: "center",
                                        fontSize: 14,
                                        fontWeight: "bold"
                                    }}
                                >
                                    {this.state.galeriDetail[0].galeri_album_date}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 11,
                                        color: "#444444",
                                        textAlign: "center",
                                        paddingBottom: 10,
                                        fontSize: 12,
                                    }}
                                >
                                    {this.state.galeriDetail[0].galeri_album_desc}
                                </Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: "row",
                                    flexWrap: "wrap",
                                    padding: 10
                                }}
                            >
                                {this._GaleriFoto()}
                            </View>
                        </View>

                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}