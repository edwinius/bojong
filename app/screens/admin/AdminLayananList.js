import React from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import Banner from '../common/Banner';
import Header from '../common/Header';
import LoadingScreen from '../common/LoadingScreen';
import NoData from '../common/NoData';

import { parseDate } from '../../efunctions';

export default class AdminLayanan extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: []
        }
    }

    async getToken() {
		try {
            const navigation = this.props.navigation;
            let type = navigation.state.params.type;

            fetch(`${global.api}fetch_data`,
			{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					appToken: global.appToken,
                    table: 'appLayanan',
                    data: {
                        type: type,
                        page: '0',
                        status: '2',
                    }
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

        if(this.state.data.row.length > 0) {
            const content = this.state.data.row.map(function(v, i) {
                return(
                    <TouchableOpacity
                        key={ i }
                        onPress={() => navigation.navigate('AdminLayananFiles',
                        {
                            pid: v.layanan_pid,
                            type: v.layanan_type
                        })}
                        style={{
                            borderBottomWidth: 1,
                            borderColor: '#e0e0e0',
                            paddingHorizontal: 22,
                            paddingVertical: 12,
                            flexDirection: 'row',
                        }}
                    >
                        <View
                            style={{
                                borderRightWidth: 1,
                                borderColor: '#e0e0e0',
                                paddingRight: 10,
                            }}
                        >
                            <Text>
                                { parseDate(v.layanan_datetime) }
                            </Text>
                        </View>

                        <View
                            style={{
                                paddingHorizontal: 10
                            }}
                        >
                            <Text>
                                { v.penduduk_first_name }
                            </Text>
                        </View>
                    </TouchableOpacity>
                );
            });

            return (content);
        } else {
            return(<NoData text='Belum Ada Pengajuan' />);
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
					title={navigation.state.params.title}
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