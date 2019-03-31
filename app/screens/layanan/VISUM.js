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

export default class VISUM extends React.Component {

    _KtpUpload() {
        const navigation = this.props.navigation;

        const buttons = [
            {
                btnName: 'Upload foto Surat permohonan visum dari Direktur CV kepada Camat',
                btnPage: 'VISUM'
            },
            {
                btnName: 'Upload foto Surat Perintah Kerja/Mulai Kerja (SPK/SPMK)',
                btnPage: 'VISUM'
            },
            {
                btnName: 'Upload foto Berita Acara/Surat Penyerahan Lapangan (BAPL/SPL)',
                btnPage: 'VISUM'
            },
            {
                btnName: 'Upload foto Dokumentasi pelaksanaan pekerjaan',
                btnPage: 'VISUM'
            },
            {
                btnName: 'Upload foto Surat Pernyataan Penyelesaian Pekerjaan yg di TTd Pengawas lapangan',
                btnPage: 'VISUM'
            },
            {
                btnName: 'Upload foto Surat Keterangan Penyelesaian Pekerjaan dan tidak memiliki hutang-piutang dengan masyarakat oleh Kepala Desa',
                btnPage: 'VISUM'
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
                        title="VISUM"
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
        )
    }
}