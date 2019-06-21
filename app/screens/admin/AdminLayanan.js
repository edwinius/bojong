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

export default class AdminLayanan extends React.Component {

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
            let type = navigation.state.params.type;
            let status = navigation.state.params.status;

            fetch(`${global.api}fetch_data`,
			{
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					appToken: global.appToken,
                    table: `${status == '2' ? 'notif' : 'notif_auth'}`,
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

    _ShowButtons() {
        const navigation = this.props.navigation;
        let status = navigation.state.params.status;
        let that = this;

        const buttons = [
            {
                btnName: 'Perekaman e-KTP',
                btnPage: 'KtpPage',
                type: '1',
                title: 'KTP',
                typeName: 'ktp'
            },
            {
                btnName: 'Pembuatan KK',
                btnPage: 'KK',
                type: '2',
                title: 'KK',
                typeName: 'kk'
            },
            {
                btnName: 'Penerbitan Surat Pindah',
                btnPage: 'PageSuratPindah',
                type: '3',
                title: 'Surat Pindah',
                typeName: 'sp'
            },
            {
                btnName: 'Pembuatan IMB dibawah 200m2',
                btnPage: 'ImbDibawah200m',
                type: '4',
                title: 'IMB < 200m',
                typeName: 'imb_lt200'
            },
            {
                btnName: 'Pembuatan IMB diatas 200m2',
                btnPage: 'ImbDiatas200m',
                type: '5',
                title: 'IMB > 200m',
                typeName: 'imb_gt200'
            },
            {
                btnName: 'PPATS',
                btnPage: 'PPATS',
                type: '6',
                title: 'PPATS',
                typeName: 'ppats'
            },
            {
                btnName: 'Surat Keterangan Jampersal',
                btnPage: 'Jampersal',
                type: '7',
                title: 'Jampersal / KIS',
                typeName: 'kis'
            },
            {
                btnName: 'Pembuatan SIUP/TDP',
                btnPage: 'SIUPdanTDP',
                type: '8',
                title: 'SIUP/TDP',
                typeName: 'siup_gt200'
            },
            {
                btnName: 'VISUM',
                btnPage: 'VISUM',
                type: '9',
                title: 'VISUM',
                typeName: 'visum'
            },
            {
                btnName: 'Surat Keterangan Ahli Waris',
                btnPage: 'PageAhliWaris',
                type: '10',
                title: 'Ahliwaris',
                typeName: 'ahliwaris'
            },
            {
                btnName: 'Surat Keterangan Pinjam ke Bank',
                btnPage: 'PagePinjamBank',
                type: '11',
                title: 'SK Pinjam',
                typeName: 'bank'
            },
            {
                btnName: 'Izin Reklame Tanpa Sponsor',
                btnPage: 'IzinReklame',
                type: '12',
                title: 'Izin Reklame',
                typeName: 'reklame'
            },
            {
                btnName: 'Rekomendasi Izin Rame-Rame',
                btnPage: 'IzinRame',
                type: '13',
                title: 'Izin',
                typeName: 'izin'
            }
        ];

        const btn = buttons.map(function (item, index) {
            return (
                <TouchableOpacity
                    key={ index }
                    onPress={ () => navigation.navigate('AdminLayananList',
                    {
                        type: item.type,
                        title: item.title,
                        status: status
                    })}
                    style={{
                        borderBottomWidth: 1,
                        borderColor: '#e0e0e0',
                        paddingHorizontal: 22,
                        paddingVertical: 12,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        <Text>
                            { item.btnName }
                        </Text>
                    </View>

                    { that.state.data.layanan[`${item.typeName}`] > 0 ?
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
                                { that.state.data.layanan[`${item.typeName}`] }
                            </Text>
                        </View>
                    : null }
                </TouchableOpacity>
            )
        });

        return (btn);
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
					title='Pengajuan'
                    back={true}
				/>
                
                <ScrollView>
                    <View 
                        
                    >
                        { this._ShowButtons() }
                    </View>
                </ScrollView>
            </View>
        );
    }

}