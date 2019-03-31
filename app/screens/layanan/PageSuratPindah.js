import React from 'react';
import {
    Text,
    View,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    TouchableOpacity
} from 'react-native';

import LayananForm from '../common/LayananForm';
import BackBtn from '../common/BackBtn';

export default class PageSuratPindah extends
    React.Component {
    _PageSuratPindahUpload() {
        const navigation = this.props.navigation;

        const buttons = [
            {
                btnName: 'Upload foto surat pengantar dari RT/RW dan Desa',
                btnPage: 'PageSuratPindah'
            },
            {
                btnName: 'Upload foto kartu keluarga asli',
                btnPage: 'PageSuratPindah'
            },
            {
                btnName: 'Upload foto e-KTP.',
                btnPage: 'PageSuratPindah'
            },
            {
                btnName: 'Upload foto Pernyataan pindah',
                btnPage: 'PageSuratPindah'
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
                                {this._PageSuratPindahUpload()}
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        )
    }
}