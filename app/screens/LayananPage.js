import React from 'react';
import {
    Alert,
    AsyncStorage,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import BackBtn from './common/BackBtn';

export default class LayananPage extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            userPid: null,
            userToken: null,
        }
    }

    async getToken() {
		try {
			const navigation = this.props.navigation;
			let userPid = await AsyncStorage.getItem('userPid');
            let userToken = await AsyncStorage.getItem('userToken');

            // If not logged set userPid & userToken to 0
			if(userPid == null || userPid == '' || userToken == null || userToken == '') {
				userPid = '',
				userToken = ''
            }
            
            this.setState({
                userPid: userPid,
                userToken: userToken
            })
        } catch(error) {
			console.log(error);
		}
    }
    
    componentDidMount() {
		this.mounted = true;
		this.getToken();
    }
    
    componentWillUnmount() {
		this.mounted = false;
    }

    _ShowButtons() {
        const navigation = this.props.navigation;
        let { userPid } = this.state;

        const buttons = [
            {
                btnName: 'Perekaman e-KTP',
                btnPage: 'KtpPage',
                layananType: '1'
            },
            {
                btnName: 'Pembuatan KK',
                btnPage: 'KK',
                layananType: '2'
            },
            {
                btnName: 'Penerbitan Surat Pindah',
                btnPage: 'PageSuratPindah',
                layananType: '3'
            },
            {
                btnName: 'Pembuatan IMB dibawah 200m2',
                btnPage: 'ImbDibawah200m',
                layananType: '4'
            },
            {
                btnName: 'Pembuatan IMB diatas 200m2',
                btnPage: 'ImbDiatas200m',
                layananType: '5'
            },
            {
                btnName: 'Surat Keterangan Jampersal',
                btnPage: 'Jampersal',
                layananType: '7'
            },
            {
                btnName: 'Pembuatan SIUP/TDP',
                btnPage: 'SIUPdanTDP',
                layananType: '8'
            },
            {
                btnName: 'VISUM',
                btnPage: 'VISUM',
                layananType: '9'
            },
            {
                btnName: 'PPATS',
                btnPage: 'PPATS',
                layananType: '6'
            },
            {
                btnName: 'Surat Keterangan Ahli Waris',
                btnPage: 'PageAhliWaris',
                layananType: '10'
            },
            {
                btnName: 'Surat Keterangan Pinjam ke Bank',
                btnPage: 'PagePinjamBank',
                layananType: '11'
            },
            {
                btnName: 'Izin Reklame Tanpa Sponsor',
                btnPage: 'IzinReklame',
                layananType: '12'
            },
            {
                btnName: 'Rekomendasi Izin Rame-Rame',
                btnPage: 'IzinRame',
                layananType: '13'
            }
        ];

        const btn = buttons.map(function (item, index) {
            return (
                <TouchableOpacity
                    key={index}
                    style={{
                        flexDirection: 'row',
                        marginTop: 14,
                        justifyContent: "center",
                    }}
                    onPress={() => {
                        if(userPid > 0) {
                            navigation.navigate('LayananContainer', {
                                layananType: `${item.layananType}`,
                                userPid: userPid,
                                layananName: `${item.btnName}`
                            });
                        } else {
                            Alert.alert('Mohon Log In terlebih dahulu');
                        }
                    }}
                >
                    <View
                        style={{
                            padding: 5,
                            borderRadius: 10,
                            borderWidth: 0.5,
                            width: 30,
                            marginRight: 7,
                            shadowColor: 'grey',
                            shadowOffset: { width: 1.5, height: 1.5 },
                            shadowRadius: 2,
                            shadowOpacity: 0.35,
                            elevation: 3,
                            backgroundColor: 'white'
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 15,
                                color: "#444444"
                            }}
                        >
                            {index + 1}
                        </Text>
                    </View>

                    <View
                        style={{
                            padding: 5,
                            borderRadius: 10,
                            borderWidth: 0.5,
                            width: 250,
                            shadowColor: 'grey',
                            shadowOffset: { width: 1.5, height: 1.5 },
                            shadowRadius: 2,
                            shadowOpacity: 0.35,
                            elevation: 3,
                            backgroundColor: 'white'
                        }}>
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 15,
                                color: "#444444"
                            }}
                        >
                            {item.btnName}
                        </Text>
                    </View>
                </TouchableOpacity>
            )
        });

        return (btn);
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
                        background: 'white'
                    }}
                >
                    <BackBtn
                        title="Layanan"
                        navigation={navigation}
                        back={true}
                    />

                    <ScrollView
                        style={{
                            backgroundColor: 'white'
                        }}
                    >
                        <View>
                            <Text
                                style={{
                                    textAlign: 'center',
                                    paddingHorizontal: 27,
                                    paddingTop: 10,
                                    color: "#333333"
                                }}
                            >
                                Selamat datang dihalaman Layanan kami,silahkan pilih layanan yang anda butuhkan
                                dibawah ini.{"\n"}{'\n'}Kecamatan Bojonggenteng akan memproses data yang anda upload di setiap layanan yang tersedia, mohon untuk mempersiapkan data yang dibutuhkan dan harap mengirim foto yang jelas agar kami dapat memproses kebutuhan anda dengan lebih cepat.
                            </Text>
                        </View>

                        <View
                            style={{
                                padding: 10,
                                marginBottom: 17
                            }}
                        >
                            {this._ShowButtons()}
                        </View>

                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({

});
