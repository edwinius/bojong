import React from 'react';
import {
    ActionSheetIOS,
    Alert,
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
            isLoading: true,
            imageSource: '',
            imageUri: '',
            imageName: '',
            imageType: ''
        }
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
    }

    _SubmitLayanan = () => {
        const { imageSource, imageUri, imageName, imageType } = this.state;
        const navigation = this.props.navigation;

        // Upload Image
        let formData = new FormData();
        formData.append('file_ktp', {
            uri: (Platform.OS === 'android' ? 'file://' : '') + imageUri,
            type: imageType,
            name: imageName,
            tmp_name: (Platform.OS === 'android' ? 'file://' : '') + imageUri
        });

        fetch(`${global.api}data_controller/test_layanan`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: formData,
            header: {
                'content-type': 'multipart/form-data'
            }
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            //console.log(this.state);
            console.log(formData);
        });
    }

    _KtpUpload() {
        const navigation = this.props.navigation;

        const buttons = [
            {
                btnName: 'Upload Fotocopy Kartu Keluarga',
                btnPage: 'KtpPage'
            },
            {
                btnName: 'Upload Fotocopy Buku Nikah/Akta Perkawinan bagi penduduk yang belum berumur 17 tahun, tetapi pernah kawin atau sudah kawin',
                btnPage: 'KtpPage'
            },
            {
                btnName: 'Upload Fotocopy Akta Kelahiran',
                btnPage: 'KtpPage'
            },
            {
                btnName: 'Bagi pemohon yang mengajukan perubahan biodata penduduk melampirkan FC Surat Bukti / Keterangan peristiwa penting atau kependudukan yang dialami',
                btnPage: 'KtpPage'
            },
            {
                btnName: 'Bagi orang asing tinggal tetap, mohon upload FC KITAP',
                btnPage: 'KtpPage'
            },
            {
                btnName: 'Bagi orang asing tinggal tetap, mohon upload FC SKTT',
                btnPage: 'KtpPage'
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
                        onPress={that._ShowActionSheet}
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

    _PickImage = async() => {
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
			this.setState({ 
				imageSource: source,
				imageUri: localUri,
				imageName: filename,
				imageType: type
			});
		}
	}
	
	_PickCamera = async() => {
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