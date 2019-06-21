import React from 'react';
import {
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

import Banner from '../common/Banner';
import Header from '../common/Header';

export default class AdminLayananOptions extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            data: ''
        }
    }

    async getToken() {
		try {
            const navigation = this.props.navigation;

            fetch(`${global.api}fetch_data`,
			{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					appToken: global.appToken,
                    table: 'notif_layanan_opt',
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
    
    render() {
        let navigation = this.props.navigation;
        let that = this;

        let opt = ['Permohonan Baru', 'Otorisasi Permohonan'];
        let optStatus = ['2', '3'];

        let opts = opt.map(function(v, i) {
            return(
                <TouchableOpacity
                    key={ i }
                    style={{
                        borderBottomWidth: 1,
                        borderColor: '#cacaca',
                        paddingHorizontal: 15,
                        paddingVertical: 15,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                    onPress={() => navigation.navigate('AdminLayanan',
                    {
                        status: optStatus[i]
                    })}
                >
                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        <Text>
                            { v }
                        </Text>
                    </View>

                    { that.state.data[`status_${optStatus[i]}`] > 0 ?
                        <View
                            style={{
                                backgroundColor: 'red',
                                borderRadius: 30,
                                width: 20,
                                height: 20,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 11
                                }}
                            >
                                { that.state.data[`status_${optStatus[i]}`] }
                            </Text>
                        </View>
                    : null }
                </TouchableOpacity>
            );
        });

        return(
            <View 
                style={{
                    flex: 1
                }}
            >
                <Banner />

                <Header 
					navigation={navigation} 
					title='Permohonan Layanan'
                    back={true}
				/>
                
                <ScrollView>
                    <View>
                        {opts}                        
                    </View>
                </ScrollView>
            </View>
        );
    }

}