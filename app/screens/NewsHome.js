import React from 'react';
import {
    Text,
    View,
    Platform,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';

import Carousel from 'react-native-banner-carousel';

const dimensions = Dimensions.get('window');
const dWidth = dimensions.width;
const bannerHeight = dWidth * 0.67;

export default class NewsHome extends React.Component {

    _BeritaBojong() {
        const navigation = this.props.navigation;

        const buttons = [
            {
                btnName: '11 Curhatan Seputar Dunia Per-Ojolan, dari Kisah Baper Hingga Bikin Mewek',
                btnPage: 'NewsDetail',
                btnImage: require('../../assets/kolom_berita/berita_ojol.jpeg')
            },
            {
                btnName: 'Kedapatan Beli Sabu Caleg Gerindra Ditangkap Polisi',
                btnPage: 'NewsDetail',
                btnImage: require('../../assets/kolom_berita/berita_caleg.jpg')
            },
            {
                btnName: 'Berkas Kasus Vanessa Angel P21, Kejari Surabaya Kantongi BUkti Uang Rp. 35 Juta',
                btnPage: 'NewsDetail',
                btnImage: require('../../assets/kolom_berita/berita_vanessa.jpeg')
            },
            {
                btnName: 'Liburan ke Jepang Lagi, Begini Pose Kocak Ringgo Sekeluarga',
                btnPage: 'NewsDetail',
                btnImage: require('../../assets/kolom_berita/berita_ringo.jpg')
            },
            {
                btnName: 'Roy Marten soal Gading Liburan Bareng Gisel-Gempi: Saya Kira Itu Bagus',
                btnPage: 'NewsDetail',
                btnImage: require('../../assets/kolom_berita/berita_roy.jpg')
            },
            {
                btnName: 'Ayu Ting Ting Didoakan Berjodoh Lagi Dengan Shaheer Seikh, Komentar Ivan Gunawan Jadi Sorotan',
                btnPage: 'NewsDetail',
                btnImage: require('../../assets/kolom_berita/berita_ayu.png')
            },
            {
                btnName: 'Janji Anti Selingkuh Angga Wijaya untuk Dewi Perssik Jadi Sorotan, Suami Takut Istri',
                btnPage: 'NewsDetail',
                btnImage: require('../../assets/kolom_berita/berita_dewi.jpg')
            }
        ];

        const btn = buttons.map(function (item, index) {
            return (
                <TouchableOpacity
                    key={index}
                    style={{
                        flexDirection: 'row',
                        marginTop: 20,
                        justifyContent: "center",
                        height: 80
                    }}
                    onPress={() => navigation.navigate(`${item.btnPage}`)}
                >
                    <View
                        style={{
                            marginRight: 7
                        }}>
                        <Image
                            style={{ width: 130, height: 80 }}
                            source={item.btnImage}
                        />
                    </View>

                    <View
                        style={{
                            padding: 5,
                            width: 170,
                            shadowColor: 'grey',
                            shadowOffset: { width: 1.5, height: 1.5 },
                            shadowRadius: 2,
                            shadowOpacity: 0.35,
                            elevation: 3,
                            backgroundColor: 'white'
                        }}>
                        <Text
                            style={{
                                fontSize: 13,
                                color: "#444444"
                            }}
                        >
                            {item.btnName}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        });

        return (btn);
    }

    render() {
        const navigation = this.props.navigation
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
            <View
                style={{
                    flex: 1
                }}
            >
                <SafeAreaView
                    style={{
                        ...Platform.select({
                            android: {
                                backgroundColor: 'black',
                                height: 24,
                            }
                        })
                    }}
                >
                </SafeAreaView>
                <View
                    style={{
                        flexDirection: 'column',
                        height: 185
                    }}
                >
                    <View
                        style={{
                            marginHorizontal: 25,
                            marginVertical: 16
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: 17
                            }}
                        >Berita HOT</Text>
                    </View>
                    <View style={{
                        marginTop: -40,
                    }}>
                        <Carousel
                            autoplay
                            autoplayTimeout={4000}
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
                        marginHorizontal: 25,
                        marginTop: 55
                    }}
                >
                    <Text
                        style={{
                            fontWeight: "bold",
                            fontSize: 17
                        }}
                    >Berita Harian</Text>
                </View>
                <ScrollView>
                    <View
                        style={{
                            marginBottom: 15
                        }}
                    >
                        {this._BeritaBojong()}
                    </View>
                </ScrollView>
            </View>
        )
    }
}