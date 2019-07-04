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


export default class TentangKamiq extends React.Component {

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
                        title="Tentang Kami"
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
                                    padding: 22,
                                    marginTop: 20
                                }}
                            >
                                <Text
                                    style={{
                                        color: "#333333",
                                        fontSize: 21,
                                        textAlign: "center",
                                        lineHeight: 25,
                                        fontWeight: "bold"
                                    }}
                                >
                                    Selamat Datang di aplikasi {"\n"} My Boget
                                </Text>
                            </View>

                            <View
                                style={{
                                    alignItems: "center",
                                    marginVertical: 10
                                }}
                            >
                                <Image
                                    style={{
                                        width: 80,
                                        height: 80,
                                    }}
                                    source={require('../../assets/logo_bojong.png')}
                                />
                            </View>
                            <View
                                style={{
                                    flexDirection: "column",
                                    padding: 15,
                                    marginTop: 10,
                                    marginBottom: 30,
                                    paddingHorizontal: 20
                                }}
                            >
                                <View>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            lineHeight: 25
                                        }}
                                    >
                                        Bojonggenteng, Bojong Genteng atau Kecamatan Bojonggenteng adalah sebuah kecamatan di Kabupaten Sukabumi, Provinsi Jawa Barat, Indonesia.
                                        {"\n"}{"\n"}
                                        Kecamatan Bojonggenteng dikenal sebagai kecamatan industri penghasil palet kayu dengan tujuan pengiriman ke DKI Jakarta.
                                        {"\n"}{"\n"}
                                        Kecamatan Bojonggenteng merupakan kecamatan yang terbilang baru, hasil dari pemekaran Kecamatan Parungkuda berdasarkan Perda No. 01 Tahun 2001 tentang Pembentukan 15 (limabelas) Kecamatan di Kabupaten Sukabumi.
                                    </Text>
                                </View>
                                <View
                                    style={{
                                        marginTop: 20
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontWeight: "bold",
                                            textAlign: "center",
                                            fontSize: 15,
                                            paddingBottom: 9
                                        }}
                                    >
                                        Tapi tahukah kamu?
                                    </Text>
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            lineHeight: 22,
                                        }}
                                    >
                                        Kecamatan Bojonggenteng memiliki luas yaitu 21,7971 km2.
                                        {"\n"}
                                        Dan memiliki kepadatan jiwa sebanyak 38 Ribu Jiwa.
                                    </Text>
                                    <Text
                                        style={{
                                            paddingVertical: 17,
                                            textAlign: "center",
                                            fontWeight: "bold"
                                        }}
                                    >
                                        HUBUNGI KAMI
                                    </Text>
                                    <Text
                                        style={{
                                            textAlign: "center"
                                        }}
                                    >
                                        Informasi, Saran Pengaduan:
                                        {"\n"}
                                        No. Tlp: 0266 620147
                                        {"\n"}{"\n"}
                                        Email:
                                        {"\n"}
                                        kec.bojonggenteng@gmail.com
                                    </Text>
                                </View>
                            </View>
                        </View>

                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}