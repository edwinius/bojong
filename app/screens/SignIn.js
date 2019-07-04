import React from 'react';
import {
    Alert,
    AsyncStorage,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import LoadingScreen from './common/LoadingScreen';
import BackBtn from './common/BackBtn';

const styleGeneral = require('./styles/StyleGeneral');
const styleFormSignInUp = require('./styles/StyleFormSignInUp');

export default class SignIn extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: false,
            userHp: '',
            userPass: ''
        }
    }

    componentDidMount() {
		this.mounted = true;
	}
	
	componentWillUnmount() {
		this.mounted = false;
	}

    UserLogin = () => {
		const { userHp, userPass } = this.state;
		const navigation = this.props.navigation;
		
		if(userHp != '' && userPass != '') {
			this.setState({
				isLoading: true
			});
			
			fetch(`${global.api}auth_data`, {
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
                    appToken: global.appToken,
                    data: {
                        hp: userHp,
                        pass: userPass
                    }
				})
			}).then((response) => response.json())
			.then((responseJson) => {
				//console.log(responseJson);
                
                if(responseJson['status'] == '200') {
                    const pid = responseJson['user_pid'];
                    let admin = responseJson['user_admin'];
                    let penduduk_pid = responseJson['penduduk_pid'];
                    let user_penduduk = responseJson['user_penduduk'];

                    if(penduduk_pid == null) {
                        penduduk_pid = '0';
                    }
                    //const token = responseJson['token'];
                
                    // Profile completed
                    let timeStamp = Math.floor(Date.now() / 1000);
                    AsyncStorage.setItem('userPid', pid);
                    AsyncStorage.setItem('userAdmin', admin);
                    AsyncStorage.setItem('userToken', pid);
                    AsyncStorage.setItem('pendudukPid', penduduk_pid);
                    AsyncStorage.setItem('userPenduduk', user_penduduk);
                    navigation.navigate('User', { 'refresh': `${timeStamp}` });
				} else {
					Alert.alert(responseJson['msg']);
				}
				
				if(this.mounted) {
					this.setState({
						isLoading: false
					});
                }
				
			}).catch((error) => {
				console.error(error);
			});
		} else {
			Alert.alert('Mohon isi nomor Handphone dan Password');
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
			<SafeAreaView style={ styleGeneral.safeAreaView }>
                <View 
                    style={{
                        flex: 1,
                        backgroundColor: 'white'
                    }}
                >
                    <BackBtn
                        title="Sign In"
                        navigation={navigation}
                        back={false}
                    />

                    <ScrollView>
                        <View style={ styleFormSignInUp.containerForm }>
                            <View style={ styleFormSignInUp.formRow }>
                                <View style={ styleFormSignInUp.formInputBorder }>
                                    <View style={ styleFormSignInUp.containerFormLabel }>
                                        <Text style={ styleFormSignInUp.txtFormLabel }>
                                            No. Handphone
                                        </Text>
                                    </View>

                                    <View style={ styleFormSignInUp.containerFormInput }>
                                        <TextInput 
                                            style={ styleFormSignInUp.inputForm } 
                                            placeholder='081xxxxxxxx'
                                            onChangeText={ userHp => this.setState({ userHp })}
                                            value={ this.state.userHp }
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={ styleFormSignInUp.formRow }>
                                <View style={ styleFormSignInUp.formInputBorder }>
                                    <View style={ styleFormSignInUp.containerFormLabel }>
                                        <Text style={ styleFormSignInUp.txtFormLabel }>
                                            Password
                                        </Text>
                                    </View>

                                    <View style={ styleFormSignInUp.containerFormInput }>
                                        <TextInput 
                                            style={ styleFormSignInUp.inputForm }
                                            autoCapitalize='none'
                                            secureTextEntry={true}
                                            placeholder='* * * * * * * *'
                                            onChangeText={ userPass => this.setState({ userPass })}
                                            value={ this.state.userPass }
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={ styleFormSignInUp.formRow }>
                                <TouchableOpacity 
                                    style={ styleFormSignInUp.formBtn }
                                    onPress={ this.UserLogin }
                                >
                                    <Text style={ styleFormSignInUp.txtFormBtn }>
                                        Sign In
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                style={{
                                    paddingHorizontal: 35,
                                    marginTop: 10,
                                }}
                            >
                                <Text
                                    style={{
                                        textAlign: 'right',
                                        fontSize: 15,
                                        color: 'grey'
                                    }}
                                >
                                    Lupa Password?
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => navigation.navigate('SignUp')}
                                style={ styleFormSignInUp.btnSignInUp }
                            >
                                <Text style={ styleFormSignInUp.txtFront }>
                                    Belum punya akun? 
                                </Text>
                                <Text style={ styleFormSignInUp.txtBack }>
                                    Daftar disini
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
            
    }

}