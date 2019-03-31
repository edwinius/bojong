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

export default class SIUPdanTDP extends React.Component {

    _KtpUpload() {
        const navigation = this.props.navigation;

        const buttons = [
            {
                btnName: ' Upload foto e-KTP',
                btnPage: 'SIUPdanTDP'
            },
            {
                btnName: 'Upload foto FC Surat Tanah',
                btnPage: 'SIUPdanTDP'
            },
            {
                btnName: 'Upload foto FC AJB',
                btnPage: 'SIUPdanTDP'
            },
            {
                btnName: 'Upload foto FC SHM',
                btnPage: 'SIUPdanTDP'
            },
            {
                btnName: 'Upload foto FC Surat Sewa Menyewa',
                btnPage: 'SIUPdanTDP'
            },
            {
                btnName: 'Upload foto SPPT Terakhir',
                btnPage: 'SIUPdanTDP'
            },
            {
                btnName: 'Upload foto STTS',
                btnPage: 'SIUPdanTDP'
            },
            {
                btnName: 'Upload foto Surat Izin Tetangga',
                btnPage: 'SIUPdanTDP'
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
                        title="Pembuatan SIUP/TDP"
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