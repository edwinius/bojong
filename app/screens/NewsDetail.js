import React from 'react';
import {
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

import HeaderBerita from './common/HeaderBerita'

export default class NewsDetail extends React.Component {

    state = {
        lapor: ''
    }
    handleLapor = (text) => {
        this.setState({ lapor: text })
    }
    kirim = (lapor) => {
        alert('Komentar anda terikim.')
    }

    render() {

        const navigation = this.props.navigation

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
                <View>
                    <HeaderBerita
                        title="MyBoget News"
                        navigation={navigation} />
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
                            >11 Curhatan Seputar Dunia Per-Ojolan, dari Kisah Baper Hingga Bikin Mewek</Text>
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
                            >Boombastis.com</Text>
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
                            >Minggu, 31/03/2019</Text>
                        </View>
                    </View>

                    <View
                        style={{
                            marginVertical: 10
                        }}
                    >
                        <Image
                            style={{
                                width: '100%',
                                height: 190
                            }}
                            source={require('../../assets/kolom_berita/berita_ojol.jpeg')} />
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
                                fontSize: 17,
                                lineHeight: 24
                            }}
                        >Aplikasi ojek online memang mempermudah banyak orang, khususnya mereka yang tidak punya kendaraan dan tidak bisa naik motor. Sejak ada ojek online juga ada banyak sekali cerita haru, sedih, serta ngakak baik dari driver ataupun penumpang. Cerita-cerita ini juga dibagikan oleh akun @dramaojol.id dan timeline Twitter.
                        {'\n'}{'\n'}
                            Nah, di antara cerita-cerita lucu yang bertebaran di media sosial, sekarang Boombastis.com akan berbagi curhatan galau, kesal, serta kelakuan para penumpang yang bikin ngakak. Adakah nih di antara kalian semua yang suka kebablasan curhat panjang lebar seperti ini?
                        {'\n'}{'\n'}
                            Ini kisah yang pertama, sambil baca sambil dihayati yaa..
                        {'\n'}{'\n'}
                            Duh, emang ada-ada saja ya para netizen Indonesia ini. Tapi enggak masalah sih selama abang gojeknya juga mau mendengarkan, kali aja bisa memberi solusi kan ya~</Text>
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
                            flexDirection: 'column'
                        }}
                    >
                        <View
                            style={{
                                marginHorizontal: 14,
                                marginTop: 20,
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
                                Kevin Suratmo
                            </Text>
                            <Text>
                                Semoga Gojek dan Grab bisa masuk ke kecamatan bojonggenteng juga, agar saya bisa gabung menjadi driver dan menafkahi keluarga saya..
                            </Text>
                            <Text
                                style={{
                                    fontSize: 11,
                                    color: "#999999",
                                    marginTop: 4,
                                }}
                            >
                                1 jam lalu
                            </Text>
                        </View>
                        <View
                            style={{
                                marginHorizontal: 14,
                                marginVertical: 24,
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
                                Lisna Ningsih
                            </Text>
                            <Text>
                                hahaha lucu banget deh.. ada-ada aja ya cerita kehidupan driver2 ojol ini..
                            </Text>
                            <Text
                                style={{
                                    fontSize: 11,
                                    color: "#999999",
                                    marginTop: 4
                                }}
                            >
                                2 jam lalu
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}