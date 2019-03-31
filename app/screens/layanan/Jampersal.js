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

export default class Jampersal extends React.Component {

    _KtpUpload() {
        const navigation = this.props.navigation;

        const buttons = [
            {
                btnName: ' Upload foto Surat pengantar dari kepala desa',
                btnPage: 'Jampersal'
            },
            {
                btnName: 'Upload foto E-KTP yang masih berlaku',
                btnPage: 'Jampersal'
            },
            {
                btnName: 'Upload foto Surat Pernyataan Tidak mampu dari pemohon diketahui Ketua RT, Ketua RW, TKSK Kades/Lurah, dan Camat',
                btnPage: 'Jampersal'
            },
            {
                btnName: 'Upload foto Surat Rujukan dari puskesmas setempat, bagi yang berobat ke Rumah sakit',
                btnPage: 'Jampersal'
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
                        title="Surat Keterangan Jampersal"
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