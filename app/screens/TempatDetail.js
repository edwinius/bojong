import React from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import LoadingScreen from './common/LoadingScreen';
import BackBtn from './common/BackBtn';

const styleGeneral = require('./styles/StyleGeneral');

const dimensions = Dimensions.get('window');
const dWidth = dimensions.width;

export default class TempatDetail extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            tempat: [],
            foto: []
        }
    }

    async getToken() {
		try {
            const navigation = this.props.navigation;
            let pid = navigation.state.params.tempatPid;

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
                    table: 'detail_tempat',
                    data: {
                        pid: pid
                    }
				})
			}).then((response) => response.json())
			.then((responseJson) => {
                console.log(responseJson);
                
                if(responseJson['status'] == '200') {
					if(this.mounted) {
						this.setState({
                            isLoading: false,
                            tempat: responseJson['data']['tempat'],
                            foto: responseJson['data']['foto']
						});
					}
                }
                
                console.log(this.state);
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

    render() {
        if(this.state.isLoading) {
			return(
				<LoadingScreen />
			);
		}

        const navigation = this.props.navigation;
        let { tempat, foto } = this.state;
		
		return(
			<SafeAreaView style={ styleGeneral.safeAreaView }>
                <View 
                    style={{
                        flex: 1,
                        backgroundColor: 'white'
                    }}
                >
                    <BackBtn
                        title={this.state.tempat[0].tempat_name}
                        navigation={navigation}
                        back={true}
                    />

                    <ScrollView>
                        <View>
                            <Image
                                source={ 
                                    foto[0].tempat_img != null && foto[0].tempat_img != '' 
                                ? 
                                    {uri: `${global.s3}tempat/${foto[0].tempat_pid}/${foto[0].tempat_img}`} 
                                : 
                                    require('../../assets/images/tempat_ibadah.jpg') 
                                }
                                style={{
                                    width: dWidth,
                                    height: dWidth * 0.6
                                }}
                            />
                        </View>

                        <View>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    paddingVertical: 20,
                                    fontSize: 20,
                                }}
                            >
                                { this.state.tempat[0].tempat_name }
                            </Text>
                        </View>

                        <View
                            style={{
                                paddingHorizontal: 10,
                                
                            }}
                        >
                            <Text
                                style={{
                                    color: '#777777',
                                    fontSize: 12,
                                }}
                            >
                                { this.state.tempat[0].tempat_address }
                            </Text>
                        </View>

                        <View
                            style={{
                                paddingHorizontal: 10,
                                paddingVertical: 15,
                            }}
                        >
                            <Text
                                style={{
                                    color: '#444444',
                                }}
                            >
                                { this.state.tempat[0].tempat_desc }
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}