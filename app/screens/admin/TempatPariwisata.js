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

const dimensions = Dimensions.get('window');
const dWidth = dimensions.width;

export default class TempatPariwisata extends React.Component{

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
                        categoryPid: 1
                    }
				})
			}).then((response) => response.json())
			.then((responseJson) => {
				console.log(responseJson);
			}).catch((error) => {
				console.error(error);
			});
			
		} catch(error) {
			console.log(error);
		}
    }
    
    componentDidMount() {
		this.mounted = true;
		//this.getToken();
    }

    _ShowTempatIbadah() {
        const arrIbadah = ['1', '2', '3'];

        const contentIbadah = arrIbadah.map(function(t, index) {
            return(
                <TouchableOpacity
                    key={ index }
                    style={{
                        flexDirection: 'row',
                        paddingVertical: 10,
                    }}
                >
                    <View>
                        <Image
                            source={ require('../../../assets/images/pariwisata_air_terjun.jpg') }
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
                                Air Terjun Bojonggenteng
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
                                Air Terjun 7 warna Bojonggenteng
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        });

        return contentIbadah;
    }

    render() {
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
					title='Tempat Pariwisata'
                    back={true}
				/>

                <ScrollView
                    style={{
                        flex: 1
                    }}
                >
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
                                Jembatan Cisaat
                            </Text>
                        </View>

                        <View
                            style={{
                            }}
                        >
                            <Image
                                source={ require('../../../assets/images/pariwisata_jembatan.jpg') }
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
                                Jembatan terpanjang di Asia Tenggara yang terletak di Cisaat, Sukabumi
                            </Text>
                        </View>
                    </View>

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