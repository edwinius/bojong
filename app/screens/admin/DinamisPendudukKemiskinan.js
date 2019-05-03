import React from 'react';
import {
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import Banner from '../common/Banner';
import Header from '../common/Header';
import LoadingScreen from '../common/LoadingScreen';

const dimensions = Dimensions.get('window');
const dWidth = dimensions.width;

const styleDinamis = require('../styles/StyleDinamis');

export default class DinamisPendudukKemiskinan extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: [],
			lang: '',
        }
    }

    async getToken() {
		try {
            const navigation = this.props.navigation;

			//let userPid = await AsyncStorage.getItem('userPid');
			//let userToken = await AsyncStorage.getItem('userToken');
            //let userLang = await AsyncStorage.getItem('userLang');

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
                    table: 'kemiskinan',
                    data: ''
				})
			}).then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
				
				if(responseJson['status'] == '200') {
					if(this.mounted) {
						this.setState({
							isLoading: false,
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

    _ShowData() {
        const navigation = this.props.navigation;

        if(this.state.data.length > 0) {
            const content = this.state.data.map(function(v, i) {
                return(
                    <TouchableOpacity
                        key={ i }
                        style={{
                            flexDirection: 'row',
                            paddingVertical: 10,
                            borderBottomWidth: 1,
                            borderColor: '#e0e0e0'
                        }}
                        onPress={() => navigation.navigate('DinamisPendudukKemiskinanDetail',
                        {
                            pid: v.kemiskinan_pid
                        })}
                    >
                        <View
                            style={{
                                width: dWidth * 0.75,
                                paddingHorizontal: 25,
                            }}
                        >
                            <Text>
                                { v.kemiskinan_name }
                            </Text>
                        </View>

                        <View>
                            <Text>
                                { v.kemiskinan_count } Orang
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            });

            return (content);
        } else {
            return(<Text>No Data</Text>);
        }
    }

    render() {
        if(this.state.isLoading) {
			return( <LoadingScreen /> );
        }
        
        const navigation = this.props.navigation;

        return(
            <View 
                style={{
                    flex: 1
                }}
            >
                <Banner />

                <Header 
					navigation={navigation} 
					title='Penerima Bantuan'
                    back={true}
				/>
                
                <ScrollView>
                    <View 
                        
                    >
                        { this._ShowData() }
                    </View>
                </ScrollView>
            </View>
        );
    }
}