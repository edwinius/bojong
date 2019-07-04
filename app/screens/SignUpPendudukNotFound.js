import React from 'react';
import {
    Alert,
    AsyncStorage,
    Picker,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import LoadingScreen from './common/LoadingScreen';
import BackBtn from './common/BackBtn';
import CityPicker from './common/CityPicker';

const styleGeneral = require('./styles/StyleGeneral');

export default class SignUpPendudukNotFound extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            pendudukName: '',
            pendudukDob: '',
            pendudukPob: '',
            pendudukGender: '',
            pendudukReligion: '',
            pendudukBloodType: '',
            pendudukMarried: '',
            pendudukPendidikan: '',
            userPid: null,
            userToken: null,
        }
    }

    async getToken() {
		try {
            const navigation = this.props.navigation;

			let userPid = await AsyncStorage.getItem('userPid');
            let userToken = await AsyncStorage.getItem('userToken');

            // If not logged set userPid & userToken to 0
			if(userPid == null || userPid == '' || userToken == null || userToken == '') {
				userPid = '',
				userToken = ''
            }

            this.setState({
                userPid: userPid,
                userToken: userToken
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

    _SubmitForm = () => {
        const navigation = this.props.navigation;
        let ktpNumber = navigation.state.params.ktpNumber;
        let { pendudukName, pendudukGender, pendudukReligion, pendudukBloodType, pendudukPendidikan, userPid } = this.state;

        if(pendudukName != '' && pendudukGender != '' && pendudukReligion != '' && pendudukBloodType != '' && pendudukPendidikan != '') {
            this.setState({
                isLoading: true
            });
            
            fetch(`${global.api}add_data`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
                    appToken: global.appToken,
                    table: 'data_penduduk_temp',
                    data: {
                        user_pid: userPid,
                        penduduk_nik: ktpNumber,
                        penduduk_first_name: pendudukName,
                        penduduk_religion: pendudukReligion,
                        penduduk_gender: pendudukGender,
                        penduduk_blood_type: pendudukBloodType,
                        penduduk_pendidikan: pendudukPendidikan
                    }
				})
			}).then((response) => response.json())
			.then((responseJson) => {
                console.log(responseJson);

                if(responseJson['status'] == '200') {
                    AsyncStorage.setItem('userPenduduk', '2');
                    navigation.navigate('LayananPage');
                } else {
                    if(this.mounted) {
                        this.setState({
                            isLoading: false
                        });
                    }
                    Alert.alert(responseJson['msg']);
                }
            });
        } else {
            Alert.alert('Mohon isi lengkap form');
        }
    }
    
    render() {
        if(this.state.isLoading) {
			return(<LoadingScreen />);
        }
        
        const navigation = this.props.navigation;
        let ktpNumber = navigation.state.params.ktpNumber;

        return(
            <View
                style={{
                    flex: 1
                }}
            >
                <SafeAreaView style={ styleGeneral.safeAreaView2 }>
                    <BackBtn
                        title="Verifikasi"
                        navigation={navigation}
                        back={false}
                    />
                </SafeAreaView>

                <ScrollView>
                    <View
                        style={{
                            paddingVertical: 20,
                            paddingHorizontal: 25,
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            style={{
                                fontSize: 18,
                                textAlign: 'center'
                            }}
                        >
                            Mohon lengkapi data anda dengan sebenar-benar nya
                        </Text>
                    </View>

                    <View style={[styles.formRow, {
                        flexDirection: 'row'
                    }]}>
                        <View 
                            style={{
                                paddingHorizontal: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 17
                                }}
                            >
                                NIK : { ktpNumber }
                            </Text>
                        </View>
                    </View>

                    <View style={ styles.formRow }>
                        <View style={ styles.formLabel }>
                            <Text style={ styles.txtLabel }>
                                Nama Lengkap (sesuai KTP)
                            </Text>
                        </View>

                        <View style={ styles.formInput }>
                            <TextInput
                                style={ styles.inputPenduduk }
                                value={ this.state.pendudukName }
                                onChangeText={ pendudukName => this.setState({ pendudukName })}
                            />
                        </View>
                    </View>

                    <View style={ styles.formRow }>
                        <View style={ styles.formLabel }>
                            <Text style={ styles.txtLabel }>
                                Jenis Kelamin
                            </Text>
                        </View>

                        <View style={ styles.formInput }>
                            <CityPicker 
                                items={[
                                    {
                                        value: '',
                                        label: 'Silahkan Pilih'
                                    },{
                                        value: '0',
                                        label: 'Perempuan'
                                    },{
                                        value: '1',
                                        label: 'Laki - Laki'
                                    }
                                ]}
                                value={ this.state.pendudukGender }
                                onValueChange={(itemValue, itemIndex) =>
                                this.setState({ pendudukGender: itemValue })}
                            />
                        </View>
                    </View>

                    <View style={ styles.formRow }>
                        <View style={ styles.formLabel }>
                            <Text style={ styles.txtLabel }>
                                Agama
                            </Text>
                        </View>

                        <View style={ styles.formInput }>
                            <CityPicker 
                                items={[
                                    {
                                        value: '',
                                        label: 'Silahkan Pilih'
                                    },{
                                        value: '1',
                                        label: 'Islam'
                                    },{
                                        value: '2',
                                        label: 'Katholik'
                                    },{
                                        value: '3',
                                        label: 'Protestan'
                                    },{
                                        value: '4',
                                        label: 'Hindu'
                                    },{
                                        value: '5',
                                        label: 'Budha'
                                    }
                                ]}
                                value={ this.state.pendudukReligion }
                                onValueChange={(itemValue, itemIndex) =>
                                this.setState({ pendudukReligion: itemValue })}
                            />
                        </View>
                    </View>

                    <View style={ styles.formRow }>
                        <View style={ styles.formLabel }>
                            <Text style={ styles.txtLabel }>
                                Golongan Darah
                            </Text>
                        </View>

                        <View style={ styles.formInput }>
                            <CityPicker 
                                items={[
                                    {
                                        value: '',
                                        label: 'Silahkan Pilih'
                                    },{
                                        value: '0',
                                        label: 'Tidak Tahu'
                                    },{
                                        value: '1',
                                        label: 'A'
                                    },{
                                        value: '2',
                                        label: 'AB'
                                    },{
                                        value: '3',
                                        label: 'B'
                                    },{
                                        value: '4',
                                        label: 'O'
                                    }
                                ]}
                                value={ this.state.pendudukBloodType }
                                onValueChange={(itemValue, itemIndex) =>
                                this.setState({ pendudukBloodType: itemValue })}
                            />
                        </View>
                    </View>

                    <View style={ styles.formRow }>
                        <View style={ styles.formLabel }>
                            <Text style={ styles.txtLabel }>
                                Pendidikan Terakhir
                            </Text>
                        </View>

                        <View style={ styles.formInput }>
                            <CityPicker 
                                items={[
                                    {
                                        value: '',
                                        label: 'Silahkan Pilih'
                                    },{
                                        value: '1',
                                        label: 'Tidak/Blm Sekolah'
                                    },{
                                        value: '2',
                                        label: 'Belum Tamat SD/Sederajat'
                                    },{
                                        value: '3',
                                        label: 'Tamat SD/Sederajat'
                                    },{
                                        value: '4',
                                        label: 'SLTP/Sederajat'
                                    },{
                                        value: '5',
                                        label: 'SLTA/Sederajat'
                                    },{
                                        value: '6',
                                        label: 'Diploma I/II'
                                    },{
                                        value: '7',
                                        label: 'Akademi/Diploma III/Sarjana Muda'
                                    },{
                                        value: '8',
                                        label: 'Diploma IV/Strata I'
                                    },{
                                        value: '9',
                                        label: 'Strata-II'
                                    },{
                                        value: '10',
                                        label: 'Strata-III'
                                    }
                                ]}
                                value={ this.state.pendudukPendidikan }
                                onValueChange={(itemValue, itemIndex) =>
                                this.setState({ pendudukPendidikan: itemValue })}
                            />
                        </View>
                    </View>

                    <View style={ styles.formRow }>
                        <TouchableOpacity 
                            style={ styleGeneral.btnOrange }
                            onPress={this._SubmitForm}
                        >
                            <Text style={ styleGeneral.txtBtnOrange }>
                                Submit
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    formRow: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    formLabel: {
        paddingVertical: 8,
        paddingHorizontal: 10,
    },
    inputPenduduk: {
        borderWidth: 1,
        borderColor: '#cacaca',
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,

    }
});