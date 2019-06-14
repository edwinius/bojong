import React from 'react';
import {
    Text,
    View,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Image,
    Dimensions
} from 'react-native';

import Carousel from 'react-native-banner-carousel';

const dimensions = Dimensions.get('window');
const dWidth = dimensions.width;
const bannerHeight = dWidth * 0.67;

export default class NewsHome extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            berita: [],
            isLoading: true,
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
                    table: 'berita-app-home',
                    data: ''
				})
			}).then((response) => response.json())
			.then((responseJson) => {
                console.log(responseJson);
                
                if(responseJson['status'] == '200') {
					if(this.mounted) {
						this.setState({
							isLoading: false,
                            berita: responseJson['data']['berita']
						});
					}
				}
			}).catch((error) => {
				console.error(error);
			});
			
		} catch(error) {
			console.log(error);
		}
    }

    componentDidMount() {
		this.mounted = true;
		this.getToken();
    }

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

        if(this.state.berita.length > 0) {
            const btn = this.state.berita.map(function (item, index) {
                return (
                    <TouchableOpacity
                        key={index}
                        style={{
                            flexDirection: 'row',
                            marginTop: 20,
                            justifyContent: "center",
                            height: 80
                        }}
                        onPress={() => navigation.navigate('NewsDetail', 
                        {
                            beritaPid: item.berita_pid
                        })}
                    >
                        <View
                            style={{
                                marginRight: 7
                            }}>
                            <Image
                                style={{ width: 130, height: 80 }}
                                source={{ uri: `${global.s3}berita/${item.berita_pid}/${item.berita_img}`}}
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
                                { item.berita_title }
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            });

            return (btn);
        } else {
            return(<Text>NoData</Text>);
        }
    }

    _ShowCarousel() {
        let navigation = this.props.navigation;
        
        if(this.state.berita.length > 0) {
            const contentBanner = this.state.berita.map(function (item, index) {
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => navigation.navigate('NewsDetail', 
                        {
                            beritaPid: item.berita_pid
                        })}
                    >
                        <View>
                            <Image
                                style={{ 
                                    width: dWidth, 
                                    height: '100%' 
                                }}
                                source={{ uri: `${global.s3}berita/${item.berita_pid}/${item.berita_img}`}}
                                resizeMode='contain'
                            />
                        </View>
                    </TouchableOpacity>
                );
            });

            return(contentBanner);
        } else {
            return(<Text>NoData</Text>);
        }
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
                    <View
                        style={{
                            flexDirection: 'column',
                            height: 200
                        }}
                    >
                        <View
                            style={{
                                paddingVertical: 16,
                                paddingHorizontal: 25,
                                backgroundColor: 'rgb(52,73,100)',
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 17,
                                    color: 'white'
                                }}
                            >Berita HOT</Text>
                        </View>

                        <View style={{
                            marginTop: 0,
                        }}>
                            <Carousel
                                autoplay
                                autoplayTimeout={4000}
                                loop
                                index={0}
                                pageSize={dWidth}
                            >
                                {this._ShowCarousel()}
                            </Carousel>
                        </View>
                    </View>

                    <View
                        style={{
                            marginHorizontal: 25,
                            marginTop: 85,
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
            </SafeAreaView>
        )
    }
}