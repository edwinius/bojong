import React from 'react';
import {
    Text,
    View,
    Platform,
    SafeAreaView,
    StatusBar,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';

import LayananForm from '../common/LayananForm';
import BackBtn from '../common/BackBtn';

export default class PagePinjamBank extends React.Component {

    _KtpUpload() {
        const navigation = this.props.navigation;

        const buttons = [
            {
                btnName: 'Upload foto Berkas yang sudah ditandatangani oleh yang bersangkutan',
                btnPage: 'PagePinjamBank'
            },
            {
                btnName: 'Upload foto KTP',
                btnPage: 'PagePinjamBank'
            },
            {
                btnName: 'Upload foto KK',
                btnPage: 'PagePinjamBank'
            },
            {
                btnName: 'Upload foto Surat keterangan kematian dari desa',
                btnPage: 'PagePinjamBank'
            },
            {
                btnName: 'Upload foto AJB',
                btnPage: 'PagePinjamBank'
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
                        title="Surat Keterangan Pinjam ke Bank"
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