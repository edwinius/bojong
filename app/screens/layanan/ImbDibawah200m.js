import React from 'react';
import {
    View,
    Text,
    ScrollView,
    SafeAreaView,
    StatusBar,
    Image,
    TouchableOpacity,
    Platform
} from 'react-native';

import LayananForm from '../common/LayananForm';
import BackBtn from '../common/BackBtn';

export default class ImbDibawah200m extends
    React.Component {
    _ImbUpload() {
        const navigation = this.props.navigation;

        const buttons = [
            {
                btnName: 'Upload foto e-KTP',
                btnPage: 'ImbDiatas200m'
            },
            {
                btnName: 'Upload Fotocopy Surat Tanah',
                btnPage: 'ImbDiatas200m'
            },
            {
                btnName: 'Upload Fotocopy AJB',
                btnPage: 'ImbDiatas200m'
            },
            {
                btnName: 'Upload Fotocopy Letter C',
                btnPage: 'ImbDiatas200m'
            },
            {
                btnName: 'Upload Fotocopy Surat Sewa Menyewa',
                btnPage: 'ImbDiatas200m'
            },
            {
                btnName: 'Upload foto Surat Keterangan Tanah Tidak Sengketa',
                btnPage: 'ImbDiatas200m'
            },
            {
                btnName: 'Upload foto SPPT PBB Terakhir',
                btnPage: 'ImbDiatas200m'
            },
            {
                btnName: 'Upload foto STTS PBB',
                btnPage: 'ImbDiatas200m'
            },
            {
                btnName: 'Upload foto Gambar Konstruksi Bangunan',
                btnPage: 'ImbDiatas200m'
            },
            {
                btnName: 'Upload foto Surat Izin Tetangga/Lingkungan',
                btnPage: 'ImbDiatas200m'
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
                        title="IMB Dibawah 200m"
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
                                {this._ImbUpload()}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}