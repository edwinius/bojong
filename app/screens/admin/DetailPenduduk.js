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

import { parseDate, parseReligion, parseBloodType, parseMarriedStatus } from '../../efunctions';

export default class DetailPenduduk extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
            penduduk: [],
            q: ''
        }
    }

    async getToken() {
		try {
            const navigation = this.props.navigation;

			//let userPid = await AsyncStorage.getItem('userPid');
			//let userToken = await AsyncStorage.getItem('userToken');
            //let userLang = await AsyncStorage.getItem('userLang');

            let pid = navigation.state.params.pendudukPid;

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
                    table: 'detail_penduduk',
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
                            penduduk: responseJson['data']['penduduk']
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

    _ShowData() {
        const navigation = this.props.navigation;

        if(this.state.penduduk.length > 0) {
            let list = [];
            let arrLabel = ['NIK', 'Nama Lengkap', 'Tanggal Lahir', 'Agama', 'Golongan Darah', 'Jenis Kelamin', 'Status Perkawinan', 'Tanggal Perkawinan', 'Ayah Kandung', 'Ibu Kandung', 'Desa', 'RT/RW', 'Alamat'];
            let arrValue = ['penduduk_nik', 'penduduk_first_name', 'penduduk_dob', 'penduduk_religion', 'penduduk_blood_type', 'penduduk_gender', 'penduduk_married', 'penduduk_married_date', 'penduduk_ayah_kandung', 'penduduk_ibu_kandung', 'desa_name', 'rt_number', 'penduduk_address'];
            let penduduk = this.state.penduduk;
            
            for(let i = 0; i < arrLabel.length; i++) {
                let pendudukVal = penduduk[0][arrValue[i]];
                let listVal = '';
                
                switch(i) {
                    case 2:
                        listVal = parseDate(pendudukVal);
                        break;
                    case 3:
                        listVal = parseReligion(pendudukVal);
                        break;
                    case 4:
                        listVal = parseBloodType(pendudukVal);
                        break;
                    case 5:
                        listVal = pendudukVal == '0' ? 'Perempuan': 'Laki-Laki';
                        break;
                    case 6:
                        listVal = parseMarriedStatus(pendudukVal);
                        break;
                    case 7:
                        listVal = pendudukVal != '' && pendudukVal !== null ? parseDate(pendudukVal) : null;
                        break;
                    case 11:
                        listVal = pendudukVal + '/' + penduduk[0]['rw_number'];
                        break;
                    default:
                        listVal = pendudukVal;
                }

                list.push(
                    <View
                        key={ i }
                        style={{
                            paddingVertical: 10,
                            paddingHorizontal: 8,
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: 'grey',
                                paddingVertical: 5,
                                paddingHorizontal: 5,
                            }}
                        >
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    color: 'white',
                                }}
                            >
                                { arrLabel[i] }
                            </Text>
                        </View>

                        <View
                            style={{
                                paddingVertical: 5,
                                paddingHorizontal: 15,
                            }}
                        >
                            <Text>
                                { listVal != '' && listVal !== null ? listVal.toUpperCase() : null }
                            </Text>
                        </View>
                    </View>
                );
            }

            return(list);
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
                
                <ScrollView>
                    { this._ShowData() }
                </ScrollView>
            </View>
        );
    }
}