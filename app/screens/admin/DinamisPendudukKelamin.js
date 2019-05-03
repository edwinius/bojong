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
import { addDot } from '../../efunctions';

const dimensions = Dimensions.get('window');
const dWidth = dimensions.width;

const styleDinamis = require('../styles/StyleDinamis');

export default class DinamisPendudukKelamin extends React.Component {

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
                    table: 'report_penduduk',
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
        let that = this;

        if(this.state.data.female.length > 0) {
            let tables = [];

            for(let n = 0; n < 3; n++) {
                let tableName;
                switch(n) {
                    case 0:
                        tableName = 'Laki - Laki';
                        objName = 'male';
                        break;
                    case 1:
                        tableName = 'Perempuan';
                        objName = 'female';
                        break;
                    case 2:
                        tableName = 'Total Penduduk';
                        objName = 'female';
                        break;
                }

                const contents = that.state.data[`${objName}`].map(function(v, i) {
                    let count;
                    if(n < 2) {
                        count = v.count
                    } else {
                        count = parseInt(that.state.data.female[`${i}`].count) + parseInt(that.state.data.male[`${i}`].count);
                    }

                    return(
                        <View
                            key={ i }
                            style={{
                                borderBottomWidth: 1,
                                borderColor: '#e0e0e0',
                                flexDirection: 'row',
                                paddingVertical: 6,
                                paddingHorizontal: 5,
                            }}
                        >
                            <View
                                style={{
                                    flex: 0.8
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#333333',
                                    }}
                                >
                                    { v.desa_name }
                                </Text>
                            </View>

                            <View
                                style={{
                                    flex: 0.2,
                                    alignItems: 'flex-end',
                                }}
                            >
                                <Text
                                    style={{
                                        color: '#333333'
                                    }}
                                >
                                    { addDot(count) } Orang
                                </Text>
                            </View>
                        </View>
                    );
                });

                tables.push(
                    <View
                        key={ n }
                        style={{
                            marginVertical: 10,
                        }}
                    >
                        <View
                            style={{
                                paddingVertical: 8,
                                alignItems: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 16,
                                    letterSpacing: 2,
                                }}
                            >
                                { tableName }
                            </Text>
                        </View>

                        <View>
                            {contents}
                        </View>
                    </View>
                );
            }

            return (tables);
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
					title='Penduduk Per Jenis Kelamin'
                    back={true}
				/>
                
                <ScrollView>
                    <View 
                        style={{
                            paddingHorizontal: 15,
                        }}
                    >
                        { this._ShowData() }
                    </View>
                </ScrollView>
            </View>
        );
    }
}