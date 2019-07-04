import React from 'react';
import {
    Alert,
    AsyncStorage,
    Button,
    SafeAreaView,
    Text,
    View,
    WebView
} from 'react-native';
import LoadingScreen from './common/LoadingScreen';
import BackBtn from './common/BackBtn';

const styleGeneral = require('./styles/StyleGeneral');

export default class SignUpCaptcha extends React.Component {

    constructor(props) {
        super(props);
        
        this.state = {
            isLoading: true,
        }
    }

    componentDidMount() {
        this.mounted = true;
    }
    
    componentWillUnmount() {
		this.mounted = false;
    }
    
    UserRegister() {
        let navigation = this.props.navigation;
        let UserHandphone = navigation.state.params('UserHandphone');
        let UserPassword = navigation.state.params('UserPassword');

        Alert.alert(UserHandphone);
    }

    _WebViewCallback(data) {
        const navigation = this.props.navigation;
        let UserHandphone = navigation.state.params.UserHandphone;
        let UserPassword = navigation.state.params.UserPassword;

        if(data == 'done') {
            if(this.mounted) {
                this.setState({
                    isLoading: false
                });
            }
        } else if(data == 'back') {
            navigation.goBack(null);
        } else if(data == 'success') {
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
            });
        } else {
            console.log(data);
        }
    }

    Testbtn() {
        Alert.alert('b');
        this.UserRegister();
    }

    render() {
        const navigation = this.props.navigation;
        let UserHandphone = navigation.state.params.UserHandphone;

        return(
            <View
                style={{
                    flex: 1
                }}
            >
                <SafeAreaView style={ styleGeneral.safeAreaView2 }>
                    <BackBtn
                        title="Sign Up"
                        navigation={navigation}
                        back={false}
                    />
                </SafeAreaView>

                {/*<Button title="Send Code" onPress={this.Testbtn} />*/}

                { this.state.isLoading ? 
                    <View 
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            flex: 1,
                            backgroundColor: 'white',
                            zIndex: 2,
                        }}
                    >
                        <LoadingScreen /> 
                    </View>
                : null }

                <WebView
                    source={{uri: `${global.uri}app/sign_up_captcha?hp=${UserHandphone}`}}
                    onMessage={(event)=> this._WebViewCallback(event.nativeEvent.data)}
                    style={{
                        flex: 1,
                    }}
                />
            </View>
        );
    }

}