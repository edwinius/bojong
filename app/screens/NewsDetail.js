import React from 'react';
import {
    Alert,
    Text,
    View,
    Platform,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput
} from 'react-native';
import Carousel from 'react-native-banner-carousel';

import HeaderBerita from './common/HeaderBerita';
import LoadingScreen from './common/LoadingScreen';

const dimensions = Dimensions.get('window');
const dWidth = dimensions.width;

export default class NewsDetail extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: [],
            foto: [],
            lapor: '',
        }
    }

    handleLapor = (text) => {
        this.setState({ lapor: text })
    }

    kirim = (lapor) => {
        Alert.alert('Komentar anda terikim.');
    }

    async getToken() {
		try {
            const navigation = this.props.navigation;
            let pid = navigation.state.params.beritaPid;

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
                    table: 'detail_berita',
                    data: {
                        'pid': pid
                    }
				})
			}).then((response) => response.json())
			.then((responseJson) => {
                console.log(responseJson);
                
                if(responseJson['status'] == '200') {
					if(this.mounted) {
						this.setState({
							isLoading: false,
                            data: responseJson['data']['berita'],
                            foto: responseJson['data']['foto']
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

    _ShowCarousel() {
        if(this.state.foto.length > 0) {
            const contentBanner = this.state.foto.map(function (item, index) {
                return (
                    <View
                        key={ index }
                    >
                        <Image
                            style={{ 
                                width: dWidth, 
                                height: 200
                            }}
                            source={{ uri: `${global.s3}berita/${item.berita_pid}/${item.berita_img}`}}
                            resizeMode='contain'
                        />
                    </View>
                );
            });

            return(contentBanner);
        } else {
            return(<Text>NoData</Text>);
        }
    }

    render() {
        if(this.state.isLoading) {
			return( <LoadingScreen /> );
        }

        const navigation = this.props.navigation;
        let berita = this.state.data[0];

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
                        backgroundColor: 'rgb(52,73,100)',
                    }}
                >
                    <HeaderBerita
                        title="MyBoget News"
                        navigation={navigation} 
                    />
                </View>

                <ScrollView
                >
                    <View
                        style={{
                            flexDirection: 'column',
                        }}
                    >
                        <View
                            style={{
                                marginHorizontal: 14,
                                marginTop: 16,
                                marginBottom: 6
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 21
                                }}
                            >
                                { berita.berita_title }
                            </Text>
                        </View>

                        <View
                            style={{
                                marginHorizontal: 14,
                                flexDirection: 'row',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 12
                                }}
                            >Bojonggenteng, Sukabumi</Text>

                            <Text
                                style={{
                                    marginLeft: 6,
                                    color: '#999999'
                                }}
                            >l</Text>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: "#888888",
                                    marginLeft: 6
                                }}
                            >Ayu</Text>
                        </View>

                        <View
                            style={{
                                marginHorizontal: 14,
                                flexDirection: 'row',
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: '#888888'
                                }}
                            >Diterbitkan :</Text>
                            <Text
                                style={{
                                    marginLeft: 6,
                                    fontSize: 12,
                                    color: '#888888'
                                }}
                            >Minggu, { berita.berita_date }</Text>
                        </View>
                    </View>

                    <View
                        style={{
                            marginVertical: 10
                        }}
                    >
                        <Carousel
                            autoplay
                            autoplayTimeout={4000}
                            loop
                            index={0}
                            pageSize={dWidth}
                        >
                            { this._ShowCarousel() }
                        </Carousel>

                        {/*<Image
                            style={{
                                width: '100%',
                                height: 190
                            }}
                            source={{ uri: `${global.s3}berita/${berita.berita_pid}/${berita.berita_img}`}}
                            //source={require('../../assets/kolom_berita/berita_ojol.jpeg')} 
                        />*/}
                    </View>

                    <View
                        style={{
                            marginLeft: 14,
                            marginTop: 10,
                            marginRight: 20,
                            marginBottom: 15
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 16,
                                lineHeight: 24,
                                color: '#333333'
                            }}
                        >
                            { "        " + berita.berita_text }
                        </Text>
                    </View>

                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1,
                            marginLeft: 14,
                            marginBottom: 20
                        }}
                    >
                        <View
                        >
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 18
                                }}
                            >Komentar</Text>
                        </View>
                        <View>
                            <TextInput
                                style={{
                                    borderColor: 'black',
                                    borderWidth: 0.5,
                                    marginTop: 15,
                                    width: 300,
                                    height: 80,
                                    paddingLeft: 5,
                                    paddingBottom: 45
                                }}
                                underlineColorAndroid="transparent"
                                placeholder="Komentar anda..."
                                placeholderTextColor="black"
                                autoCapitalize="none"
                                onChangeText={this.handleLapor} />
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#888888',
                                    borderWidth: 0.1,
                                    borderRadius: 15,
                                    padding: 3,
                                    marginTop: 10,
                                    width: 60,
                                    alignItems: 'center',
                                    shadowColor: 'grey',
                                    shadowOffset: { width: 1.5, height: 1.5 },
                                    shadowRadius: 2,
                                    shadowOpacity: 0.35,
                                    elevation: 3,
                                }}
                                onPress={
                                    () => this.Kirim(this.state.lapor)
                                }>
                                <Text style={{
                                    color: 'white',
                                    fontSize: 12
                                }}>Kirim</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View
                        style={{
                            backgroundColor: '#e5e5e5',
                            flexDirection: 'column',
                            paddingVertical: 10,
                        }}
                    >
                        <View
                            style={{
                                marginHorizontal: 14,
                                marginVertical: 10,
                                backgroundColor: 'white',
                                padding: 9
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: 15
                                }}
                            >
                                Belum ada Komentar
                            </Text>
                            <Text>
                                {/* Isi komentar
                                Semoga Gojek dan Grab bisa masuk ke kecamatan bojonggenteng juga, agar saya bisa gabung menjadi driver dan menafkahi keluarga saya..
                                */}
                            </Text>
                            <Text
                                style={{
                                    fontSize: 11,
                                    color: "#999999",
                                    marginTop: 4,
                                }}
                            >
                                {/* 1 jam lalu */}
                            </Text>
                        </View>
                        
                    </View>
                </ScrollView>
            </View>
        )
    }
}