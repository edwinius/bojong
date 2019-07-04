import React from 'react';
import {
    ActionSheetIOS,
    Alert,
    AsyncStorage,
    Button,
    Dimensions,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet';

import LoadingScreen from './common/LoadingScreen';
import BackBtn from './common/BackBtn';
import {parseDate} from '../efunctions';

const styleGeneral = require('./styles/StyleGeneral');

const dimensions = Dimensions.get('window');
const dWidth = dimensions.width;

export default class SignUpKtp extends React.Component {
    render() {
		const navigation = this.props.navigation;
			
		return(
			<ActionSheetProvider>
				<SignUpKtpApp navigation={ navigation } />
			</ActionSheetProvider>
		);
	}
}

@connectActionSheet
class SignUpKtpApp extends React.Component {
    constructor(props) {
		super(props)
		this.state = {
            isLoading: false,
            imageSource: null,
            imageUri: '',
            imageName: '',
            imageType: '',
            ktpNumber: '',
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

    askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        // you would probably do something to verify that permissions
        // are actually granted, but I'm skipping that for brevity
    };

    _PickImage = async() => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
		});
		console.log(result);
		
		if(!result.cancelled) {
			let localUri = result.uri;
			let filename = localUri.split('/').pop();
			
			// Infer the type of the image
			let match = /\.(\w+)$/.exec(filename);
			let type = match ? `image/${match[1]}` : `image`;
			
            let source = { uri: result.uri };

			this.setState({ 
				imageSource: source,
				imageUri: localUri,
				imageName: filename,
				imageType: type
			});
		}
    }

    _PickCamera = async() => {
        await this.askPermissionsAsync();
		let result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
            base64: false,
		});
		console.log(result);
		
		if(!result.cancelled) {
			let localUri = result.uri;
			let filename = localUri.split('/').pop();
			
			// Infer the type of the image
			let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
			
            let source = { uri: result.uri };

			this.setState({ 
				imageSource: source,
				imageUri: localUri,
				imageName: filename,
				imageType: type
			});
		}
    }
    
    _ShowActionSheet = () => {
		if(Platform.OS === 'ios') {
			ActionSheetIOS.showActionSheetWithOptions({
				options: ['Cancel', 'Take Photo', 'Choose From Gallery'],
				cancelButtonIndex: 0,
			},
			(buttonIndex) => {
				if(buttonIndex === 1) {
					this._PickCamera();
				} else if (buttonIndex === 2) { 
					this._PickImage();
				}
			});
		} else if(Platform.OS === 'android') {
			let options = ['Choose From Gallery', 'Take Photo', 'Cancel'];
			let cancelButtonIndex = 2;

			this.props.showActionSheetWithOptions({
				options,
				cancelButtonIndex,
			},
			(buttonIndex) => {
				if(buttonIndex === 0) {
					this._PickImage();
				} else if (buttonIndex === 1) { 
					this._PickCamera();
				}
			});
		}
    }

    _UploadKtp = () => {
        const navigation = this.props.navigation;
        let { userPid, ktpNumber, imageName, imageType, imageUri } = this.state;

        if(imageName != '' && ktpNumber != '') {
            if(ktpNumber.length == 16) {
                if(isFinite(String(ktpNumber))) {
                    let formData = new FormData();

                    formData.append('file', {
                        uri: imageUri,
                        name: imageName,
                        type: imageType
                    });

                    formData.append('user_pid', userPid);
                    formData.append('ktp_number', ktpNumber);

                    // Send file to server
                    if(this.mounted) {
                        this.setState({
                            isLoading: true
                        });
                    }

                    fetch(`${global.api}data_controller/upload_user_ktp`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'multipart/form-data'
                        },
                        body: formData
                    }).then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson);

                        if(responseJson['status'] == '200') {
                            if(responseJson['penduduk'] == '1') {
                                let penduduk_pid = responseJson['penduduk_pid'];
                                let penduduk_dob = responseJson['penduduk_dob'];

                                Alert.alert(
                                    'Apakah betul ini anda?',
                                    `NIK: ${ktpNumber}${"\n"}${responseJson['penduduk_name']}${"\n"}DOB: ${parseDate(penduduk_dob)}`,
                                    [
                                        {
                                            text: 'Bukan',
                                            onPress: () => { 
                                                if(this.mounted) {
                                                    this.setState({ isLoading: false })
                                                }
                                            }
                                        },
                                        {
                                            text: 'Ya',
                                            onPress: () => {
                                                if(this.mounted) {
                                                    this.setState({
                                                        isLoading: true
                                                    });
                                                }
                                                
                                                fetch(`${global.api}data_controller/update_data`, {
                                                    method: 'POST',
                                                    headers: {
                                                        'Accept': 'application/json',
                                                        'Content-Type': 'application/json'
                                                    },
                                                    body: JSON.stringify({
                                                        appToken: global.appToken,
                                                        table: 'user_set_penduduk',
                                                        data: {
                                                            set_col: 'penduduk_pid',
                                                            set_data: penduduk_pid,
                                                            where_col: 'user_pid',
                                                            where_data: userPid,
                                                            table: 'data_user'
                                                        }
                                                    })
                                                }).then((response) => response.json())
                                                .then((responseJson) => {
                                                    console.log(responseJson);
                        
                                                    if(responseJson['status'] == '200') {
                                                        navigation.navigate('LayananPage');
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
                            } else {
                                this.setState({ isLoading: false });
                                navigation.navigate('SignUpPendudukNotFound',
                                {
                                    ktpNumber: ktpNumber
                                });
                            }
                        }
                    });
                } else {
                    Alert.alert('NIK hanya diperbolehkan angka');
                }
            } else {
                Alert.alert('NIK harus 16 digit');
            }
        } else {
            Alert.alert('Mohon upload file dan isi NIK');
        }
    }

    render() {
        if(this.state.isLoading) {
			return(
				<LoadingScreen />
			);
        }

        const navigation = this.props.navigation;

        return(
            <View
                style={{
                    flex: 1
                }}
            >
                <SafeAreaView style={ styleGeneral.safeAreaView2 }>
                    <BackBtn
                        title="Upload KTP"
                        navigation={navigation}
                        back={false}
                    />
                </SafeAreaView>

                <ScrollView
                    style={{
                        flex: 1
                    }}
                >
                    <View
                        style={{
                            alignItems: 'center',
                            paddingVertical: 15,
                        }}
                    >
                        <Text>
                            Mohon upload foto KTP anda
                        </Text>
                    </View>

                    <View>
                        <TouchableOpacity
                            onPress={this._ShowActionSheet}
                            style={{}}
                        >
                            <View 
                                style={{
                                    alignItems: 'center',
                                    paddingVertical: 10,
                                }}
                            >
                                <Image 
                                    style={{
                                        width: dWidth * 0.7,
                                        height: dWidth * 0.7
                                    }}
                                    //source={ require('../assets/images/icon_profile_add.png') }
                                    source={this.state.imageSource != null ? this.state.imageSource : require('../../assets/images/plus.jpg')}
                                />
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View
                        style={{
                            alignItems: 'center',
                            paddingVertical: 15,
                        }}
                    >
                        <Text>
                            Mohon isi NIK anda dengan benar
                        </Text>
                    </View>

                    <View
                        style={{
                            alignItems: 'center',
                            flex: 1,
                            width: '100%',
                        }}
                    >
                        <TextInput
                            value={ this.state.ktpNumber }
                            onChangeText={ ktpNumber => this.setState({ ktpNumber })}
                            style={{
                                paddingVertical: 10,
                                paddingHorizontal: 15,
                                borderWidth: 1,
                                borderColor: '#cacaca',
                                borderRadius: 10,
                                flex: 1,
                                width: '80%',
                                letterSpacing: 2,
                            }}
                        />
                    </View>

                    <View
                        style={{
                            paddingVertical: 25,
                        }}
                    >
                        <TouchableOpacity 
                            style={ styleGeneral.btnOrange }
                            onPress={ this._UploadKtp }
                        >
                            <Text style={ styleGeneral.txtBtnOrange }>
                                Selesai
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}