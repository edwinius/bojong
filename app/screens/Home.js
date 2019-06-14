import React from 'react';
import {
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

const dimensions = Dimensions.get('window');
const dWidth = dimensions.width;
const bannerHeight = dWidth * 0.67;

export default class Home extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            imageOpacity: 0,
            contentSize: 0,
        }
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

    render() {
        const navigation = this.props.navigation;
        const bannerImages2 = [
            {
                btnImage: require('../../assets/kolom_berita/berita_hot/hot_bcl.png'),
                btnPage: 'NewsDetail'
            },
            {
                btnImage: require('../../assets/kolom_berita/berita_hot/hot_agnez.png'),
                btnPage: 'NewsDetail'
            },
            {
                btnImage: require('../../assets/kolom_berita/berita_hot/hot_us.png'),
                btnPage: 'NewsDetail'
            },
            {
                btnImage: require('../../assets/kolom_berita/berita_hot/hot_rossa.png'),
                btnPage: 'NewsDetail'
            },
        ];

        const contentBanner = bannerImages2.map(function (item, index) {
            return (
                <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate(`${item.btnPage}`)}
                >
                    <View>
                        <Image
                            style={{ width: dWidth, height: bannerHeight }}
                            //source={{ uri: `${global.uri}assets/images/site/${item}.png`}}
                            source={item.btnImage}
                            resizeMode='contain'
                        />
                    </View>
                </TouchableOpacity>
            );
        });

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
                                height: 185,
                                width: '100%',
                            }}
                        >
                            <View
                                style={{
                                    paddingHorizontal: 25,
                                    paddingVertical: 16,
                                    backgroundColor: 'rgb(52,73,100)',
                                    width: '100%',
                                    flexDirection: "row",
                                    alignItems: "center"
                                }}
                            >
                                <Text
                                    style={{
                                        fontWeight: "bold",
                                        fontSize: 17,
                                        color: "white"
                                    }}
                                >My Boget Apps</Text>
                                <View>
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('Elapor')}
                                        style={{
                                            marginLeft: 170
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
                            </View>

                            <View
                                style={{
                                    marginTop: -30
                                }}>
                                <Carousel
                                    autoplay
                                    autoplayTimeout={4500}
                                    loop
                                    index={0}
                                    pageSize={dWidth}
                                >
                                    {contentBanner}
                                </Carousel>
                            </View>
                        </View>

                        <View
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                justifyContent: 'center',
                                paddingBottom: 20,
                                marginTop: 70
                            }}
                        >
                            {this._ShowMenuStatis()}
                        </View>

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

                        <View
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
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
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