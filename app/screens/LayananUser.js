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

import LoadingScreen from './common/LoadingScreen';
import NoData from './common/NoData';
import BackBtn from './common/BackBtn';

export default class LayananUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: [],
            userPid: null,
            userToken: null,
            pendudukPid: null,
            layananType: '0'
        }
    }

    async getToken() {
		try {
            const navigation = this.props.navigation;
            let layananType = navigation.state.params.layananType;
            let userPid = await AsyncStorage.getItem('userPid');
            let userToken = await AsyncStorage.getItem('userToken');
            let pendudukPid = await AsyncStorage.getItem('pendudukPid');

			// Fetch home data
			fetch(`${global.api}fetch_data`,
			{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					appToken: global.appToken,
                    table: 'user_layanan',
                    data: {
                        user_pid: userPid,
                        type: layananType,
                        status: '0'
                    }
				})
			}).then((response) => response.json())
			.then((responseJson) => {
                console.log(responseJson);
                
                if(responseJson['status'] == '200') {
					if(this.mounted) {
						this.setState({
							isLoading: false,
                            userPid: userPid,
                            userToken: userToken,
                            pendudukPid: pendudukPid,
                            layananType: layananType,
                            data: responseJson['data']
						});
					}
				}
			}).catch((error) => {
				console.error(error);
			});
			
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

    _ShowUserLayanan() {
        const navigation = this.props.navigation;
        let layananName = navigation.state.params.layananName;

        if(this.state.data.length > 0) {
            let applications = this.state.data.map(function(v, i) {
                return(
                    <TouchableOpacity
                        key={i}
                        style={{
                            flexDirection: 'row',
                            paddingVertical: 7,
                            paddingHorizontal: 10,
                            borderBottomWidth: 1,
                            borderColor: '#cacaca'
                        }}
                        onPress={() => navigation.navigate('LayananUpload',
                        {
                            layananType: `${v.layanan_type}`,
                            layananPid: `${v.layanan_pid}`,
                            layananName: layananName
                        })}
                    >
                        <View
                            style={{
                                width: 160,
                            }}
                        >
                            <Text>
                                { v.layanan_datetime }
                            </Text>
                        </View>

                        <View>
                            <Text>
                                #{ v.layanan_ts }
                            </Text>
                        </View>
                    </TouchableOpacity>
                )
            });

            return(applications);
        } else {
            return(<NoData text='Anda belum membuat pengajuan' />);
        }
    }

    _CreateNewLayanan = () => {
        Alert.alert(
            'Buat Pengajuan Baru?',
            '',
            [
                {
                    text: 'Batal',
                    onPress: ''
                },
                {
                    text: 'Buat',
                    onPress: () => {
                        const navigation = this.props.navigation;
                        let { userPid, layananType } = this.state;

                        this.setState({
                            isLoading: true
                        });
                        
                        fetch(`${global.api}data_controller/add_data`, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                appToken: global.appToken,
                                table: 'layanan',
                                data: {
                                    user_pid: userPid,
                                    layanan_type: layananType
                                }
                            })
                        }).then((response) => response.json())
                        .then((responseJson) => {
                            console.log(responseJson);

                            if(responseJson['status'] == '200') {
                                navigation.navigate('LayananUpload',
                                {
                                    layananType: `${this.state.layananType}`,
                                    layananPid: `${responseJson['pid']}`
                                });
                            } else {
                                if(this.mounted) {
                                    this.setState({
                                        isLoading: false
                                    });
                                    Alert.alert('Error. Silahkan coba lagi');
                                }
                            }
                        });
                    }
                }
            ]
        );
    }

    render() {
        if(this.state.isLoading) {
			return(
				<LoadingScreen />
			);
        }
        
        const navigation = this.props.navigation;
        let layananName = navigation.state.params.layananName;

        return(
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
                        title={layananName}
                        navigation={navigation}
                        screen_from='LayananPage'
                        back={true}
                    />

                    <View
                        style={{
                            backgroundColor: 'white'
                        }}
                    >
                        
                    </View>

                    <ScrollView
                        style={{
                            backgroundColor: 'white',
                            flex: 1
                        }}
                    >
                        { this._ShowUserLayanan() }
                    </ScrollView>

                    <TouchableOpacity
                        style={{
                            backgroundColor: 'green',
                            alignItems: 'center',
                            paddingVertical: 7,
                        }}
                        onPress={this._CreateNewLayanan}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                        >
                            Buat Pengajuan
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}