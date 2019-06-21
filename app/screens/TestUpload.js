import React from 'react';
import {
    ActionSheetIOS,
    Text,
    View,
    Platform,
    Image,
    TouchableOpacity
} from 'react-native';
import { ImagePicker } from 'expo';
import { ActionSheetProvider, connectActionSheet } from '@expo/react-native-action-sheet';

export default class TestUpload extends React.Component {
    render() {
        return(
			<ActionSheetProvider>
				<TestUploadApp />
			</ActionSheetProvider>
		);
    }
}

@connectActionSheet
class TestUploadApp extends React.Component {
    constructor(props) {
		super(props)
		this.state = {
			imageSource: null,
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
    
    SignUpProfile = () => {
        const { imageUri, imageName, imageType } = this.state;
        let uri = imageUri;
        
        if(imageUri != null && imageUri != '') {
            // Upload Image
            let formData = new FormData();
            formData.append('photo', {
                uri,
                type: imageType,
                name: imageName,
            });
            console.log(formData);
            fetch(`${global.api}data_controller/signup_profile_upload_photo`, {
                method: 'POST',
                body: formData,
                header: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson);
            }).catch((error) => {
                console.error(error);
            });
        }
	}
    
    render() {
        return(
            <View>
                <TouchableOpacity
                    onPress={this._ShowActionSheet}
                >
                    <Image 
                        style={{
                            width: 100,
                            height: 100,
                        }}
                        source={this.state.imageSource != null ? this.state.imageSource : require('../../assets/images/tempat_ibadah.jpg')}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={ this.SignUpProfile }
                >
                    <Text>Upload</Text>
                </TouchableOpacity>
            </View>
        );
    }
}