import React from 'react';
import {
    Alert,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import Banner from '../common/Banner';
import Header from '../common/Header';
import LoadingScreen from '../common/LoadingScreen';
import NoData from '../common/NoData';

export default class DataPenduduk extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            data: [],
            q: ''
        }
    }

    async getToken() {
		try {
            const navigation = this.props.navigation;

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
                    table: 'penduduk',
                    data: {
                        q: '',
                        page: 0
                    }
				})
			}).then((response) => response.json())
			.then((responseJson) => {
                //console.log(responseJson);
                
                if(responseJson['status'] == '200') {
					if(this.mounted) {
						this.setState({
							isLoading: false,
                            data: responseJson['data']['penduduk']
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

    _SearchPenduduk = () => {
        let q = this.state.q;

        this.setState({
            isLoading: true
        });

        // Fetch data penduduk
        fetch(`${global.api}fetch_data`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                appToken: global.appToken,
                table: 'penduduk',
                data: {
                    q: q,
                    page: 0
                }
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            console.log(responseJson);
            
            if(responseJson['status'] == '200') {
                if(this.mounted) {
                    this.setState({
                        isLoading: false,
                        data: responseJson['data']['penduduk']
                    });
                }
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    _ShowData() {
        const navigation = this.props.navigation;

        if(this.state.data.length > 0) {
            const content = this.state.data.map(function(v, i) {
                return(
                    <TouchableOpacity
                        key={ i }
                        style={{
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                            borderBottomWidth: 1,
                            borderColor: '#cacaca'
                        }}
                        onPress={ () => navigation.navigate('DetailPenduduk', {
                            'pendudukPid': v.penduduk_pid
                        })}
                    >
                        <Text
                            style={{
                                color: '#111111'
                            }}
                        >
                            { v.penduduk_first_name }
                        </Text>
                    </TouchableOpacity>
                );
            });

            return(content);
        } else {
            return(<NoData />);
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
                    flex: 1,
                }}
            >
                <Banner />

                <Header 
					navigation={navigation} 
                    title='Data Penduduk'
                    back={true}
				/>

                <View
                    style={{
                        paddingHorizontal: 15,
                        paddingVertical: 15,
                    }}
                >
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: '#cacaca',
                            borderRadius: 10,
                            height: 30,
                            paddingVertical: 5,
                            paddingHorizontal: 15,
                        }}
                        placeholder='Cari Nama Penduduk / NIK'
                        onChangeText={ q => this.setState({ q })}
                        onSubmitEditing={ this._SearchPenduduk }
                    >
                        
                    </TextInput>
                </View>
                
                <ScrollView>
                    { this._ShowData() }
                </ScrollView>
            </View>
        );
    }
}