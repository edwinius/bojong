import React from 'react';
import { 
    AsyncStorage,
    Dimensions,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import Banner from '../common/Banner';
import Header from '../common/Header';
import NoData from '../common/NoData';
import LoadingScreen from '../common/LoadingScreen';

const dimensions = Dimensions.get('window');
const dWidth = dimensions.width;

export default class TempatKesehatan extends React.Component{

    constructor(props) {
        super(props);
        
        this.state = {
            data: []
        }
    }

    async getToken() {
		try {
			// Fetch data
			fetch(`${global.api}fetch_tempat`,
			{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
                    appToken: global.appToken,
                    data: {
                        categoryPid: 3
                    }
				})
			}).then((response) => response.json())
			.then((responseJson) => {
                console.log(responseJson);
                
                this.setState({
                    data: responseJson['data']
                });
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

    _ShowTempatIbadah() {
        let navigation = this.props.navigation;

        if(this.state.data.length > 0) {
            const contentIbadah = this.state.data.map(function(t, index) {
                return(
                    <TouchableOpacity
                        key={ index }
                        style={{
                            flexDirection: 'row',
                            paddingVertical: 10,
                        }}
                        onPress={ () => navigation.navigate('TempatDetail',
                        {
                            tempatPid: t.tempat_pid
                        })}
                    >
                        <View>
                            <Image
                                source={ 
                                    t.tempat_img != null && t.tempat_img != '' 
                                ? 
                                    {uri: `${global.s3}tempat/${t.tempat_pid}/${t.tempat_img}`} 
                                : 
                                    require('../../../assets/images/kesehatan_kasih.jpg') 
                                }
                                style={{
                                    width: dWidth * 0.3,
                                    height: dWidth * 0.3 * 0.6
                                }}
                            />
                        </View>
                        <View
                            style={{
                                flex: 1,
                                paddingHorizontal: 10,
                            }}
                        >
                            <View>
                                <Text>
                                    { t.tempat_name }
                                </Text>
                            </View>

                            <View>
                                <Text
                                    style={{
                                        color: 'grey',
                                        fontSize: 9
                                    }}
                                >
                                    { t.tempat_address }
                                </Text>
                            </View>

                            <View
                                style={{
                                    flexWrap: 'wrap',
                                    width: '100%',
                                    paddingTop: 5,
                                }}
                            >
                                <Text
                                    style={{
                                        flexWrap: 'wrap',
                                        flex: 1,
                                        fontSize: 11,
                                        color: 'grey'
                                    }}
                                >
                                    { t.tempat_desc }
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                )
            });

            return contentIbadah;
        } else {
            return(<NoData text='Tidak Ada Data' />);
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
                <Banner />

                <Header 
					navigation={navigation} 
					title='Tempat Kesehatan'
                    back={true}
				/>

                <ScrollView
                    style={{
                        flex: 1
                    }}
                >
                    {/*
                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        <View
                            style={{
                                paddingVertical: 10,
                                paddingHorizontal: 15,
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: 'bold'
                                }}
                            >
                                Rumah Sakit Bojonggenteng
                            </Text>
                        </View>

                        <View
                            style={{
                            }}
                        >
                            <Image
                                source={ require('../../../assets/images/kesehatan_kasih.jpg') }
                                style={{
                                    width: dWidth,
                                    height: dWidth * 0.6
                                }}
                            />
                        </View>

                        <View
                            style={{
                                paddingVertical: 10,
                                paddingHorizontal: 15,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: 'grey'
                                }}
                            >
                                Rumah Sakit Bojonggenteng
                            </Text>
                        </View>
                    </View>
                    */}

                    <View
                        style={{
                            paddingHorizontal: 10,
                            paddingVertical: 15,
                        }}
                    >
                        { this._ShowTempatIbadah() }
                    </View>
                </ScrollView>
            </View>
        );
    }
}