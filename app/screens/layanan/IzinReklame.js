import React from 'react';
import {
    Text,
    View,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Image,
    TouchableOpacity
} from 'react-native';

import LayananForm from '../common/LayananForm';
import BackBtn from '../common/BackBtn';

export default class IzinReklame extends React.Component {

    _KtpUpload() {
        const navigation = this.props.navigation;

        const buttons = [
            {
                btnName: 'Upload foto KTP',
                btnPage: 'IzinReklame'
            },
            {
                btnName: 'Upload foto NPWP',
                btnPage: 'IzinReklame'
            },
            {
                btnName: 'Upload foto Jenis Reklame dan gambar serta gambaran dasar konstruksi yang akan dibangun',
                btnPage: 'IzinReklame'
            },
            {
                btnName: 'Upload foto Lokasi pemasangan yang diinginkan',
                btnPage: 'IzinReklame'
            },
            {
                btnName: 'Upload foto Surat Pernyataan Tidak Keberatan dari pemilik tanah / bangunan yang akan dipakai pemasangan Reklame bagi pemasangan milik pihak lain',
                btnPage: 'IzinReklame'
            },
            {
                btnName: 'Upload foto Surat Rekomendasi dari OPD terkait',
                btnPage: 'IzinReklame'
            }
        ];

        return (<LayananForm buttons={buttons} />);
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
                        backgroundColor: 'white'
                    }}
                >

                    <BackBtn
                        title="Izin Reklame Tanpa Sponsor"
                        navigation={navigation}
                        back={true}
                    />

                    <ScrollView
                        style={{
                            flex: 1
                        }}
                    >
                        <View
                            style={{
                                marginTop: 5,
                                marginLeft: 20,
                                marginRight: 20,
                                marginBottom: 20
                            }}
                        >
                            <View>
                                {this._KtpUpload()}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}