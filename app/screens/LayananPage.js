import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Alert,
    SafeAreaView,
    Platform,
} from 'react-native';

import BackBtn from './common/BackBtn';

export default class LayananPage extends React.Component {

    _ShowButtons() {
        const navigation = this.props.navigation;

        const buttons = [
            {
                btnName: 'Perekaman e-KTP',
                btnPage: 'KtpPage'
            },
            {
                btnName: 'Pembuatan KK',
                btnPage: 'KK'
            },
            {
                btnName: 'Penerbitan Surat Pindah',
                btnPage: 'PageSuratPindah'
            },
            {
                btnName: 'Pembuatan IMB dibawah 200m2',
                btnPage: 'ImbDibawah200m'
            },
            {
                btnName: 'Pembuatan IMB diatas 200m2',
                btnPage: 'ImbDiatas200m'
            },
            {
                btnName: 'Surat Keterangan Jampersal',
                btnPage: 'Jampersal'
            },
            {
                btnName: 'Pembuatan SIUP/TDP',
                btnPage: 'SIUPdanTDP'
            },
            {
                btnName: 'VISUM',
                btnPage: 'VISUM'
            },
            {
                btnName: 'PPATS',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Surat Keterangan Ahli Waris',
                btnPage: 'PageAhliWaris'
            },
            {
                btnName: 'Surat Keterangan Pinjam ke Bank',
                btnPage: 'PagePinjamBank'
            },
            {
                btnName: 'Izin Reklame Tanpa Sponsor',
                btnPage: 'IzinReklame'
            },
            {
                btnName: 'Rekomendasi Izin Rame-Rame',
                btnPage: 'IzinRame'
            }
        ];

        const btn = buttons.map(function (item, index) {
            return (
                <TouchableOpacity
                    key={index}
                    style={{
                        flexDirection: 'row',
                        marginTop: 14,
                        justifyContent: "center",
                    }}
                    onPress={() => navigation.navigate(`${item.btnPage}`)}
                >
                    <View
                        style={{
                            padding: 5,
                            borderRadius: 10,
                            borderWidth: 0.5,
                            width: 30,
                            marginRight: 7,
                            shadowColor: 'grey',
                            shadowOffset: { width: 1.5, height: 1.5 },
                            shadowRadius: 2,
                            shadowOpacity: 0.35,
                            elevation: 3,
                            backgroundColor: 'white'
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 15,
                                color: "#444444"
                            }}
                        >
                            {index + 1}
                        </Text>
                    </View>

                    <View
                        style={{
                            padding: 5,
                            borderRadius: 10,
                            borderWidth: 0.5,
                            width: 250,
                            shadowColor: 'grey',
                            shadowOffset: { width: 1.5, height: 1.5 },
                            shadowRadius: 2,
                            shadowOpacity: 0.35,
                            elevation: 3,
                            backgroundColor: 'white'
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 15,
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
        const navigation = this.props.navigation;

        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: 'rgb(52,73,100)',
                    ...Platform.select({
                        android: {
                            paddingTop: 30,
                        }
                    })
                }}
            >
                <StatusBar barStyle="light-content" />

                <View
                    style={{
                        flex: 1,
                        background: 'white'
                    }}
                >
                    <BackBtn
                        title="Layanan"
                        navigation={navigation}
                        back={true}
                    />

                    <ScrollView
                        style={{
                            backgroundColor: 'white'
                        }}
                    >
                        <View>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    paddingHorizontal: 27,
                                    paddingTop: 10,
                                    color: "#333333"
                                }}
                            >
                                Silahkan pilih layanan dibawah ini {'\n'}Mohon upload data-data yang diperlukan untuk masing-masing layanan.
                            </Text>
                        </View>

                        <View
                            style={{
                                padding: 10,
                                marginBottom: 17
                            }}
                        >
                            {this._ShowButtons()}
                        </View>

                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

});
