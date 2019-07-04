 import React from 'react';
import {
    AsyncStorage,
    Dimensions,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Carousel from 'react-native-banner-carousel';

import LoadingScreen from './common/LoadingScreen';

const dimensions = Dimensions.get('window');
const dWidth = dimensions.width;
const bannerHeight = dWidth * 0.67;

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            imageOpacity: 0,
            contentSize: 0,
            berita: [],
            isLoading: true,
            latitude: null,
            longitude: null,
        }
    }

    async getToken() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, (error) => this.setState({ latitude: error.message }),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        
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
                        table: 'berita-app-home',
                        data: ''
                    })
                }).then((response) => response.json())
                .then((responseJson) => {
                    console.log(responseJson);

                    if (responseJson['status'] == '200') {
                        if (this.mounted) {
                            this.setState({
                                isLoading: false,
                                berita: responseJson['data']['berita']
                            });
                        }
                    }

                    console.log(this.state);
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

    _ShowHomePariwisata() {
        const navigation = this.props.navigation;

        const arr_img = [
            {
                'title': 'Air Terjun',
                'img': require('../../assets/images/pariwisata_air_terjun.jpg')
            },
            {
                'title': 'Jembatan Cisaat',
                'img': require('../../assets/images/pariwisata_jembatan.jpg')
            },
        ]

        const img = arr_img.map(function (v, i) {
            return (
                <TouchableOpacity
                    key={i}
                    style={{
                        marginHorizontal: 10
                    }}
                    onPress={() => {
                        navigation.navigate('TempatDetail',
                            {
                                title: v.title,
                                img: v.img
                            }
                        )
                    }}
                >
                    <View
                        style={{
                            backgroundColor: 'white'
                        }}
                    >
                        <Image
                            source={v.img}
                            style={{
                                width: dWidth * 0.65,
                                height: dWidth * 0.65 * 0.6,
                            }}
                            resizeMode='cover'
                        />
                    </View>

                    <View
                        style={{
                            paddingVertical: 5,
                        }}
                    >
                        <Text

                        >
                            {v.title}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        });

        return (img);
    }

    _ShowMenuStatis() {
        const navigation = this.props.navigation;

        const arrMenuStatis = [
            {
                menuName: 'Penduduk',
                menuImg: require('../../assets/icons/icon_umum.png'),
                menuScreen: 'HomeDataPenduduk'
            },
            {
                menuName: 'Kesehatan',
                menuImg: require('../../assets/icons/icon_kesehatan.png'),
                menuScreen: 'HomeTempatKesehatan'
            },
            {
                menuName: 'Pendidikan',
                menuImg: require('../../assets/icons/icon_pendidikan.png'),
                menuScreen: 'HomeTempatPendidikan'
            },
            {
                menuName: 'Pariwisata',
                menuImg: require('../../assets/icons/icon_pariwisata.png'),
                menuScreen: 'HomeTempatPariwisata'
            },
            {
                menuName: 'Tempat Ibadah',
                menuImg: require('../../assets/icons/icon_ibadah.png'),
                menuScreen: 'HomeTempatIbadah'
            },
            {
                menuName: 'Pembangunan',
                menuImg: require('../../assets/icons/icon_pembangunan.png'),
                menuScreen: 'HomeTempatIbadah'
            }
        ];

        const contentMenuStatis = arrMenuStatis.map(function (statis, index) {
            return (
                <TouchableOpacity
                    key={index}
                    style={styles.btnMenu}
                    onPress={() => navigation.navigate(`${statis.menuScreen}`)}
                >
                    <View style={styles.containerIconMenu}>
                        <Image
                            style={styles.iconMenu}
                            source={statis.menuImg}
                            resizeMode='contain'
                        />
                    </View>
                    <View style={styles.containerTxtMenu}>
                        <Text style={styles.txtMenu}>
                            {statis.menuName}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        });

        return contentMenuStatis;
    }

    onScroll(event) {
        const scrollY = event.nativeEvent.contentOffset.y;
        let layoutHeight = event.nativeEvent.layoutMeasurement.height;
        let contentSize = event.nativeEvent.contentSize.height;

        let stateContentSize = this.state.contentSize;

        // Change top search opacity
        if (scrollY >= 0) {
            let newOpacity = (scrollY / 250.0);
            if (newOpacity < 0) newOpacity = 0;
            this.setState({
                imageOpacity: newOpacity,
            });
        } else {
            this.setState({
                imageOpacity: 0
            });
        }
    }

    _ShowBerita() {
        let navigation = this.props.navigation;

        if (this.state.berita.length > 0) {
            const contentBanner = this.state.berita.map(function (item, index) {
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate('NewsDetail',
                            {
                                beritaPid: item.berita_pid
                            })}
                    >
                        <View
                        >
                            <Image
                                //style={{ width: dWidth, height: bannerHeight }}
                                style={{
                                    width: dWidth,
                                    height: '100%',
                                }}
                                source={{ uri: `${global.s3}berita/${item.berita_pid}/${item.berita_img}` }}
                            //source={item.berita_img}
                            />

                            <View
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                    position: 'absolute',
                                    zIndex: 2,
                                    bottom: 0,
                                    alignItems: 'center',
                                    width: '100%',
                                    paddingTop: 5,
                                    paddingBottom: 15,
                                }}
                            >
                                <Text>
                                    { item.berita_title }
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                );
            });

            return (contentBanner);
        } else {
            return (
                <Text>NoData</Text>
            );
        }
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
                        flex: 1
                    }}
                >
                    <View
                        style={{
                            paddingHorizontal: 25,
                            backgroundColor: 'rgb(52,73,100)',
                            width: '100%',
                            flexDirection: "row",
                            alignItems: "center"
                        }}
                    >
                        <View
                            style={{
                                flex: 1,
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 17,
                                    color: "white"
                                }}
                            >My Boget Apps</Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('Elapor')}
                            style={{
                                paddingHorizontal: 12,
                                alignItems: 'center',
                                paddingVertical: 11,
                            }}
                        >
                            <Image
                                source={require('../../assets/icons/lapor_white.png')}
                                style={{
                                    width: 24,
                                    height: 21,
                                }}
                            />
                        </TouchableOpacity>
                    </View>

                    <ScrollView
                        onScroll={this.onScroll.bind(this)}
                        scrollEventThrottle={16}
                        style={{
                            backgroundColor: 'white',
                            width: '100%'
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: 'white',
                                height: 200,
                                width: '100%',
                            }}
                        >
                            <View style={{
                                marginTop: 0,
                                height: '100%',
                            }}>
                                <Carousel
                                    autoplay
                                    autoplayTimeout={4500}
                                    loop
                                    index={0}
                                    pageSize={dWidth}
                                >
                                    {this._ShowBerita()}
                                </Carousel>
                            </View>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                paddingBottom: 20,
                                marginTop: 30,
                            }}
                        >
                            { this._ShowMenuStatis() }
                        </View>

                        {/*
                        <View
                            style={{
                                borderWidth: 0.3,
                                marginTop: 50,
                                marginHorizontal: 40,
                                paddingVertical: 10,
                                shadowColor: 'grey',
                                shadowOffset: { width: 1.5, height: 1.5 },
                                shadowRadius: 2,
                                shadowOpacity: 0.35,
                                elevation: 3,
                                backgroundColor: 'white',
                                borderRadius: 20,
                                flex: 1,
                            }}
                        >
                            {this._ShowMenuStatis()}
                        </View>

                        <View
                            style={{
                                alignItems: 'center',
                                marginTop: 15,
                                marginBottom: 15,
                            }}
                        >
                            <TouchableOpacity
                                style={{
                                    alignItems: "center",
                                    borderWidth: 0.1,
                                    borderRadius: 9,
                                    shadowColor: 'grey',
                                    shadowOffset: { width: 1, height: 1 },
                                    shadowRadius: 1,
                                    shadowOpacity: 0.35,
                                    elevation: 1,
                                    padding: 15
                                }}
                                onPress={() => navigation.navigate('TentangKami')}
                            >
                                <Image
                                    style={{
                                        width: 80,
                                        height: 80,
                                    }}
                                    source={require('../../assets/icon_trans.png')}
                                />
                                <Text
                                    style={{
                                        fontSize: 12
                                    }}
                                >Tentang Kami</Text>
                            </TouchableOpacity>
                        </View>
                        */}

                        <View
                            style={{
                                alignItems: 'center',
                                marginTop: 15,
                                marginBottom: 45,
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => navigation.navigate('LayananPage')}
                            >
                                <Image
                                    style={{
                                        width: 180,
                                        height: 180
                                    }}
                                    source={require('../../assets/tombol.png')}
                                />
                            </TouchableOpacity>
                        </View>

                        {/*<View
                            style={{
                                marginBottom: 50,
                                backgroundColor: '#f2f2f2'
                            }}
                        >
                            <View
                                style={{
                                    paddingVertical: 10,
                                    paddingHorizontal: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#333333',
                                        fontWeight: 'bold',
                                        fontSize: 18,
                                    }}
                                >
                                    Pariwisata
                                </Text>
                            </View>

                            <ScrollView
                                horizontal={true}
                                style={{
                                    flexDirection: 'row',
                                    paddingVertical: 10,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row'
                                    }}
                                >
                                    {this._ShowHomePariwisata()}
                                </View>
                            </ScrollView>
                        </View>*/}
                    </ScrollView>
                </View>
            </SafeAreaView >
        );
    }
}


const styles = StyleSheet.create({
    containerTxtMenuHeader: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginTop: 15
    },
    txtMenuHeader: {
        color: '#404040',
        fontWeight: 'bold',
        fontSize: 23,
    },
    containerMenu: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    btnMenu: {
        shadowColor: 'grey',
        shadowOffset: { width: 1.5, height: 1.5 },
        shadowRadius: 2,
        shadowOpacity: 0.35,
        elevation: 3,
        width: dWidth * 0.3,
        height: dWidth * 0.3,
        backgroundColor: 'white',
        margin: 3,
        borderRadius: 10,
    },
    containerIconMenu: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconMenu: {
        width: '40%'
    },
    containerTxtMenu: {
        textAlign: 'center',
        backgroundColor: 'white',
        paddingVertical: 8,
    },
    txtMenu: {
        textAlign: 'center'
    },

    // Carousel
    containerCarousel: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        elevation: 10,
        shadowColor: 'grey',
        shadowOffset: { width: 1.5, height: 2 },
        shadowRadius: 2,
        shadowOpacity: 0.85,
    },
});