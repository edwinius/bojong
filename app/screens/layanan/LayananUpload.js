import React from 'react';
import {
    ActionSheetIOS,
    Alert,
    AsyncStorage,
    Text,
    View,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    Image,
    TouchableOpacity
} from 'react-native';
import { ImagePicker } from 'expo';
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet';

import LoadingScreen from '../common/LoadingScreen';
import LayananForm from '../common/LayananForm';
import BackBtn from '../common/BackBtn';

export default class LayananUpload extends React.Component {
    render() {
		
		const navigation = this.props.navigation;
			
		return(
			<ActionSheetProvider>
				<LayananUploadApp navigation={ navigation } />
			</ActionSheetProvider>
		);
	}
}

@connectActionSheet
class LayananUploadApp extends React.Component {

    constructor(props) {
		super(props)
		this.state = {
            isLoading: false,
            imageSource: '',
            imageUri: '',
            imageName: '',
            imageType: '',
            arrImg: [],
            userPid: '',
            userToken: '',
            layananType: '',
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
    
    componentWillUnmount() {
		this.mounted = false;
    }

    async getPermissionAsync() {
		const { CAMERA_ROLL, Permissions } = Expo;
		try {
			const status = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			return(status);
		} catch(e) {
			console.log(e);
		}
		
		if (status === 'granted') {
			return CAMERA_ROLL.getCurrentPositionAsync({enableHighAccuracy: true});
		} else {
			throw new Error('Camera Roll permission not granted');
		}
	}
	
	async getPermissionCamera() {
		const { CAMERA, Permissions } = Expo;
		try {
			const status = await Permissions.askAsync(Permissions.CAMERA);
			return(status);
		} catch(e) {
			console.log(e);
		}
		
		if (status === 'granted') {
			return CAMERA.getCurrentPositionAsync({enableHighAccuracy: true});
		} else {
			throw new Error('Camera permission not granted');
		}
    }
    
    componentDidMount() {
		this.getPermissionAsync();
        this.getPermissionCamera();
		this.mounted = true;
		this.getToken();
    }

    _SubmitLayanan = () => {
        const { arrImg, userPid } = this.state;
        const navigation = this.props.navigation;
        
        //console.log(this.state);
        this.setState({
            isLoading: true
        });

        // Upload Image
        let formData = new FormData();

        /*formData.append('file_ktp', {
            uri: (Platform.OS === 'android' ? 'file://' : '') + imageUri,
            type: imageType,
            name: imageName,
            tmp_name: (Platform.OS === 'android' ? 'file://' : '') + imageUri
        });*/

        if(arrImg.length > 0) {
            arrImg.map(function(v, i) {
                formData.append('file_' + v.imageFile, {
                    uri: (Platform.OS === 'android' ? 'file://' : '') + v.imageUri,
                    type: v.imageType,
                    name: v.imageName,
                    tmp_name: (Platform.OS === 'android' ? 'file://' : '') + v.imageUri
                });
            });
        } else {
            Alert.alert('Mohon Upload File');
        }

        formData.append('user_pid', userPid);
        formData.append('layanan_type', '1');

        fetch(`${global.api}data_controller/test_layanan`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            body: formData,
            /*header: {
                'Content-Type': 'multipart/form-data'
            }*/
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            //console.log(this.state);
            console.log(formData);

            Alert.alert('Pengajuan anda telah berhasil di submit. Silahkan menunggu review dari kami. Terima kasih :)');
            navigation.goBack(null);
        });
    }

    _KtpUpload() {
        const navigation = this.props.navigation;

        const buttons = [
            {
                btnName: 'Upload Fotocopy Kartu Keluarga',
                btnFile: 'kk'
            },
            {
                btnName: 'Upload Fotocopy Buku Nikah/Akta Perkawinan bagi penduduk yang belum berumur 17 tahun, tetapi pernah kawin atau sudah kawin',
                btnFile: 'buku_nikah'
            },
            {
                btnName: 'Upload Fotocopy Akta Kelahiran',
                btnFile: 'akta_lahir'
            },
            {
                btnName: 'Bagi pemohon yang mengajukan perubahan biodata penduduk melampirkan FC Surat Bukti / Keterangan peristiwa penting atau kependudukan yang dialami',
                btnFile: 'surat_keterangan'
            },
            {
                btnName: 'Bagi orang asing tinggal tetap, mohon upload FC KITAP',
                btnFile: 'kitap'
            },
            {
                btnName: 'Bagi orang asing tinggal tetap, mohon upload FC SKTT',
                btnFile: 'sktt'
            }
        ];

        let that = this;

        const btn = buttons.map(function (item, index) {
            return (
                <View
                    key={index}
                    style={{
                        flexDirection: 'column',
                        marginTop: 14,
                        justifyContent: "center",
                    }}
                >
                    <View>
                        <Text
                            style={{
                                textAlign: 'justify',
                                lineHeight: 20,
                                color: '#333333'
                            }}
                        >
                            {item.btnName}</Text>
                    </View>

                    <TouchableOpacity
                        style={{
                            padding: 5,
                            borderRadius: 10,
                            borderWidth: 1,
                            width: 90,
                            marginTop: 15,
                            textAlign: 'center',
                            marginBottom: 10
                        }}
                        onPress={ () => that._ShowActionSheet(item.btnFile)}
                    >
                        <Text
                            style={{
                                textAlign: 'center',
                                fontSize: 15,
                                color: '#333333'
                            }}
                        >
                            Choose file
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        });

        return (btn);
    }

    _PickImage = async(file) => {
		let result = await ImagePicker.launchImageLibraryAsync({
			allowsEditing: true,
			aspect: [4, 4]
		});
		console.log(result);
		
		if(!result.cancelled) {
			let localUri = result.uri;
			let filename = localUri.split('/').pop();
			
			// Infer the type of the image
			let match = /\.(\w+)$/.exec(filename);
			let type = match ? `image/${match[1]}` : `image`;
			
            let source = { uri: result.uri };
            
            let objImg = {
                imageFile: file,
                imageSource: source,
				imageUri: localUri,
				imageName: filename,
				imageType: type
            }

            let joined = this.state.arrImg.concat(objImg);
            this.setState({
                arrImg: joined
            });

			{/*this.setState({ 
				imageSource: source,
				imageUri: localUri,
				imageName: filename,
				imageType: type
			});*/}
		}
	}
	
	_PickCamera = async(file) => {
		let result = await ImagePicker.launchCameraAsync({
			allowsEditing: true,
			aspect: [4, 4]
		});
		console.log(result);
		
		if(!result.cancelled) {
			let localUri = result.uri;
			let filename = localUri.split('/').pop();
			
			// Infer the type of the image
			let match = /\.(\w+)$/.exec(filename);
			let type = match ? `image/${match[1]}` : `image`;
			
            let source = { uri: result.uri };
            
            let objImg = {
                imageFile: file,
                imageSource: source,
				imageUri: localUri,
				imageName: filename,
				imageType: type
            }

            let joined = this.state.arrImg.concat(objImg);
            this.setState({
                arrImg: joined
            });

			{/*this.setState({ 
				imageSource: source,
				imageUri: localUri,
				imageName: filename,
				imageType: type
			});*/}
		}
	}
	
	_ShowActionSheet = (file) => {
		if(Platform.OS === 'ios') {
			ActionSheetIOS.showActionSheetWithOptions({
				options: ['Cancel', 'Take Photo', 'Choose From Gallery'],
				cancelButtonIndex: 0,
			},
			(buttonIndex) => {
				if(buttonIndex === 1) {
					this._PickCamera(file);
				} else if (buttonIndex === 2) { 
					this._PickImage(file);
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
					this._PickImage(file);
				} else if (buttonIndex === 1) { 
					this._PickCamera(file);
				}
			});
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
                        title="Perekaman e-KTP"
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

                    <TouchableOpacity
                        onPress={this._SubmitLayanan}
                        style={{
                            backgroundColor: 'green',
                            alignItems: 'center',
                            paddingVertical: 10,
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontWeight: 'bold'
                            }}
                        >
                            Submit Layanan
                        </Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}