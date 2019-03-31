import React from 'react';
import {
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Image,
    Platform
} from 'react-native';

import LayananForm from '../common/LayananForm';
import BackBtn from '../common/BackBtn'

export default class KK extends React.Component {
    _KKUpload() {
        const navigation = this.props.navigation;

        const buttons = [
            {
                btnName: 'Upload foto surat pengantar dari RT/RW dan Desa',
                btnPage: 'KK'
            },
            {
                btnName: 'Upload foto Surat Pindah bagi pendatang',
                btnPage: 'KK'
            },
            {
                btnName: 'Upload foto Akta Nikah',
                btnPage: 'KK'
            },
            {
                btnName: 'Upload foto Surat Keterangan kehilangan bagi yang hilang',
                btnPage: 'KK'
            },
            {
                btnName: 'Upload foto e-KTP.',
                btnPage: 'KK'
            },
            {
                btnName: 'Upload foto Data Penunjang.',
                btnPage: 'KK'
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
                        title="Pembuatan KK"
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
                                {this._KKUpload()}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}