import React from 'react';
import {
    Alert,
    AsyncStorage,
    Button,
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
    
    _VerifyPhoneNumber = () => {
        const { UserHandphone } = this.state;

        firebase.auth().verifyPhoneNumber(UserHandphone)
        .then((confirmResult) => {
            this.setState({ confirmResult });
        }).catch((error) => {
            const { code, message } = error;
        })
    }

    UserRegister = () => {
        const { UserHandphone, UserPassword, UserPasswordConfirm } = this.state;
        const navigation = this.props.navigation;
        
        if(UserHandphone != '' && UserPassword != '' && UserPasswordConfirm != '') {
            if(UserPassword == UserPasswordConfirm) {
                this.setState({
                    isLoading: false
                });

                navigation.navigate('SignUpCaptcha',
                {
                    UserHandphone: UserHandphone,
                    UserPassword: UserPassword
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
                    
                    {/*<Button title="Send Code" onPress={() => navigation.navigate('SignUpCaptcha')} />*/}

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