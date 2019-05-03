import React from 'react';
import {
    Alert,
    AsyncStorage,
    Text,
    View,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Image,
    TouchableOpacity,
    TextInput
} from 'react-native';

import LoadingScreen from './common/LoadingScreen';

import BackBtn from './common/BackBtn';

export default class Elapor extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            laporMsg: '',
            userPid: '',
            userToken: '',
        }
    }

    async getToken() {
		try {
			const navigation = this.props.navigation;
			let userPid = await AsyncStorage.getItem('userPid');
            let userToken = await AsyncStorage.getItem('userToken');
            let userAdmin = await AsyncStorage.getItem('userAdmin');
            
            if(this.mounted) {
                this.setState({
                    userPid: userPid,
                    userToken: userToken,
                    isLoading: false
                });
            }
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

    _SubmitLapor = () => {
        const { laporMsg, userPid } = this.state;
        const navigation = this.props.navigation;

        if(laporMsg != '') {
            this.setState({
                isLoading: true
            });

            fetch(`${global.api}add_data`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    appToken: global.appToken,
                    table: 'laporan',
                    data: {
                        laporan_msg: laporMsg,
                        user_pid: userPid
                    }
                })
            }).then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson);

                if(responseJson['status'] == '200') {
                    if(this.mounted) {
                        this.setState({
                            isLoading: false,
                            laporMsg: ''
                        });
                    }

                    Alert.alert('Laporan telah berhasil dikirim. Mohon tunggu balasan dari kami');
                }
            }).catch((error) => {
                console.error(error);
            });
        } else {
			Alert.alert('Mohon isi pesan laporan');
		}
    }

    render() {
        if(this.state.isLoading) {
			return(
				<LoadingScreen />
			);
		}

        const navigation = this.props.navigation;

        return (
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: 'rgb(52,73,100)',
                    ...Platform.select({
                        android: {
                            paddingTop: 30
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
                        title="Lapor"
                        navigation={navigation}
                        back={false}
                    />

                    <ScrollView
                    >
                        <View
                            style={{
                                flex: 1
                            }}
                        >
                            <View
                                style={{
                                    paddingHorizontal: 30,
                                    marginTop: 50,
                                    marginBottom: 20
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: 'center'
                                    }}
                                >
                                    E-Lapor adalah fitur yang disediakan oleh kecamatan Bojonggenteng untuk masyarakat, agar dapat melaporkan kejadian apapun secara online yang terjadi di sekitar.
                                </Text>
                            </View>
                            <View
                                style={{
                                    paddingHorizontal: 30,
                                    alignItems: 'center'
                                }}
                            >
                                <TextInput
                                    style={{
                                        borderColor: 'grey',
                                        borderWidth: 1,
                                        borderRadius: 10,
                                        marginTop: 15,
                                        width: 300,
                                        height: 200,
                                        paddingHorizontal: 10,
                                        paddingVertical: 10,
                                        justifyContent: 'flex-start',
                                        alignItems: 'flex-start',
                                        textAlign: 'left',
                                    }}
                                    multiline={true} 
                                    numberOfLines={5}
                                    underlineColorAndroid="transparent"
                                    placeholder="Tulis laporan anda"
                                    placeholderTextColor="#cacaca"
                                    autoCapitalize="none"
                                    onChangeText={ laporMsg => this.setState({ laporMsg })}
                                    value={ this.state.laporMsg }
                                />

                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#888888',
                                        borderWidth: 0.1,
                                        borderRadius: 15,
                                        paddingVertical: 8,
                                        paddingHorizontal: 30,
                                        marginTop: 10,
                                        alignItems: 'center',
                                        shadowColor: 'grey',
                                        shadowOffset: { width: 1.5, height: 1.5 },
                                        shadowRadius: 2,
                                        shadowOpacity: 0.35,
                                        elevation: 3,
                                    }}
                                    onPress={ this._SubmitLapor }
                                >
                                    <Text 
                                        style={{
                                            color: 'white'
                                        }}
                                    >
                                        Kirim
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}