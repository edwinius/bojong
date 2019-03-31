import React from 'react';
import {
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
                                        <TextInput style={ styleFormSignInUp.inputForm } />
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
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={ styleFormSignInUp.formRow }>
                                <TouchableOpacity style={ styleFormSignInUp.formBtn }>
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