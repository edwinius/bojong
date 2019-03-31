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

export default class KtpPage extends React.Component {

    _KtpUpload() {
        const navigation = this.props.navigation;

        const buttons = [
            {
                btnName: 'Upload Fotocopy Kartu Keluarga',
                btnPage: 'KtpPage'
            },
            {
                btnName: 'Upload Fotocopy Buku Nikah/Akta Perkawinan bagi penduduk yang belum berumur 17 tahun, tetapi pernah kawin atau sudah kawin',
                btnPage: 'KtpPage'
            },
            {
                btnName: 'Upload Fotocopy Akta Kelahiran',
                btnPage: 'KtpPage'
            },
            {
                btnName: 'Bagi pemohon yang mengajukan perubahan biodata penduduk melampirkan FC Surat Bukti / Keterangan peristiwa penting atau kependudukan yang dialami',
                btnPage: 'KtpPage'
            },
            {
                btnName: 'Bagi orang asing tinggal tetap, mohon upload FC KITAP',
                btnPage: 'KtpPage'
            },
            {
                btnName: 'Bagi orang asing tinggal tetap, mohon upload FC SKTT',
                btnPage: 'KtpPage'
            }
        ];

        return (<LayananForm buttons={buttons} />)
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
                        title="Perekaman e-KTP"
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