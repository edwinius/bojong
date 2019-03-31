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

export default class PPATS extends React.Component {

    _KtpUpload() {
        const navigation = this.props.navigation;

        const buttons = [
            {
                btnName: 'Upload foto e-KTP Penjual dan Istri, Pembeli dan Istri/persetujuan/Ahli Waris',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Upload foto FC Kartu Keluarga',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Upload foto FC Akta Nikah',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Upload foto FC NPWP.',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Upload foto SPPT Tahun Berjalan',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Upload foto Kwitansi Bukti Pembayaran',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Upload foto FC/Salinan Buku Letter C Desa; Asli/FC Sertipikat/ Bukti Kepemilikan Tanah lainnya bila ada',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Upload foto Surat Pernyataan Tidak Sengketa',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Upload foto Surat Keterangan Riwayat Tanah',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Upload foto Surat Keterangan Kepala Desa',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Upload foto Surat Pernyataan Penguasaan dan Kepemilikan Tanah',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Upload foto Surat Kuasa Menghadap',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Upload foto Surat Pernyataan Persetujuan Menjual',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Upload foto Surat Pernyataan Tidak memegang Hak Guntai Tanah',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Upload foto Berita Acara Pengecekan Lokasi tanah dilapangan',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Upload foto Peta Kasar Tanah',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Upload foto Surat Pernyataan telah menerima Akta',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Upload foto Surat Kuasa Ahli Waris (bila diperlukan)',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Upload foto Surat Kuasa Waris (bila diperlukan)',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Upload foto Surat Keterangan waris dari Kepala Desa (bila diperlukan)',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Upload foto BPHTB/SSPD',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Upload foto SSP/PPh',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Upload foto Surat Keterangan Beda Biodata Subjek dan Objek Tanah dari Kepala Desa (bila diperlukan)',
                btnPage: 'PPATS'
            },
            {
                btnName: 'Upload foto FC DKHP Tahun berjalan (bila diperlukan)',
                btnPage: 'PPATS'
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
                        title="PPATS"
                        navigation={navigation}
                        back={true}
                    />

                    <ScrollView>
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