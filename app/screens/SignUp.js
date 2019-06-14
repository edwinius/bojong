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

export default class SignUp extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: false,
			UserHandphone: '',
			UserPassword: '',
			UserPasswordConfirm: '',
        }
    }

    componentDidMount() {
		this.mounted = true;
	}
	
	componentWillUnmount() {
		this.mounted = false;
	}

    UserRegister = () => {
        const { UserHandphone, UserPassword, UserPasswordConfirm } = this.state;
        const navigation = this.props.navigation;
        
        if(UserHandphone != '' && UserPassword != '' && UserPasswordConfirm != '') {
            if(UserPassword == UserPasswordConfirm) {
                this.setState({
                    isLoading: true
                });

                fetch(`${global.api}register_data`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        appToken: global.appToken,
                        data: {
                            hp: UserHandphone,
                            pass: UserPassword,
                        }
                    })
                }).then((response) => response.json())
                .then((responseJson) => {
                    //console.log(responseJson);

                    if(responseJson['status'] == '200') {
                        const pid = JSON.stringify(responseJson['user_pid']);
                        let admin = JSON.stringify(responseJson['user_admin']);

                        AsyncStorage.setItem('userPid', pid);
                        AsyncStorage.setItem('userAdmin', admin);
                        AsyncStorage.setItem('userToken', pid);
                        navigation.navigate('ProfileUser');
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
                Alert.alert('Password dan ulangi password tidak sama');
            }
        } else {
			Alert.alert('Mohon isi lengkap form');
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
                        title="Sign Up"
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
                                            onChangeText={ UserHandphone => this.setState({ UserHandphone })}
                                            value={ this.state.UserHandphone }
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
                                            onChangeText={ UserPassword => this.setState({ UserPassword })}
                                            value={ this.state.UserPassword }
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={ styleFormSignInUp.formRow }>
                                <View style={ styleFormSignInUp.formInputBorder }>
                                    <View style={ styleFormSignInUp.containerFormLabel }>
                                        <Text style={ styleFormSignInUp.txtFormLabel }>
                                            Ulangi Password
                                        </Text>
                                    </View>

                                    <View style={ styleFormSignInUp.containerFormInput }>
                                        <TextInput 
                                            style={ styleFormSignInUp.inputForm }
                                            autoCapitalize='none'
                                            secureTextEntry={true}
                                            onChangeText={ UserPasswordConfirm => this.setState({ UserPasswordConfirm })}
                                            value={ this.state.UserPasswordConfirm }
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={ styleFormSignInUp.formRow }>
                                <TouchableOpacity 
                                    style={ styleFormSignInUp.formBtn }
                                    onPress={ this.UserRegister }
                                >
                                    <Text style={ styleFormSignInUp.txtFormBtn }>
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                style={ styleFormSignInUp.btnSignInUp }
                            >
                                <Text style={ styleFormSignInUp.txtFront }>
                                    Sudah punya akun? 
                                </Text>
                                <Text style={ styleFormSignInUp.txtBack }>
                                    Masuk disini
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
            
    }

}